"use client"
import { Instagram, Facebook, Linkedin, Twitter, Leaf } from "lucide-react"

export function Footer({ settings = {} }) {
  const socials = [
    { icon: Instagram, url: settings?.social_instagram },
    { icon: Facebook, url: settings?.social_facebook },
    { icon: Linkedin, url: settings?.social_linkedin },
    { icon: Twitter, url: settings?.social_twitter },
  ].filter(s => s.url); // Only show icons that have a URL

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="text-green-500" />
            <span className="text-xl font-bold">That Tree Guy</span>
          </div>
          <p className="text-gray-400 text-sm max-w-xs">Professional tree services and landscaping.</p>
        </div>
        
        <div className="flex gap-4">
          {socials.map((s, i) => (
            <a key={i} href={s.url} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all">
              <s.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}