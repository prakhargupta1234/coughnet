import os
import torch
import librosa
import numpy as np
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS

# Add current directory to path for model import
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from model import get_model

app = Flask(__name__)
CORS(app)

# Constants (Must match train.py)
SAMPLE_RATE = 22050
DURATION = 5
N_MELS = 128
HOP_LENGTH = 512
IDX_TO_LABEL = {0: 'Healthy', 1: 'Abnormal'}

# Load model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = get_model(num_classes=2, device=device)

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'cough_model.pth')
if os.path.exists(MODEL_PATH):
    model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
    model.eval()
    print(f"Model loaded from {MODEL_PATH}")
else:
    print(f"Warning: {MODEL_PATH} not found. Prediction will fail.")

def preprocess_audio(file_path):
    audio, _ = librosa.load(file_path, sr=SAMPLE_RATE, duration=DURATION)
    
    # Pad or trim
    target_len = SAMPLE_RATE * DURATION
    if len(audio) < target_len:
        audio = np.pad(audio, (0, target_len - len(audio)), 'constant')
    else:
        audio = audio[:target_len]
        
    mel_spec = librosa.feature.melspectrogram(
        y=audio, sr=SAMPLE_RATE, n_mels=N_MELS, hop_length=HOP_LENGTH
    )
    mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
    
    # Normalize
    mel_spec_db = (mel_spec_db - mel_spec_db.min()) / (mel_spec_db.max() - mel_spec_db.min())
    mel_spec_db = mel_spec_db * 2 - 1
    
    return torch.tensor(mel_spec_db[np.newaxis, np.newaxis, ...], dtype=torch.float32).to(device)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    # Save temp file
    temp_path = "temp_audio.wav"
    file.save(temp_path)
    
    try:
        # Preprocess
        input_tensor = preprocess_audio(temp_path)
        
        # Inference
        with torch.no_grad():
            output = model(input_tensor)
            _, predicted = torch.max(output, 1)
            prediction = IDX_TO_LABEL[predicted.item()]
            
        # Cleanup
        os.remove(temp_path)
        
        return jsonify({'prediction': prediction})
    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
