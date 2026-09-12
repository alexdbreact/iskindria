'use client';

import { useState } from 'react';
import Link from 'next/link';
import CustomCursor from '@/components/CustomCursor';
import LighthouseIcon from '@/components/LighthouseIcon';
import ShareExperienceModal from '@/components/ShareExperienceModal';
import { TRANSLATIONS } from '@/lib/i18n';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Waves,
  Landmark,
  BookOpen,
  MapPin,
  Sparkles,
  MessageCircle,
  Share2,
  Languages
} from 'lucide-react';

export default function StartPage() {
  const [lang, setLang] = useState('ar');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isArabic = lang === 'ar';
  const odyssey = t.odyssey || {};

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  // Chapter icon mapping
  const chapterIcons = [Landmark, BookOpen, Waves];

  return (
    <div
      dir={t.dir}
      className={`min-h-screen w-full bg-[#0E0C13] text-neutral-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black ${
        isArabic ? 'font-cairo' : 'font-outfit'
      }`}
    >
      {/* Custom Lighthouse Cursor */}
      <CustomCursor />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-35">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-amber-600/25 via-purple-900/15 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Top Navigation */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 sm:py-8 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill text-xs sm:text-sm font-medium text-neutral-300 hover:text-white hover:border-amber-400/40 transition-all duration-300 shadow-lg cursor-pointer"
        >
          {isArabic ? (
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          ) : (
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          )}
          <span>{odyssey.backTo3D || 'Back to 3D Sphere'}</span>
        </Link>

        {/* Brand & Language Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs tracking-widest text-amber-200/80 uppercase font-cinzel font-medium px-3.5 py-1.5 rounded-full glass-pill">
            <LighthouseIcon className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{odyssey.headerBadge || 'Alexandria Odyssey'}</span>
          </div>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-amber-300 hover:text-white hover:border-amber-400/50 transition-all duration-200 shadow-lg cursor-pointer"
            title={t.langTooltip}
            aria-label="Toggle Language"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{isArabic ? 'English' : 'عربي'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8 flex-1 flex flex-col justify-center">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 font-cinzel text-xs tracking-[0.25em] uppercase shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            {odyssey.heroBadge || 'Discovery Expedition'}
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-300 leading-tight drop-shadow-md">
            {odyssey.heroTitle || 'Welcome to Iskindria'}
          </h1>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            {odyssey.heroDesc ||
              'Where legendary ancient heritage merges with Mediterranean romance. Embark on a curated voyage through the pearl of Egypt.'}
          </p>
        </div>

        {/* Central Featured Luxury Banner: "Share Your Experience Content" */}
        <div className="relative mb-10 sm:mb-14 max-w-3xl mx-auto w-full">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-emerald-500/15 to-amber-500/20 rounded-3xl blur-xl opacity-60 pointer-events-none" />

          <div className="relative overflow-hidden rounded-3xl bg-[#15111D]/90 border-2 border-amber-400/40 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(245,158,11,0.18)] hover:border-amber-400/60 transition-all duration-300">
            {/* Corner Decorative Lights */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-start flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>{odyssey.shareCtaBadge || 'Community & Creators Hub'}</span>
                </div>

                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {odyssey.shareCtaTitle || 'Share Your Experience Content'}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {odyssey.shareCtaSubtitle ||
                    'Do you have a personal story, unforgettable memory, photography, or historical insights about Alexandria? Submit your content for review to be featured directly on the Alexandria Odyssey.'}
                </p>
              </div>

              {/* Primary Call To Action Button triggering the Modal */}
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="w-full sm:w-auto flex-shrink-0 group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:via-amber-300 hover:to-amber-500 text-neutral-950 font-cinzel text-xs sm:text-sm font-black tracking-wider uppercase shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_45px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 text-neutral-950 group-hover:scale-110 transition-transform" />
                <span>{odyssey.shareCtaButton || 'Share Your Experience Content'}</span>
                <Share2 className="w-4 h-4 text-neutral-950/80 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {(odyssey.chapters || []).map((item, idx) => {
            const IconComponent = chapterIcons[idx] || Landmark;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl glass-panel p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/40 hover:shadow-[0_12px_40px_rgba(245,158,11,0.15)]"
              >
                {/* Background image preview with zoom */}
                <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 ease-out">
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
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {odyssey.chapterLocation || 'Alexandria, Egypt'}
                  </span>
                  <span className="tracking-wider uppercase text-[10px] bg-white/5 px-2.5 py-1 rounded-full">
                    {odyssey.chapterPrefix || 'Chapter 0'}{idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action buttons */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-cinzel text-sm font-bold tracking-[0.18em] uppercase shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>{odyssey.enter3D || 'Enter 3D Sphere Experience'}</span>
          </Link>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-amber-200 border border-amber-400/40 hover:border-amber-400 font-cinzel text-sm font-bold tracking-[0.14em] uppercase hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>{odyssey.shareCtaButton || 'Share Your Experience Content'}</span>
          </button>
        </div>
      </main>

      {/* Share Your Experience Content Modal */}
      <ShareExperienceModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        t={t}
        lang={lang}
      />

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs text-neutral-500 font-light">
        <p>ISKINDRIA &copy; {new Date().getFullYear()} &bull; The Infinite Mediterranean Sphere</p>
      </footer>
    </div>
  );
}
