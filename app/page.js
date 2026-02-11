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
      // This is the correct public route from your api.php
      const response = await fetchData('/public/landing-page');
      
      if (response) {
        // 1. EXTRACT SETTINGS
        const rawSettings = response.settings || response;
        if (Array.isArray(rawSettings)) {
          const flattened = {};
          rawSettings.forEach(item => { flattened[item.key] = item.value; });
          setSettings(flattened);
        } else {
          setSettings(rawSettings);
        }

        // 2. EXTRACT PARTNERS (The Fix)
        // Check every possible key Laravel might be using for your partners/logos
        const partnerData = response.partners || response.logos || [];
        setPartners(partnerData);
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
      {/* Ensure About receives the settings prop */}
      <About settings={settings} />
      <Portfolio />
      
      {/* This will now receive the array, making the section visible */}
      <Partners logos={partners} />
      
      <TestimonialsSection />
      <Contact />
      <Footer settings={settings} />
    </main>
  )
}