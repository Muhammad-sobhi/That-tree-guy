"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* 1. Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={(e) => e.currentTarget.classList.replace('opacity-0', 'opacity-60')}
          className="h-full w-full object-cover opacity-0 transition-opacity duration-1000"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* 2. Sophisticated Gradient Overlay */}
        {/* This creates a dark "safe zone" for text on the left while fading to clear on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
        
        {/* Optional: Bottom fade to blend with the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      {/* 3. Content Layer */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          
          {/* Badge / Location Info */}
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-sm text-white mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="font-medium tracking-wide">Serving Canada Since 2010</span>
          </div>

          {/* Main Typography Block */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.1] tracking-tighter text-white">
              Where Nature <br />
              <span className="text-secondary italic">Meets Design</span>
            </h1>

            <p className="max-w-xl text-lg md:text-xl leading-relaxed text-white/80 font-light">
              We transform outdoor spaces into living masterpieces. Expert tree care, 
              garden design, and landscape artistry that elevates your property.
            </p>

            {/* Call to Action Section */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-secondary px-8 py-4 text-base font-semibold text-secondary-foreground transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
              >
                Start Your Project
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </a>
              
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-sm border border-white/30 bg-white/5 backdrop-blur-md px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-white/10"
              >
                View Our Work
              </a>
            </div>

            {/* Trust Indicators / Stats */}
            <div className="flex gap-12 pt-12 border-t border-white/10 mt-12">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-serif font-semibold text-white">500+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">Projects Completed</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-serif font-semibold text-white">15+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">Years Experience</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}