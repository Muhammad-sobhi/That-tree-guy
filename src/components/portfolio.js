"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { fetchData, getImageUrl } from "../../lib/api" // Verify this path
import { ArrowUpRight, X } from "lucide-react"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState("All")
  const [projects, setProjects] = useState([]) // Start with empty array
  const sectionRef = useRef(null)

  // Fetch data from Laravel
  useEffect(() => {
    async function getProjects() {
      const data = await fetchData("/portfolio")
      if (Array.isArray(data)) {
        setProjects(data)
      }
    }
    getProjects()
  }, [])

  const categories = ["All", ...new Set(projects.map(p => p.category))]

  const filteredProjects = projects.filter(p => 
    filter === "All" || p.category === filter
  )

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

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-24 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div>
            <span className="text-sm font-medium uppercase tracking-widest text-primary">Portfolio</span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground">Our Recent Work</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-all duration-300 ${filter === cat ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative cursor-pointer transition-all duration-700 ${index === 0 ? "md:col-span-2 md:row-span-2" : ""} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className={`relative overflow-hidden rounded-sm ${index === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-[4/3]"}`}>
                  <Image 
                    src={getImageUrl(project.image_path) || "/placeholder.svg"} 
                    alt={project.title} 
                    fill 
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-xs font-medium uppercase tracking-widest text-primary-foreground/70">{project.category}</span>
                    <h3 className={`font-serif font-medium text-primary-foreground mt-2 ${index === 0 ? "text-2xl md:text-3xl" : "text-xl"}`}>{project.title}</h3>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed rounded-sm">
              No projects found in the database.
            </div>
          )}
        </div>
      </div>

      {/* Modal Logic */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div className="relative max-w-4xl w-full bg-card rounded-sm overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-background/80 flex items-center justify-center">
              <X className="h-5 w-5" />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto">
                <Image 
                   src={getImageUrl(selectedProject.image_path) || "/placeholder.svg"} 
                   alt={selectedProject.title} 
                   fill 
                   unoptimized
                   className="object-cover" 
                />
              </div>
              <div className="p-8">
                <span className="text-sm font-medium uppercase tracking-widest text-primary">{selectedProject.category}</span>
                <h3 className="mt-2 font-serif text-3xl text-foreground">{selectedProject.title}</h3>
                <p className="mt-4 text-muted-foreground">{selectedProject.description}</p>
                <div className="mt-6 flex gap-6 text-sm">
                  <div><span className="text-muted-foreground block">Location</span><p className="font-medium">{selectedProject.location}</p></div>
                  <div><span className="text-muted-foreground block">Year</span><p className="font-medium">{selectedProject.year}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}