"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { fetchData, getImageUrl } from "../../lib/api"
import { 
  TreeDeciduous, 
  Flower2, 
  Scissors, 
  Shovel, 
  Sun, 
  Droplets,
  Loader2 
} from "lucide-react"

const iconMap = {
  TreeDeciduous,
  Flower2,
  Scissors,
  Shovel,
  Sun,
  Droplets,
}

export default function Services() {
  const [services, setServices] = useState([])
  const [activeService, setActiveService] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef(null)

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await fetchData("/services")
        if (data && Array.isArray(data)) {
          setServices(data)
        }
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    loadServices()
  }, [])

  // NEW: Logic to handle "Fast Travel" hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash && hash.startsWith("#service-")) {
        const serviceId = parseInt(hash.split("-")[1])
        const index = services.findIndex(s => s.id === serviceId)
        if (index !== -1) {
          setActiveService(index)
        }
      }
    }

    // Check on load and when hash changes
    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [services])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  if (loading) return (
    <div className="py-24 flex justify-center items-center">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  )

  if (services.length === 0) return (
    <div className="py-24 text-center border-y bg-muted/20">
      <p className="text-muted-foreground">No services found. Check your dashboard.</p>
    </div>
  )

  return (
    <section id="services" ref={sectionRef} className="relative py-24 lg:py-32 bg-card">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`max-w-2xl mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-sm font-medium uppercase tracking-widest text-primary">Our Services</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-medium text-foreground">Crafting Outdoor Excellence</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4">
            {services.map((service, index) => {
              const isActive = activeService === index
              const Icon = iconMap[service.icon] || TreeDeciduous

              let parsedTags = []
              try {
                if (typeof service.tags === 'string') {
                  parsedTags = JSON.parse(service.tags)
                } else if (Array.isArray(service.tags)) {
                  parsedTags = service.tags
                }
              } catch (e) {
                parsedTags = []
              }

              return (
                <div
                  key={service.id || index}
                  /* ADDED ID AND SCROLL MARGIN FOR FAST TRAVEL */
                  id={`service-${service.id}`}
                  className={`group cursor-pointer rounded-sm border p-5 transition-all duration-500 scroll-mt-32 ${
                    isActive ? "border-primary bg-background shadow-lg" : "border-border bg-transparent"
                  }`}
                  onClick={() => setActiveService(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-sm ${isActive ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{service.title}</h3>
                      <div className={`overflow-hidden transition-all duration-500 ${isActive ? "max-h-60 mt-2 opacity-100" : "max-h-0 opacity-0"}`}>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {Array.isArray(parsedTags) && parsedTags.map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase font-bold px-2 py-1 rounded-sm bg-primary/10 text-primary">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className={`text-xl transition-transform ${isActive ? "rotate-45" : ""}`}>+</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="relative h-[700px] lg:min-h-[800px]"> 
            <div className="sticky top-32 h-[600px] lg:h-[750px] w-full">
              <div className="relative h-full w-full overflow-hidden rounded-sm bg-muted">
                {services.map((service, index) => (
                  <Image
                    key={service.id || index}
                    src={getImageUrl(service.image_path)}
                    alt={service.title}
                    fill
                    unoptimized
                    className={`object-cover transition-opacity duration-700 ${activeService === index ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-10 left-10">
                   <p className="text-white font-serif text-4xl">{services[activeService]?.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}