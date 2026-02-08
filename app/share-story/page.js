'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// import { fetchData } from '../../lib/api'; // Matches your lib/api.js location
import { Star, Send, CheckCircle } from 'lucide-react';

function StoryForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) return;
        
        setStatus('loading');
        try {
            // We use the browser's native fetch here to send the POST request
            const response = await fetch(`http://localhost:8000/api/submit-story`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    token: token, 
                    content: content, 
                    rating: rating 
                }),
            });
    
            if (response.ok) {
                setStatus('success');
            } else {
                const errorData = await response.json();
                console.error("Server Error:", errorData);
                setStatus('error');
                alert(errorData.message || "Failed to submit story.");
            }
        } catch (err) {
            console.error("Network Error:", err);
            setStatus('error');
            alert("Could not connect to the server. Is your backend running?");
        }
    };

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                <CheckCircle size={64} className="text-green-500" />
                <h1 className="text-3xl font-black uppercase italic">Thank You!</h1>
                <p className="text-gray-500 font-medium">Your story has been shared successfully.</p>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto py-20 px-6 min-h-screen">
            <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-2">Share your story</h1>
            <p className="text-gray-500 mb-10 font-medium text-lg italic">How was your experience with That Tree Guy?</p>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Star Rating */}
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="transition-transform active:scale-90"
                            >
                                <Star 
                                    size={36} 
                                    fill={star <= rating ? "#fbbf24" : "none"} 
                                    className={star <= rating ? "text-yellow-400" : "text-gray-200"} 
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Review Text */}
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your experience</label>
                    <textarea 
                        required
                        placeholder="Type your story here..."
                        className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] min-h-[200px] font-medium text-lg outline-none focus:ring-4 focus:ring-green-500/10 transition-all shadow-inner"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <button 
                    disabled={status === 'loading' || !token}
                    type="submit"
                    className="w-full py-5 bg-[#4F5D24] text-white rounded-full font-black uppercase italic tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-50"
                >
                    {status === 'loading' ? 'Sending...' : (
                        <>Submit Review <Send size={20} /></>
                    )}
                </button>
                
                {!token && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold text-center border border-red-100">
                        Error: Invalid or expired access link.
                    </div>
                )}
            </form>
        </div>
    );
}

export default function ShareStoryPage() {
    return (
        <Suspense fallback={<div className="p-20 text-center font-black uppercase italic">Loading...</div>}>
            <StoryForm />
        </Suspense>
    );
}