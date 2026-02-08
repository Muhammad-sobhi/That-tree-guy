"use client"

import { Header } from "../src/components/header"
import { Hero } from "../src/components/hero"
import  Services  from "../src/components/services"
import About from "../src/components/about"
import  Portfolio  from "../src/components/portfolio"
// Replace or keep alongside:
import TestimonialsSection from "../src/components/TestimonialsSection" 
import { Contact } from "../src/components/contact"
import { Footer } from "../src/components/footer"
import { ScrollProgress } from "../src/components/scroll-progress"
import { MarqueeText } from "../src/components/marquee-text"

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <ScrollProgress />
      <Header />
      <Hero />
      <MarqueeText />
      <Services />
      <About />
      <Portfolio />
      
      {/* Replace <Reviews /> with <TestimonialsSection /> 
         to show the dynamic data from your database.
      */}
      <TestimonialsSection />
      
      <Contact />
      <Footer />
    </main>
  )
}