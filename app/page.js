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
      // Use the ONE route that we know is public in your api.php
      const response = await fetchData('/public/landing-page');
      
      if (response) {
        // Handle both Array and Object responses from Laravel
        const rawSettings = response.settings || response;
        if (Array.isArray(rawSettings)) {
          const flattened = {};
          rawSettings.forEach(item => { flattened[item.key] = item.value; });
          setSettings(flattened);
        } else {
          setSettings(rawSettings);
        }

        // If your landing-page data includes logos, set them here
        if (response.partners) setPartners(response.partners);
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
      {/* Pass settings as a prop so About doesn't have to fetch again */}
      <About settings={settings} />
      <Portfolio />
      <Partners logos={partners} />
      <TestimonialsSection />
      <Contact />
      <Footer settings={settings} />
    </main>
  )
}