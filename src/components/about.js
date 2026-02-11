"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { getImageUrl } from "../../lib/api"
import { Award, Users, Leaf, Shield } from "lucide-react"

const valueIcons = { Excellence: Award, Community: Users, Sustainability: Leaf, Trust: Shield }

export default function About({ settings }) {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ years: 0, projects: 0, team: 0 })
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) return;

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          const targets = {
            years: parseInt(settings?.stat_years) || 15,
            projects: parseInt(settings?.stat_projects) || 500,
            team: parseInt(settings?.stat_team) || 25,
          }
          let step = 0;
          const timer = setInterval(() => {
            step++;
            setCounters({
              years: Math.round(targets.years * (step / 50)),
              projects: Math.round(targets.projects * (step / 50)),
              team: Math.round(targets.team * (step / 50)),
            })
            if (step >= 50) clearInterval(timer)
          }, 30)
        }
      }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [settings])

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
             <Image 
                src={settings?.about_image_path ? getImageUrl(settings.about_image_path) : "/images/placeholder.jpg"} 
                fill unoptimized className="object-cover" alt="About"
             />
             <div className="absolute bottom-4 right-4 bg-primary p-6 text-white rounded-xl shadow-xl">
                <p className="text-2xl font-bold">{counters.years}+ Years</p>
             </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold">{settings?.about_title || "Rooted in Excellence"}</h2>
            <p className="text-muted-foreground whitespace-pre-line">{settings?.about_description || "Expert tree care services tailored for your landscape."}</p>
            <div className="grid grid-cols-2 gap-4">
               {Object.keys(valueIcons).map(v => (
                 <div key={v} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold">{v}</h4>
                    <p className="text-xs text-gray-500">{settings?.[`value_${v.toLowerCase()}`] || "Committed to quality."}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}