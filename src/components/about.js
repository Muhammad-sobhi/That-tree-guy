"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { getImageUrl } from "../../lib/api"
import { Award, Users, Leaf, Shield } from "lucide-react"

const valueIcons = {
  Excellence: Award,
  Community: Users,
  Sustainability: Leaf,
  Trust: Shield,
}

export default function About({ settings }) {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ years: 0, projects: 0, team: 0 })
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          
          // REMOVED FAKE NUMBERS: Now defaults to 0 if not in DB
          const targets = {
            years: parseInt(settings?.stat_years) || 0,
            projects: parseInt(settings?.stat_projects) || 0,
            team: parseInt(settings?.stat_team) || 0,
          }

          const duration = 2000
          const steps = 60
          const interval = duration / steps
          let step = 0
          
          const timer = setInterval(() => {
            step++
            const progress = step / steps
            setCounters({
              years: Math.round(targets.years * progress),
              projects: Math.round(targets.projects * progress),
              team: Math.round(targets.projects * progress), // Adjusted to match projects mapping
            })
            if (step >= steps) clearInterval(timer)
          }, interval)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [settings])

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32 bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-serif text-[20vw] font-bold text-primary/[0.03] whitespace-nowrap">ROOTS</span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
              {/* Only show image if path exists */}
              {settings?.about_image_path && (
                <Image
                  src={getImageUrl(settings.about_image_path)}
                  alt="Our professional team"
                  fill
                  unoptimized
                  className="object-cover"
                />
              )}
              
              {/* Stats only show if at least one number is greater than 0 */}
              {(counters.years > 0 || counters.projects > 0 || counters.team > 0) && (
                <div className="absolute -bottom-8 -right-8 bg-primary text-primary-foreground p-8 rounded-sm shadow-2xl hidden md:block">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-serif font-bold">{counters.years}+</div>
                      <div className="text-xs uppercase tracking-widest opacity-80">Years</div>
                    </div>
                    <div className="border-x border-primary-foreground/20 px-4">
                      <div className="text-3xl font-serif font-bold">{counters.projects}+</div>
                      <div className="text-xs uppercase tracking-widest opacity-80">Projects</div>
                    </div>
                    <div>
                      <div className="text-3xl font-serif font-bold">{counters.team}+</div>
                      <div className="text-xs uppercase tracking-widest opacity-80">Team</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div>
              <span className="text-sm font-medium uppercase tracking-widest text-primary">About Us</span>
              {/* REMOVED FAKE TITLE */}
              <h2 className="mt-4 font-serif text-4xl md:text-5xl font-medium text-foreground leading-tight">
                {settings?.about_title || ""}
              </h2>
            </div>

            {/* REMOVED FAKE DESCRIPTION */}
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {settings?.about_description || ""}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-8">
              {Object.keys(valueIcons).map((title) => {
                const Icon = valueIcons[title]
                const dbValue = settings?.[`value_${title.toLowerCase()}`]
                
                // Only render the value if it has a description in the DB
                if (!dbValue) return null;

                return (
                  <div key={title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{dbValue}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Extra section (already had logic to hide if empty) */}
            {(settings?.about_extra_image_path || settings?.about_extra_text) && (
              <div className="mt-12 pt-12 border-t border-primary/10 space-y-6">
                {settings?.about_extra_image_path && (
                  <div className="relative aspect-video overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-500">
                    <Image
                      src={getImageUrl(settings.about_extra_image_path)}
                      alt="Additional info"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )}
                {settings?.about_extra_text && (
                  <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-4">
                    {settings.about_extra_text}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}