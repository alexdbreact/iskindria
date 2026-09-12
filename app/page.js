'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import DomeGallery from '@/components/DomeGallery';
import VerticalLeftMenu from '@/components/VerticalLeftMenu';
import AudioPlayer from '@/components/AudioPlayer';
import VideoModal from '@/components/VideoModal';
import ProfileModal from '@/components/ProfileModal';
import VideoMaskedTitle from '@/components/VideoMaskedTitle';
import CustomCursor from '@/components/CustomCursor';
import LighthouseIcon from '@/components/LighthouseIcon';
import { LOCAL_PUBLIC_IMAGES } from '@/lib/localImages';
import { TRANSLATIONS } from '@/lib/i18n';
import { DEFAULT_PLAYLIST } from '@/lib/mediaData';
import { ArrowRight, Compass, Eye, ArrowLeft } from 'lucide-react';

export default function App() {
  // Appearance & language states
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isArabic = lang === 'ar';

  // Dynamic media items
  const [images, setImages] = useState(LOCAL_PUBLIC_IMAGES);
  const [playlist, setPlaylist] = useState(DEFAULT_PLAYLIST);

  // Audio player states
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState(false);
  const [wasPlayingBeforeVideo, setWasPlayingBeforeVideo] = useState(false);

  // Modal visibility states
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoCategory, setVideoCategory] = useState('all');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Fetch dynamic assets from APIs
  useEffect(() => {
    async function loadAssets() {
      // 1. Fetch images from /public/images
      try {
        const res = await fetch('/api/images');
        if (res.ok) {
          const data = await res.json();
          if (data?.images && data.images.length > 0) {
            setImages(data.images);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic images:', err);
      }

      // 2. Fetch audio files from /public/mp3
      try {
        const resAudio = await fetch('/api/audio');
        if (resAudio.ok) {
          const dataAudio = await resAudio.json();
          if (dataAudio?.playlist && dataAudio.playlist.length > 0) {
            setPlaylist(dataAudio.playlist);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic audio playlist:', err);
      }
    }

    loadAssets();
  }, []);

  // Language toggle handler
  const toggleLanguage = useCallback(() => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  // Audio toggle handler
  const toggleAudio = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Video modal handlers
  const handleOpenVideo = useCallback((cat = 'all') => {
    setWasPlayingBeforeVideo(isPlaying);
    setIsPlaying(false);
    setVideoCategory(cat || 'all');
    setIsVideoModalOpen(true);
  }, [isPlaying]);

  const handleCloseVideo = useCallback(() => {
    setIsVideoModalOpen(false);
    if (wasPlayingBeforeVideo) {
      setIsPlaying(true);
    }
  }, [wasPlayingBeforeVideo]);

  return (
    <main
      dir={t.dir}
      className={`relative w-screen h-screen overflow-hidden bg-[#120F17] select-none ${isArabic ? 'font-cairo' : 'font-outfit'}`}
    >
      {/* Lighthouse Custom Glowing Cursor Follower */}
      <CustomCursor />

      {/* 3D Dome Gallery Canvas */}
      <div style={{ width: '100vw', height: '100vh' }} className="absolute inset-0">
        <DomeGallery
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={2}
          grayscale={isGrayscale}
          autoRotate={true}
          autoRotateSpeed={0.08}
          images={images}
        />
      </div>

      {/* Floating Top Header: Brand & Extra-Large Video-Masked Title */}
      <header className="pointer-events-none absolute top-0 left-0 right-0 z-30 flex flex-col items-center justify-start pt-4 sm:pt-6 px-4 sm:px-6">
        <div className="flex flex-col items-center text-center space-y-1 max-w-6xl w-full">
          {/* Badge */}
          <div className="pointer-events-auto inline-flex items-center gap-2.5 px-5 py-1.5 sm:px-6 sm:py-2 rounded-full glass-pill text-xs sm:text-sm md:text-base tracking-[0.2em] text-amber-200/90 uppercase font-medium shadow-2xl transition-all duration-300 hover:border-amber-400/40">
            <LighthouseIcon className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse shadow-md" />
            <span>{t.badge}</span>
          </div>

          {/* Extra-Large Video-Masked Title: Video /title.mp4 plays directly inside font */}
          <div className="w-full flex items-center justify-center">
            <VideoMaskedTitle
              text={t.title}
              isArabic={isArabic}
              videoSrc="/title.mp4"
            />
          </div>

          {/* Subtitle */}
          <p className="font-cinzel text-xs sm:text-sm md:text-base tracking-[0.35em] text-amber-100/90 uppercase font-light drop-shadow-md -mt-2 sm:-mt-4">
            {t.subtitle}
          </p>
        </div>
      </header>

      {/* Top Right Quick Controls (Grayscale Toggle) */}
      <div
        className={`pointer-events-auto absolute top-6 ${
          isArabic ? 'left-6' : 'right-6'
        } z-30 flex items-center gap-3`}
      >
        <button
          onClick={() => setIsGrayscale(prev => !prev)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-pill text-xs font-medium text-neutral-300 hover:text-white hover:border-amber-400/50 transition-all duration-200 shadow-lg cursor-pointer"
          title={isGrayscale ? t.grayscaleColor : t.grayscaleMono}
          aria-label="Toggle Grayscale Mode"
        >
          <Eye className={`w-3.5 h-3.5 ${isGrayscale ? 'text-neutral-400' : 'text-amber-300'}`} />
          <span className="hidden sm:inline">
            {isGrayscale ? t.grayscaleColor : t.grayscaleMono}
          </span>
        </button>
      </div>

      {/* Vertical Left Menu with 3 Icons & "Made by :" Button */}
      <VerticalLeftMenu
        isPlaying={isPlaying}
        toggleAudio={toggleAudio}
        openVideoModal={handleOpenVideo}
        toggleLanguage={toggleLanguage}
        openProfileModal={() => setIsProfileModalOpen(true)}
        currentLanguage={lang}
        t={t}
        playlist={playlist}
        currentTrackIndex={currentTrackIndex}
        showPlaylistDrawer={showPlaylistDrawer}
        setShowPlaylistDrawer={setShowPlaylistDrawer}
      />

      {/* Background Audio Player Engine & Playlist Drawer */}
      <div className={`fixed ${isArabic ? 'right-20' : 'left-20'} top-1/2 -translate-y-1/2 z-50 pointer-events-auto`}>
        <AudioPlayer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentTrackIndex={currentTrackIndex}
          setCurrentTrackIndex={setCurrentTrackIndex}
          playlist={playlist}
          lang={lang}
          t={t}
          showExpandedMenu={showPlaylistDrawer}
          setShowExpandedMenu={setShowPlaylistDrawer}
        />
      </div>

      {/* Floating Bottom Navigation & Start Button */}
      <footer className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center justify-end pb-6 md:pb-10 px-6">
        <div className="flex flex-col items-center gap-3.5 sm:gap-4.5 w-full max-w-md">
          {/* Interaction Instruction Pill */}
          <div className="pointer-events-auto flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-[11px] sm:text-xs text-neutral-400 tracking-wider">
            <Compass className="w-3.5 h-3.5 text-amber-300/80 animate-spin" style={{ animationDuration: '10s' }} />
            <span>{t.hintText}</span>
          </div>

          {/* Primary Action Button: Start */}
          <Link
            href="/start"
            className="pointer-events-auto group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-neutral-950 font-cinzel text-sm sm:text-base font-bold tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(245,158,11,0.35)] glow-btn hover:shadow-[0_0_45px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-98 transition-all duration-300"
          >
            <span>{t.start}</span>
            {isArabic ? (
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            )}
          </Link>
        </div>
      </footer>

      {/* Unified Alexandria 4-Category YouTube Cinema Modal (Tour, Documentary, AI, Historical) */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideo}
        initialCategory={videoCategory}
        t={t}
        lang={lang}
      />

      {/* "Made by : WebAlex" 3D Animated Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        t={t}
      />
    </main>
  );
}
