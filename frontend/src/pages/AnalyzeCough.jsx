import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileAudio, Trash2, AlertCircle, Loader2, RefreshCw } from 'lucide-react';

const AnalyzeCough = () => {
    const navigate = useNavigate();
    // --- State Management ---
    const [file, setFile] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    // --- Validation Rules ---
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3'];

    // --- Handlers ---
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Reset previous state
        setError('');
        
        // Validate Type
        if (!ALLOWED_TYPES.includes(selectedFile.type) && !selectedFile.name.match(/\.(mp3|wav|ogg)$/i)) {
            setError('Invalid file format. Please upload .mp3, .wav, or .ogg');
            return;
        }

        // Validate Size
        if (selectedFile.size > MAX_FILE_SIZE) {
            setError('File size too large. maximum limit is 5MB.');
            return;
        }

        // Success: Set file and create preview URL
        setFile(selectedFile);
        const url = URL.createObjectURL(selectedFile);
        setAudioUrl(url);
    };

    const handleAnalyze = async () => {
        if (!file) return;

        try {
            setIsLoading(true);
            setError('');

            // Simulate API Call (2 seconds delay)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Generate Random Result
            const statuses = ['Healthy', 'Infected'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const randomConfidence = (Math.random() * (95 - 80) + 80).toFixed(1);

            navigate('/result', { 
                state: { 
                    status: randomStatus, 
                    confidence: randomConfidence 
                } 
            });
        } catch (err) {
            setError('An error occurred during analysis. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setAudioUrl(null);
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4 min-h-[calc(100vh-120px)] animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-full max-w-2xl rounded-3xl shadow-xl border overflow-hidden transition-colors duration-300"
                 style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                {/* Header Section */}
                <div className="p-8 text-center border-b" style={{ borderColor: 'var(--border)' }}>
                    <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl"
                         style={{ backgroundColor: 'var(--primary)15', color: 'var(--primary)' }}>
                        <FileAudio size={32} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Analyze Your Cough</h1>
                    <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
                        Upload your cough audio for AI-powered respiratory analysis
                    </p>
                </div>

                <div className="p-8 space-y-6">
                    {/* File Upload Area */}
                    {!file ? (
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="relative group border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer hover:border-blue-400"
                            style={{ borderColor: 'var(--border)' }}
                        >
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".mp3,.wav,.ogg"
                                className="hidden"
                            />
                            <div className="flex flex-col items-center">
                                <Upload size={48} className="text-gray-300 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300" />
                                <p className="mt-4 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Click to upload or drag and drop</p>
                                <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>Supports MP3, WAV, OGG (Max 5MB)</p>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl p-6 border relative overflow-hidden" 
                             style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--primary)20', color: 'var(--primary)' }}>
                                    <FileAudio size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{file.name}</p>
                                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <button 
                                    onClick={handleReset}
                                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            {/* Audio Player */}
                            {audioUrl && (
                                <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-secondary)' }}>Audio Preview</p>
                                    <audio controls src={audioUrl} className="w-full h-10" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 p-4 rounded-xl text-red-600 dark:text-red-400 animate-in slide-in-from-top-2"
                             style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                            <AlertCircle size={18} />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Analyze Button */}
                    <button
                        onClick={handleAnalyze}
                        disabled={!file || isLoading}
                        className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                            !file || isLoading 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                        style={{ backgroundColor: !file || isLoading ? 'var(--border)' : 'var(--primary)' }}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Analyzing acoustic patterns...</span>
                            </>
                        ) : (
                            <>
                                <RefreshCw size={20} />
                                <span>Analyze Cough</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Footer Tip */}
                <div className="p-4 px-8 flex items-center gap-3" style={{ backgroundColor: 'var(--bg)' }}>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <p className="text-xs font-medium italic" style={{ color: 'var(--text-secondary)' }}>
                        Tip: For best results, record in a quiet room and keep the microphone 1 foot away.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AnalyzeCough;
