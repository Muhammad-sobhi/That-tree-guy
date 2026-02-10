"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { fetchData, getImageUrl } from "../../lib/api" // Adjust path if needed
import { Award, Users, Leaf, Shield } from "lucide-react"

const valueIcons = {
  Excellence: Award,
  Community: Users,
  Sustainability: Leaf,
  Trust: Shield,
}

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [settings, setSettings] = useState(null)
  const [counters, setCounters] = useState({ years: 0, projects: 0, team: 0 })
  const sectionRef = useRef(null)

  useEffect(() => {
    async function loadSettings() {
      const data = await fetchData("/settings")
      if (data) setSettings(data)
    }
    loadSettings()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          
          // Use DB values if they exist, otherwise use your hardcoded defaults
          const targets = {
            years: parseInt(settings?.stat_years) || 15,
            projects: parseInt(settings?.stat_projects) || 500,
            team: parseInt(settings?.stat_team) || 25,
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
              team: Math.round(targets.team * progress),
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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src={settings?.about_image_path ? getImageUrl(settings.about_image_path) : "/images/team.jpg"}                alt="Our professional team"
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
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
            </div>
          </div>

          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div>
              <span className="text-sm font-medium uppercase tracking-widest text-primary">About Us</span>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl font-medium text-foreground leading-tight">
                {settings?.about_title || "Deep Roots, Growing Legacy"}
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {settings?.about_description || "Founded in 2010, That Tree Guy began as a passion project by a single arborist..."}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-8">
              {Object.keys(valueIcons).map((title, index) => {
                const Icon = valueIcons[title]
                const dbValue = settings?.[`value_${title.toLowerCase()}`]
                return (
                  <div key={title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {dbValue || `Our commitment to ${title.toLowerCase()} in every project.`}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
