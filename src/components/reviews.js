"use client"

import { useEffect, useRef, useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "Toronto, ON",
    rating: 5,
    text: "That Tree Guy transformed our backyard into an absolute paradise. The attention to detail and the care they took with our century-old oak tree was remarkable.",
    project: "Full Landscape Design",
    avatar: "SM",
  },
  {
    id: 2,
    name: "David Chen",
    location: "Vancouver, BC",
    rating: 5,
    text: "Professional, punctual, and passionate about their work. The team removed several hazardous trees safely and even planted new ones to replace them.",
    project: "Tree Removal & Planting",
    avatar: "DC",
  },
  {
    id: 3,
    name: "Emily Thompson",
    location: "Calgary, AB",
    rating: 5,
    text: "We hired them for a simple hedge trim but ended up getting a complete garden consultation. Their expertise in native Canadian plants helped us create a low-maintenance yard.",
    project: "Garden Consultation",
    avatar: "ET",
  },
]

export function Reviews() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const nextReview = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevReview = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const timer = setInterval(nextReview, 6000)
    return () => clearInterval(timer)
  }, [isAnimating])

  return (
    <section id="reviews" ref={sectionRef} className="relative py-24 lg:py-32 bg-primary overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary-foreground/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary-foreground/5 blur-3xl" />
      </div>

      <div className="absolute top-12 left-12 opacity-10">
        <Quote className="h-32 w-32 text-primary-foreground" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-sm font-medium uppercase tracking-widest text-primary-foreground/70">Testimonials</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-medium tracking-tight text-primary-foreground">What Our Clients Say</h2>
        </div>

        <div className={`relative max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="bg-card rounded-sm p-8 md:p-12 shadow-2xl min-h-[400px] flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                ))}
              </div>

              <div className="relative h-32 md:h-24">
                {reviews.map((review, index) => (
                  <p
                    key={review.id}
                    className={`font-serif text-xl md:text-2xl leading-relaxed text-foreground transition-all duration-500 absolute inset-0 ${currentIndex === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                  >
                    &ldquo;{review.text}&rdquo;
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-8">
              <div className="relative h-16 w-full">
                {reviews.map((review, index) => (
                  <div
                    key={review.id}
                    className={`flex items-center gap-4 transition-all duration-500 absolute inset-0 ${currentIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  >
                    <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{review.name}</div>
                      <div className="text-sm text-muted-foreground">{review.location}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={prevReview} className="h-12 w-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={nextReview} className="h-12 w-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}