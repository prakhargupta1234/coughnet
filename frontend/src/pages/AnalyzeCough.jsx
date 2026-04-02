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
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Header Section */}
                <div className="p-8 text-center border-b border-gray-50 dark:border-gray-700">
                    <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                        <FileAudio size={32} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Analyze Your Cough</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Upload your cough audio for AI-powered respiratory analysis
                    </p>
                </div>

                <div className="p-8 space-y-6">
                    {/* File Upload Area */}
                    {!file ? (
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="relative group border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-2xl p-10 text-center transition-all cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10"
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
                                <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Click to upload or drag and drop</p>
                                <p className="mt-1 text-sm text-gray-400">Supports MP3, WAV, OGG (Max 5MB)</p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-xl">
                                    <FileAudio size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white truncate">{file.name}</p>
                                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <button 
                                    onClick={handleReset}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            {/* Audio Player */}
                            {audioUrl && (
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Audio Preview</p>
                                    <audio controls src={audioUrl} className="w-full h-10" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 animate-in slide-in-from-top-2">
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
                            ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]'
                        }`}
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
                <div className="bg-gray-50 dark:bg-gray-900/30 p-4 px-8 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <p className="text-xs text-gray-500 font-medium italic">
                        Tip: For best results, record in a quiet room and keep the microphone 1 foot away.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AnalyzeCough;
