"use client"

import React, { useEffect, useRef, useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef(null)

  const [formState, setFormState] = useState({
    full_name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    service_type: "",
    description: "",
  })

  const services = [
    "Tree Removal",
    "Tree Pruning",
    "Garden Design",
    "Landscape Construction",
    "Hedge Trimming",
    "Irrigation Systems",
    "Seasonal Maintenance",
    "Other",
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formState),
      })

      if (!response.ok) throw new Error("Submission failed")

      setIsSubmitted(true)
      setFormState({
        full_name: "",
        phone: "",
        email: "",
        city: "",
        address: "",
        service_type: "",
        description: "",
      })

      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (err) {
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32 bg-background">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* HEADER */}
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            Get In Touch
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-medium">
            Let's Start Planning
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Ready to transform your outdoor space? Get a free consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* LEFT INFO (UNCHANGED DESIGN) */}
          <div className={`lg:col-span-2 space-y-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            {[
              { icon: MapPin, title: "Visit Us", details: ["Cairo, Egypt"] },
              { icon: Phone, title: "Call Us", details: ["+20 XXX XXX XXXX"] },
              { icon: Mail, title: "Email Us", details: ["info@yourcompany.com"] },
              { icon: Clock, title: "Hours", details: ["Sun-Thu: 8am - 6pm"] },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex gap-4">
                  <div className="h-12 w-12 rounded-sm bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.details.map((d) => (
                      <p key={d} className="text-muted-foreground text-sm">{d}</p>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* FORM (OLD DESIGN, NEW LOGIC) */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="bg-card rounded-sm p-8 md:p-10 shadow-xl border">

              {isSubmitted ? (
                <div className="flex flex-col items-center py-12">
                  <CheckCircle className="h-10 w-10 text-primary mb-4" />
                  <h4 className="text-xl font-semibold">Thank You!</h4>
                  <p className="text-muted-foreground">We’ll contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">

  {/* Row 1 */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <input
      required
      placeholder="Full Name *"
      value={formState.full_name}
      onChange={(e) => setFormState({ ...formState, full_name: e.target.value })}
      className="input"
    />
    <input
      required
      placeholder="Phone *"
      value={formState.phone}
      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
      className="input"
    />
  </div>

  {/* Row 2 */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <input
      required
      placeholder="City *"
      value={formState.city}
      onChange={(e) => setFormState({ ...formState, city: e.target.value })}
      className="input"
    />
    <input
      placeholder="Email"
      type="email"
      value={formState.email}
      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
      className="input"
    />
  </div>

  {/* Row 3 */}
  <input
    required
    placeholder="Address *"
    value={formState.address}
    onChange={(e) => setFormState({ ...formState, address: e.target.value })}
    className="input"
  />

  {/* Row 4 */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <select
      required
      value={formState.service_type}
      onChange={(e) =>
        setFormState({ ...formState, service_type: e.target.value })
      }
      className="input"
    >
      <option value="">Select a service *</option>
      {services.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>

    <textarea
      rows={4}
      placeholder="Project Details"
      value={formState.description}
      onChange={(e) =>
        setFormState({ ...formState, description: e.target.value })
      }
      className="input resize-none"
    />
  </div>

  {/* Button */}
  <button
    disabled={isSubmitting}
    className="w-full bg-primary text-white py-4 rounded-sm flex items-center justify-center gap-2 disabled:opacity-50"
  >
    {isSubmitting ? "Sending..." : "Send Request"}
    <Send className="h-4 w-4" />
  </button>

</form>

              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
