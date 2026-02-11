"use client"

import React, { useState, useEffect } from "react" // Added missing hooks
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
import { fetchData } from "../src/lib/api"

export default function Home() {
  const [partners, setPartners] = useState([]);
  const [settings, setSettings] = useState({}); // Added state for Footer links

  useEffect(() => {
    async function loadData() {
      // Fetch Partners (Logos)
      const partnersData = await fetchData('/partners');
      if (partnersData) setPartners(partnersData);

      // Fetch Settings (Social Media links for Footer)
      const settingsData = await fetchData('/settings');
      if (settingsData) {
        // If settings come as an array from Laravel, flatten them into an object
        if (Array.isArray(settingsData)) {
          const flattened = {};
          settingsData.forEach(item => { flattened[item.key] = item.value; });
          setSettings(flattened);
        } else {
          setSettings(settingsData);
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
      <About />
      <Portfolio />
      
      {/* Partners section now has the data */}
      <Partners logos={partners} />
      
      <TestimonialsSection />
      
      <Contact />
      
      {/* We pass the settings to the footer here */}
      <Footer settings={settings} />
    </main>
  )
}