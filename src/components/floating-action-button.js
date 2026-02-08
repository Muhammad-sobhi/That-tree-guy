"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-[100] flex items-center gap-2 text-xs font-medium transition-all duration-500 group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      {/* Label that hides on mobile to keep it clean */}
      <span className="hidden md:block bg-background text-foreground px-3 py-1 rounded-full shadow-sm border border-border">
        Back to top
      </span>
      
      {/* The Circle Icon from your Footer design */}
      <span className="h-12 w-12 rounded-full border border-primary/20 bg-primary text-primary-foreground flex items-center justify-center shadow-lg group-hover:bg-primary/90 transition-colors">
        <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
      </span>
    </button>
  )
}