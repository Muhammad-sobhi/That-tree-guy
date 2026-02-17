"use client"
import React from 'react';
import { getImageUrl } from "../../lib/api"; // Import your working helper

export default function Partners({ logos }) {
  if (!logos || logos.length === 0) return null;

  return (
    <section className="bg-white py-16 overflow-hidden border-y border-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
            Professional Certifications & Trusted Partners
          </h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex whitespace-nowrap items-center">
          {[...logos, ...logos, ...logos].map((logo, index) => {
            const cleanPath = logo.path?.replace(/\\/g, '/');
            
            return (
              <div key={index} className="mx-12 flex-shrink-0">
                <a 
                  href={logo.url && logo.url !== '#' ? logo.url : undefined} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={logo.url && logo.url !== '#' ? "cursor-pointer" : "cursor-default"}
                >
                  <img
                    src={getImageUrl(cleanPath)}
                    alt={logo.name || "Partner"}
                    className="h-10 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
