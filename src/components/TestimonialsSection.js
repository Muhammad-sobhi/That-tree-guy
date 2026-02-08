"use client"

import React, { useEffect, useState } from 'react';
import { fetchData } from '../../lib/api'; // Correct import
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStories = async () => {
            // fetchData already knows your http://localhost:8000/api base URL
            const data = await fetchData('/public/testimonials');
            if (data) {
                setStories(data);
            }
            setLoading(false);
        };

        getStories();
    }, []);

    // If still fetching, don't show an empty box
    if (loading) return null;

    // If no one has been approved yet, hide the whole section
    if (stories.length === 0) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-5xl font-black uppercase tracking-tighter mb-12 italic">What they say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stories.map((s) => (
                        <div key={s.id} className="p-10 rounded-[3rem] bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="flex gap-1 mb-4 text-yellow-400">
                                {/* Ensure rating is a number for the array constructor */}
                                {[...Array(Number(s.rating))].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-xl font-medium italic text-gray-700 mb-6 leading-relaxed">
                                "{s.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-[#4F5D24] rounded-full flex items-center justify-center text-white font-bold uppercase text-xs">
                                    {s.lead?.full_name?.charAt(0) || 'T'}
                                </div>
                                <span className="font-black uppercase text-xs tracking-widest">
                                    {s.lead?.full_name || 'Valued Customer'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}