"use client"

export function MarqueeText() {
  const items = [
    "Hedge Trimming",
    "Tree Care",
    "Tree Prune",
    "Tree Planting",
    "Emergency Service 24/7",
    "Stump Grinding"
  ]

  return (
    <div className="relative bg-primary py-4 overflow-hidden border-y border-primary-foreground/10">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* We repeat the array to ensure a seamless loop */}
        {[...items, ...items, ...items].map((item, index) => (
          <span
            key={index}
            className="mx-8 text-sm font-medium uppercase tracking-widest text-primary-foreground/90 flex items-center gap-8"
          >
            {item}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary" />
          </span>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}