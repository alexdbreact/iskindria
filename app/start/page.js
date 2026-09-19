'use client';

import { useState, useEffect, useRef } from 'react';
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
  Languages,
  X,
  ExternalLink,
  Clock,
  Layers
} from 'lucide-react';

export default function StartPage() {
  const [lang, setLang] = useState('ar');
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [timerActive, setTimerActive] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const modalRef = useRef(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isArabic = lang === 'ar';
  const odyssey = t.odyssey || {};

  // Chapter icon mapping
  const chapterIcons = [Landmark, BookOpen, Waves];

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  // 10-Second Auto-dismiss Countdown Timer
  useEffect(() => {
    if (!isPopupOpen || !timerActive || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsPopupOpen(false);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPopupOpen, timerActive, secondsLeft]);

  // Reopen modal handler
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    setTimerActive(false); // Do not force auto-close when reopened manually
  };

  // Close modal handler
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setTimerActive(false);
  };

  return (
    <div
      dir={t.dir}
      className={`relative w-screen h-screen overflow-hidden bg-[#0E0C13] text-neutral-100 select-none ${
        isArabic ? 'font-cairo' : 'font-outfit'
      }`}
    >
      {/* Custom Lighthouse Cursor */}
      <CustomCursor />

      {/* 1. Underlying Fullscreen Web Page Embed: https://historical-alex.vercel.app */}
      <div className="absolute inset-0 w-full h-full z-0 bg-[#0E0C13]">
        <iframe
          src="https://historical-alex.vercel.app"
          title="Historical Alexandria Platform"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIframeLoaded(true)}
        />

        {/* Loading Ambience Placeholder while iframe loads */}
        {!iframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0E0C13] z-10">
            <div className="flex flex-col items-center gap-3">
              <LighthouseIcon className="w-10 h-10 text-amber-400 animate-pulse" />
              <span className="text-amber-200 text-xs tracking-widest font-cinzel uppercase">
                {isArabic ? 'جاري تحميل منصة الإسكندرية التاريخية...' : 'Loading Historical Alexandria Platform...'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Floating Quick Navigation Bar (Always Accessible over live web page) */}
      <header className="fixed top-4 left-4 right-4 z-30 pointer-events-none flex items-center justify-between gap-3">
        {/* Left Side: Return to 3D Sphere Home Page */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs sm:text-sm font-medium text-neutral-200 hover:text-white hover:border-amber-400/50 transition-all duration-300 shadow-xl cursor-pointer backdrop-blur-xl"
          >
            {isArabic ? (
              <ArrowRight className="w-4 h-4 text-amber-400 transition-transform duration-300 group-hover:translate-x-1" />
            ) : (
              <ArrowLeft className="w-4 h-4 text-amber-400 transition-transform duration-300 group-hover:-translate-x-1" />
            )}
            <span>{odyssey.backTo3D || (isArabic ? 'الصفحة الرئيسية' : 'Home Page')}</span>
          </Link>
        </div>

        {/* Right Side: Reopen Modal, External Link, Language Switcher */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Reopen 75% Modal Button (Visible when modal is closed) */}
          {!isPopupOpen && (
            <button
              onClick={handleOpenPopup}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs sm:text-sm font-bold tracking-wider font-cinzel shadow-[0_0_25px_rgba(245,158,11,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-pulse"
            >
              <LighthouseIcon className="w-4 h-4 text-neutral-950 group-hover:rotate-12 transition-transform" />
              <span>{odyssey.reopenModal || (isArabic ? 'دليل رحلة الإسكندرية' : 'Alexandria Odyssey')}</span>
            </button>
          )}

          {/* Direct External Link */}
          <a
            href="https://historical-alex.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-panel text-xs font-medium text-neutral-300 hover:text-amber-200 hover:border-amber-400/40 transition-all duration-200 shadow-lg cursor-pointer backdrop-blur-xl"
            title={odyssey.openExternal || (isArabic ? 'فتح في نافذة جديدة' : 'Open in New Tab')}
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">{odyssey.openExternal || (isArabic ? 'نافذة جديدة' : 'New Tab')}</span>
          </a>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-panel text-xs font-medium text-amber-300 hover:text-white hover:border-amber-400/50 transition-all duration-200 shadow-lg cursor-pointer backdrop-blur-xl"
            title={t.langTooltip}
            aria-label="Toggle Language"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{isArabic ? 'English' : 'عربي'}</span>
          </button>
        </div>
      </header>

      {/* 3. The 75% Popup Modal (Middle of Screen, stays 10s or click outside to hide) */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all duration-500 animate-fade-in"
          onClick={(e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
              handleClosePopup();
            }
          }}
        >
          <div
            ref={modalRef}
            dir={t.dir}
            className="relative w-[95vw] md:w-[75vw] h-[92vh] md:h-[75vh] max-w-6xl rounded-3xl bg-[#0E0C13]/95 border-2 border-amber-400/45 backdrop-blur-3xl shadow-[0_0_80px_rgba(245,158,11,0.28)] flex flex-col overflow-hidden text-neutral-100 transition-all duration-300"
          >
            {/* Top Auto-close Countdown Progress Bar */}
            {timerActive && secondsLeft > 0 && (
              <div className="w-full bg-amber-950/40 h-1 relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${(secondsLeft / 10) * 100}%` }}
                />
              </div>
            )}

            {/* Modal Header Bar */}
            <div className="relative z-20 w-full px-5 sm:px-8 py-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between gap-4">
              {/* Left: Auto-close timer indicator & Badge */}
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-cinzel text-xs tracking-wider uppercase font-semibold">
                  <LighthouseIcon className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>{odyssey.headerBadge || 'Alexandria Odyssey'}</span>
                </div>

                {timerActive && secondsLeft > 0 && (
                  <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-400">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>
                      {(odyssey.autoCloseNotice || 'Auto-closing in {sec}s • Click outside to explore').replace(
                        '{sec}',
                        secondsLeft
                      )}
                    </span>
                  </div>
                )}
              </div>

              {/* Right: Language switch & Dismiss button */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 rounded-full glass-pill text-xs font-medium text-amber-300 hover:text-white hover:border-amber-400/50 transition-all duration-200 cursor-pointer"
                >
                  <span>{isArabic ? 'English' : 'عربي'}</span>
                </button>

                <button
                  onClick={handleClosePopup}
                  className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-amber-400 hover:text-neutral-950 text-neutral-200 border border-white/15 hover:border-amber-400 transition-all duration-200 text-xs font-semibold cursor-pointer shadow-lg"
                  title="Close modal and view live website"
                >
                  <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
                  <span className="hidden sm:inline">{odyssey.exploreWebsite || (isArabic ? 'استكشاف الموقع' : 'Explore Website')}</span>
                </button>
              </div>
            </div>

            {/* Modal Body: Complete Scrollable Alexandria Odyssey Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 sm:p-8 md:p-10 custom-scrollbar space-y-10">
              {/* Background Ambience */}
              <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-amber-600/20 via-purple-900/10 to-transparent blur-3xl rounded-full" />

              {/* Hero Section */}
              <div className="text-center space-y-3.5 max-w-3xl mx-auto pt-2">
                <div className="inline-block px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 font-cinzel text-xs tracking-[0.25em] uppercase shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                  {odyssey.heroBadge || 'Discovery Expedition'}
                </div>

                <h1 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-300 leading-tight drop-shadow-md">
                  {odyssey.heroTitle || 'Welcome to Iskindria'}
                </h1>

                <p className="text-neutral-300 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
                  {odyssey.heroDesc ||
                    'Where legendary ancient heritage merges with Mediterranean romance. Embark on a curated voyage through the pearl of Egypt.'}
                </p>
              </div>

              {/* Central Featured Luxury Banner: "Share Your Experience Content" */}
              <div className="relative max-w-4xl mx-auto w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-emerald-500/15 to-amber-500/20 rounded-3xl blur-xl opacity-60 pointer-events-none" />

                <div className="relative overflow-hidden rounded-3xl bg-[#15111D]/90 border-2 border-amber-400/40 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(245,158,11,0.18)] hover:border-amber-400/60 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                    <div className="space-y-2.5 text-center md:text-start flex-1 min-w-0">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                        <span>{odyssey.shareCtaBadge || 'Community & Creators Hub'}</span>
                      </div>

                      <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200">
                        {odyssey.shareCtaTitle || 'Share Your Alexandria Story'}
                      </h2>

                      <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-xl">
                        {odyssey.shareCtaSubtitle ||
                          'Have a personal story, unforgettable memory, photography, or historical insights about Alexandria? Submit your content for review to be featured on the Alexandria Odyssey.'}
                      </p>
                    </div>

                    {/* Primary Call To Action Button triggering the Modal */}
                    <button
                      onClick={() => setIsShareModalOpen(true)}
                      className="w-full md:w-auto flex-shrink-0 group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:via-amber-300 hover:to-amber-500 text-neutral-950 font-cinzel text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:shadow-[0_0_45px_rgba(245,158,11,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap"
                    >
                      <MessageCircle className="w-5 h-5 text-neutral-950 group-hover:scale-110 transition-transform" />
                      <span>{odyssey.shareCtaButton || 'Share Your Story'}</span>
                      <Share2 className="w-4 h-4 text-neutral-950/80 group-hover:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Featured Story Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(odyssey.chapters || []).map((item, idx) => {
                  const IconComponent = chapterIcons[idx] || Landmark;
                  return (
                    <div
                      key={idx}
                      className="group relative overflow-hidden rounded-2xl glass-panel p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/40 hover:shadow-[0_12px_40px_rgba(245,158,11,0.15)]"
                    >
                      <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 ease-out">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover contrast-110"
                        />
                      </div>

                      <div className="relative z-10 space-y-3.5">
                        <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400/90 font-semibold">
                            {item.category}
                          </span>
                          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white mt-1 group-hover:text-amber-200 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-amber-100/70 tracking-wide mt-0.5">
                            {item.tagline}
                          </p>
                        </div>
                        <p className="text-xs text-neutral-300 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="relative z-10 mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-amber-300/80 font-medium">
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

              {/* Bottom Action buttons inside modal */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-cinzel text-sm font-bold tracking-[0.18em] uppercase shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>{odyssey.enter3D || (isArabic ? 'الرجوع للصفحة الرئيسية' : 'Return to Home Page')}</span>
                </Link>

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-amber-200 border border-amber-400/40 hover:border-amber-400 font-cinzel text-sm font-bold tracking-[0.14em] uppercase hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>{odyssey.shareCtaButton || (isArabic ? 'شارك محتواك وتجربتك' : 'Share Your Story')}</span>
                </button>

                <button
                  onClick={handleClosePopup}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 font-cinzel text-xs sm:text-sm font-bold tracking-wider uppercase hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>{odyssey.exploreWebsite || (isArabic ? 'استكشاف المنصة' : 'Explore Platform')}</span>
                </button>
              </div>

              {/* Footer inside modal */}
              <footer className="pt-6 pb-2 text-center text-xs text-neutral-500 font-light">
                <p>ISKINDRIA &copy; {new Date().getFullYear()} &bull; The Infinite Mediterranean Sphere</p>
              </footer>
            </div>
          </div>
        </div>
      )}

      {/* 4. Share Your Experience Content Modal (Form sends to WhatsApp +201159666279) */}
      <ShareExperienceModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        t={t}
        lang={lang}
      />
    </div>
  );
}
