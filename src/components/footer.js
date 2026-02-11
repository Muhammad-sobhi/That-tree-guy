"use client"

import React, { useState } from "react"
import { Leaf, Instagram, Facebook, Linkedin } from "lucide-react"

const footerLinks = {
  services: [
    { label: "Tree Care", href: "#services" },
    { label: "Garden Design", href: "#services" },
    { label: "Landscape Construction", href: "#services" },
    { label: "Irrigation Systems", href: "#services" },
    { label: "Seasonal Maintenance", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Reviews", href: "#reviews" },
    { label: "Careers", href: "#contact" },
  ],
  resources: [
    { label: "Tree Care Tips", href: "#" },
    { label: "Garden Planning Guide", href: "#" },
    { label: "Seasonal Calendar", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Blog", href: "#" },
  ],
}

const serviceAreas = [
  "Toronto", "Oakville", "Mississauga", "Burlington", "Hamilton",
  "Vancouver", "Calgary", "Ottawa", "Montreal"
]

export function Footer({ settings = {} }) {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  // This maps your database keys to the icons
  const socialConfigs = [
    { icon: Instagram, url: settings.social_instagram, label: "Instagram" },
    { icon: Facebook, url: settings.social_facebook, label: "Facebook" },
    { icon: Linkedin, url: settings.social_linkedin, label: "LinkedIn" },
  ]

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="relative bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-3xl font-medium">Stay Rooted in the Know</h3>
              <p className="mt-4 text-background/70 max-w-md">
                Subscribe for seasonal tips and landscaping inspiration delivered to your inbox.
              </p>
            </div>
            <div>
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-sm bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:border-background/40"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-sm bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
                >
                  {isSubscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="font-serif text-xl font-semibold">That Tree Guy</span>
            </div>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">
              Transforming Canadian outdoor spaces since 2010. Expert tree care and landscape design.
            </p>
            
            {/* DYNAMIC SOCIAL MEDIA SECTION */}
            <div className="mt-6 flex gap-4">
              {socialConfigs.map((social) => {
                // If there is no URL in settings, don't render the icon
                if (!social.url) return null;

                return (
                  <a 
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-background/20 hover:bg-background/10 hover:border-background/40 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 text-background/70 hover:text-background" />
                  </a>
                )
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 capitalize">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Service Areas</h4>
            <div className="flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span key={area} className="text-xs px-2 py-1 rounded-sm bg-background/10 text-background/70">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-background/50">
              <span>&copy; {new Date().getFullYear()} That Tree Guy.</span>
              <a href="#" className="hover:text-background">Privacy Policy</a>
              <a href="#" className="hover:text-background">Terms</a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <div className="font-serif text-[15vw] font-bold text-background/[0.02] whitespace-nowrap leading-none translate-y-1/3">
          THAT TREE GUY
        </div>
      </div>
    </footer>
  )
}