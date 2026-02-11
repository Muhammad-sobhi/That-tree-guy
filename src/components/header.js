"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import api from "../api/axios" // Ensure this path matches your axios instance

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [services, setServices] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Fetch services from dashboard
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services')
        setServices(res.data)
      } catch (err) {
        console.error("Failed to fetch services for menu", err)
      }
    }
    fetchServices()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Function to create a URL-friendly ID from service title
  const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo Section */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary transition-transform duration-300 group-hover:scale-110 overflow-hidden">
            <div className="relative h-full w-full p-2">
              <Image
                src="/images/logo.png"
                alt="That Tree Guy Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <span className={`font-serif text-xl font-semibold tracking-tight transition-colors ${
            isScrolled ? "text-foreground" : "text-white"
          }`}>
            That Tree Guy
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          
          {/* Services Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-sm font-medium transition-colors pb-1 ${
                isScrolled 
                  ? "text-muted-foreground hover:text-foreground" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              Services <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute left-0 top-full pt-2 transition-all duration-300 ${
              dropdownOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
            }`}>
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-w-[220px] p-2">
                {services.length > 0 ? services.map((service) => (
                  <a
                    key={service.id}
                    href={`#service-${service.id}`} // Or #service-title depending on your section IDs
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-primary rounded-xl transition-colors font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {service.title}
                  </a>
                )) : (
                   <span className="block px-4 py-3 text-xs text-gray-400">Loading services...</span>
                )}
                <div className="border-t border-gray-50 mt-1 pt-1">
                  <a href="#services" className="block px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary hover:bg-green-50 rounded-xl">
                    View All Services
                  </a>
                </div>
              </div>
            </div>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full pb-1 ${
                isScrolled 
                  ? "text-muted-foreground hover:text-foreground" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
          >
            Get Free Quote
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`lg:hidden rounded-sm p-2 ${isScrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 space-y-4 border-t border-border overflow-y-auto">
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Our Services</p>
          <div className="grid grid-cols-1 gap-2 pl-2">
            {services.map(service => (
              <a 
                key={service.id} 
                href={`#service-${service.id}`}
                className="text-foreground hover:text-primary font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {service.title}
              </a>
            ))}
          </div>
          <hr className="border-gray-100" />
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block w-full text-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Free Quote
          </a>
        </div>
      </div>
    </header>
  )
}