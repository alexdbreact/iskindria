'use client';

import Link from 'next/link';
import CustomCursor from '@/components/CustomCursor';
import LighthouseIcon from '@/components/LighthouseIcon';
import { ArrowLeft, Compass, Waves, Landmark, BookOpen, MapPin } from 'lucide-react';

const CHAPTERS = [
  {
    title: "Citadel of Qaitbay",
    tagline: "Guardian of the Eastern Harbour",
    desc: "Erected upon the exact foundations of the Pharos Lighthouse—one of the Seven Wonders of the Ancient World.",
    category: "Fortress & History",
    icon: Landmark,
    image: "/images/q.jpg"
  },
  {
    title: "Bibliotheca Alexandrina",
    tagline: "The Modern Revival of Global Knowledge",
    desc: "A breathtaking architectural marvel tilting toward the Mediterranean, reviving the ancient legacy of Ptolemaic wisdom.",
    category: "Knowledge & Architecture",
    icon: BookOpen,
    image: "/images/b.jpg"
  },
  {
    title: "Corniche of Alexandria",
    tagline: "Timeless Mediterranean Whispers",
    desc: "Ten miles of storied waterfront promenade where poets, philosophers, and waves meet under golden sunsets.",
    category: "Coast & Atmosphere",
    icon: Waves,
    image: "/images/c.jpg"
  }
];

export default function StartPage() {
  return (
    <div className="min-h-screen w-full bg-[#0E0C13] text-neutral-100 flex flex-col justify-between overflow-y-auto overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* Custom Lighthouse Cursor */}
      <CustomCursor />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-35">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-600/20 via-purple-900/10 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Top Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill text-sm font-medium text-neutral-300 hover:text-white hover:border-amber-400/40 transition-all duration-300 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to 3D Sphere</span>
        </Link>

        <div className="flex items-center gap-2 text-xs tracking-widest text-amber-200/80 uppercase font-cinzel font-medium">
          <LighthouseIcon className="w-4 h-4" />
          <span>Alexandria Odyssey</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 sm:py-12 flex-1 flex flex-col justify-center">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 font-cinzel text-xs tracking-[0.25em] uppercase">
            Discovery Expedition
          </div>
          <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200">
            Welcome to Iskindria
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Where legendary ancient heritage merges with Mediterranean romance. Embark on a curated voyage through the pearl of Egypt.
          </p>
        </div>

        {/* Featured Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CHAPTERS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl glass-panel p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/40 hover:shadow-[0_12px_40px_rgba(245,158,11,0.12)]"
              >
                {/* Background image preview with zoom */}
                <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover contrast-110"
                  />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400/90 font-semibold">
                      {item.category}
                    </span>
                    <h2 className="font-cinzel text-xl font-bold text-white mt-1 group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs text-amber-100/70 tracking-wide mt-0.5">
                      {item.tagline}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-amber-300/80 font-medium">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Alexandria, Egypt
                  </span>
                  <span className="tracking-wider uppercase text-[10px] bg-white/5 px-2.5 py-1 rounded-full">
                    Chapter 0{idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action button */}
        <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-cinzel text-sm font-bold tracking-[0.18em] uppercase shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Compass className="w-4 h-4" />
            <span>Enter 3D Sphere Experience</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs text-neutral-500 font-light">
        <p>ISKINDRIA &copy; {new Date().getFullYear()} &bull; The Infinite Mediterranean Sphere</p>
      </footer>
    </div>
  );
}
