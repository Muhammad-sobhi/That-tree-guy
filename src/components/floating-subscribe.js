"use client"

import { useState, useEffect } from "react"
import { Mail, X, Send } from "lucide-react"

export function FloatingSubscribe() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  // This effect will trigger the form to open every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Only auto-open if the user hasn't already submitted the form
      if (!submitted) {
        setIsOpen((prev) => !prev) 
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [submitted])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      setSubmitted(false)
      setEmail("")
    }, 2000)
  }

  return (
    <>
      {/* 1. The Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-8 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[#1e3a2f] text-white shadow-2xl transition-all duration-300 hover:scale-110 subscribe-attention"
        aria-label="Subscribe"
      >
        <Mail className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 border-2 border-[#1e3a2f]" />
      </button>

      {/* 2. The Form Panel */}
      <div
        className={`fixed bottom-24 right-24 z-[70] w-[280px] transition-all duration-500 ease-in-out transform ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-2xl relative text-gray-900">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-black"
          >
            <X className="h-4 w-4" />
          </button>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <h4 className="font-serif text-base font-semibold text-[#1e3a2f]">Special Offer!</h4>
              <p className="text-[11px] text-gray-500 leading-tight">
                Don't miss our seasonal landscape tips. Join 500+ homeowners.
              </p>
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-md border border-gray-300 outline-none focus:ring-1 focus:ring-[#1e3a2f]"
              />
              <button 
                type="submit" 
                className="w-full bg-[#1e3a2f] text-white py-2 rounded-md text-xs font-bold hover:bg-opacity-90 transition-all"
              >
                Subscribe Now
              </button>
            </form>
          ) : (
            <div className="text-center py-2 text-green-700 text-sm font-bold">
              ✓ Welcome to the team!
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes strong-wiggle {
          0%, 90%, 100% { transform: rotate(0deg) scale(1); }
          92% { transform: rotate(15deg) scale(1.1); }
          94% { transform: rotate(-15deg) scale(1.1); }
          96% { transform: rotate(15deg) scale(1.1); }
          98% { transform: rotate(-15deg) scale(1.1); }
        }

        .subscribe-attention {
          animation: strong-wiggle 3s infinite;
        }
      `}</style>
    </>
  )
}