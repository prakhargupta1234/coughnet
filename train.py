import os
import pandas as pd
import numpy as np
import librosa
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from sklearn.model_selection import train_test_split
from sklearn.utils import resample
from tqdm import tqdm
import sys

# Import model from backend directory
sys.path.append(os.path.join(os.getcwd(), 'backend'))
try:
    from model import get_model
except ImportError:
    print("⚠️ model.py nahi mila, ensure karo ki 'backend' folder mein model.py hai.")
    sys.exit(1)

# --- CONFIGURATION ---
AUDIO_DIR = r"D:\Antigravity Projects\Collage Project\Coughnet\dataset\Respiratory_Sound_Database"
SAMPLE_RATE = 22050
DURATION = 5 
N_MELS = 128
HOP_LENGTH = 512
BATCH_SIZE = 32
EPOCHS = 20
LEARNING_RATE = 0.001

# Ab hum labels CSV se nahi, .txt file se lenge
# 0: Healthy, 1: Crackle/Wheeze (Abnormal)
LABEL_TO_IDX = {'Healthy': 0, 'Abnormal': 1}

def extract_mel_spectrogram(file_path):
    try:
        audio, _ = librosa.load(file_path, sr=SAMPLE_RATE, duration=DURATION)
        target_len = SAMPLE_RATE * DURATION
        audio = np.pad(audio, (0, max(0, target_len - len(audio))), 'constant')[:target_len]

        mel_spec = librosa.feature.melspectrogram(y=audio, sr=SAMPLE_RATE, n_mels=N_MELS, hop_length=HOP_LENGTH)
        mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)

        m_min, m_max = mel_spec_db.min(), mel_spec_db.max()
        if m_max - m_min != 0:
            mel_spec_db = (mel_spec_db - m_min) / (m_max - m_min) * 2 - 1
        return mel_spec_db[np.newaxis, ...] 
    except:
        return None

def get_label_from_txt(txt_path):
    """.txt file ko padh kar check karta hai ki crackles/wheezes hain ya nahi."""
    try:
        # ICBHI txt format: [start, end, crackle, wheeze]
        df_ann = pd.read_csv(txt_path, sep='\t', header=None)
        # Agar kisi bhi row mein crackle(col 2) ya wheeze(col 3) '1' hai, toh 'Abnormal'
        has_abnormality = (df_ann[2].sum() > 0) or (df_ann[3].sum() > 0)
        return 'Abnormal' if has_abnormality else 'Healthy'
    except:
        return 'Healthy'

class CoughDataset(Dataset):
    def __init__(self, df, audio_dir):
        self.df = df.reset_index(drop=True)
        self.audio_dir = audio_dir

    def __len__(self): return len(self.df)

    def __getitem__(self, idx):
        file_name = self.df.iloc[idx]['file_name'] + ".wav"
        file_path = os.path.join(self.audio_dir, file_name)
        label = self.df.iloc[idx]['label_idx']
        mel = extract_mel_spectrogram(file_path)
        if mel is None: mel = np.zeros((1, N_MELS, 216), dtype=np.float32)
        return torch.tensor(mel, dtype=torch.float32), torch.tensor(label, dtype=torch.long)

def train():
    if not os.path.exists(AUDIO_DIR):
        print(f"❌ Audio folder nahi mila: {AUDIO_DIR}")
        return

    print(f"🔍 Dataset scan kar raha hoon: {AUDIO_DIR}")

    data = []
    wav_files = [f for f in os.listdir(AUDIO_DIR) if f.lower().endswith(".wav")]
    
    for file in tqdm(wav_files, desc="Labeling Files"):
        wav_path = os.path.join(AUDIO_DIR, file)
        txt_path = wav_path.replace(".wav", ".txt")
        
        if os.path.exists(txt_path):
            category = get_label_from_txt(txt_path)
            data.append({
                'file_name': file.replace('.wav', ''),
                'category': category,
                'label_idx': LABEL_TO_IDX[category]
            })

    df = pd.DataFrame(data)
    if df.empty:
        print("❌ Error: Koi bhi .wav aur .txt ka pair nahi mila.")
        return

    print(f"📊 Stats:\n{df['category'].value_counts()}")

    # Balancing
    max_samples = df['category'].value_counts().max()
    balanced_dfs = [resample(df[df['category'] == c], replace=True, n_samples=max_samples, random_state=42) for c in df['category'].unique()]
    df_balanced = pd.concat(balanced_dfs).sample(frac=1, random_state=42).reset_index(drop=True)

    # Split (Ab 2 hi classes hain: Healthy aur Abnormal)
    train_df, val_df = train_test_split(df_balanced, test_size=0.2, stratify=df_balanced['category'])
    
    train_loader = DataLoader(CoughDataset(train_df, AUDIO_DIR), batch_size=BATCH_SIZE, shuffle=True)
    val_loader = DataLoader(CoughDataset(val_df, AUDIO_DIR), batch_size=BATCH_SIZE)

    # Setup Model (num_classes=2 kyunki Healthy vs Abnormal hai)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = get_model(num_classes=2, device=device) 
    optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)
    criterion = nn.CrossEntropyLoss()

    print(f"🚀 Training on {device}...")
    
    for epoch in range(EPOCHS):
        model.train()
        train_loss, correct, total = 0, 0, 0
        loop = tqdm(train_loader, desc=f"Epoch {epoch+1}/{EPOCHS}")
        for inputs, labels in loop:
            inputs, labels = inputs.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            _, pred = outputs.max(1)
            total += labels.size(0)
            correct += pred.eq(labels).sum().item()
            loop.set_postfix(loss=loss.item(), acc=100.*correct/total)

        # Validation
        model.eval()
        val_correct, val_total = 0, 0
        with torch.no_grad():
            for inputs, labels in val_loader:
                outputs = model(inputs.to(device))
                _, predicted = outputs.max(1)
                val_total += labels.size(0)
                val_correct += predicted.eq(labels.to(device)).sum().item()
        
        print(f"🎯 Validation Accuracy: {100. * val_correct / val_total:.2f}%")
        
        save_path = os.path.join('backend', 'cough_model.pth')
        os.makedirs('backend', exist_ok=True)
        torch.save(model.state_dict(), save_path)

if __name__ == "__main__":
    train()