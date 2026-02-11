"use client"

import React, { useState, useEffect } from "react"
import { Header } from "../src/components/header"
import { Hero } from "../src/components/hero"
import Services from "../src/components/services"
import About from "../src/components/about"
import Portfolio from "../src/components/portfolio"
import TestimonialsSection from "../src/components/TestimonialsSection" 
import { Contact } from "../src/components/contact"
import { Footer } from "../src/components/footer"
import { ScrollProgress } from "../src/components/scroll-progress"
import { MarqueeText } from "../src/components/marquee-text"
import Partners from "../src/components/Partners"
import { fetchData } from "../lib/api"

export default function Home() {
  const [partners, setPartners] = useState([]);
  const [settings, setSettings] = useState({});

  
    useEffect(() => {
      async function loadData() {
        const response = await fetchData('/public/landing-page');
        
        if (response) {
          // 1. EXTRACT SETTINGS
          const rawSettings = response.settings || response;
          let flattened = {};
          if (Array.isArray(rawSettings)) {
            rawSettings.forEach(item => { flattened[item.key] = item.value; });
            setSettings(flattened);
          } else {
            flattened = rawSettings;
            setSettings(rawSettings);
          }
  
          // 2. EXTRACT PARTNERS
          // Your dashboard saves partners as a JSON string inside settings.partner_logos
          if (flattened.partner_logos) {
            try {
              const parsedPartners = JSON.parse(flattened.partner_logos);
              setPartners(parsedPartners);
            } catch (e) {
              console.error("Error parsing partners", e);
              setPartners([]);
            }
          } else {
            // Fallback to direct key if your backend sends it separately
            const partnerData = response.partners || response.logos || [];
            setPartners(partnerData);
          }
        }
      }
      loadData();
    }, []);
  
    return (
      <main className="relative overflow-x-hidden">
        <ScrollProgress />
        <Header />
        <Hero />
        <MarqueeText />
        <Services />
        <About settings={settings} />
        <Portfolio />
        
        {/* This is placed between Portfolio and Testimonials */}
        <Partners logos={partners} />
        
        <TestimonialsSection />
        <Contact />
        <Footer settings={settings} />
      </main>
    )
  }