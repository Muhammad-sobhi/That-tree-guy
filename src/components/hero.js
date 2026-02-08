"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* 1. Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-60" // Lower opacity to make text pop
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* 2. Gradient Overlay (Vignette) for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      </div>

      {/* 3. Content Layer */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-sm text-white mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span>Serving Canada Since 2010</span>
          </div>

          {/* Main Title */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.1] tracking-tight text-white">
              Where Nature <br />
              <span className="text-secondary italic">Meets Design</span>
            </h1>

            <p className="max-w-xl text-lg md:text-xl leading-relaxed text-white/80">
              We transform outdoor spaces into living masterpieces. Expert tree care, 
              garden design, and landscape artistry that elevates your property.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-secondary px-8 py-4 text-base font-medium text-secondary-foreground transition-all duration-300 hover:scale-105"
              >
                Start Your Project
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-sm border border-white/30 bg-white/5 backdrop-blur-sm px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-white/10"
              >
                View Our Work
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-12 border-t border-white/10 mt-12">
              <div>
                <div className="text-3xl md:text-4xl font-serif font-semibold text-white">500+</div>
                <div className="text-sm uppercase tracking-widest text-white/50">Projects</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-serif font-semibold text-white">15+</div>
                <div className="text-sm uppercase tracking-widest text-white/50">Years Exp</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}