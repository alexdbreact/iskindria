'use client';

import { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Film,
  Globe,
  User,
  Music,
  ChevronRight,
  Play,
  Bot,
  Cpu
} from 'lucide-react';
import LighthouseIcon from '@/components/LighthouseIcon';

export default function VerticalLeftMenu({
  isPlaying,
  toggleAudio,
  openVideoModal,
  openAiModal,
  toggleLanguage,
  openProfileModal,
  currentLanguage = 'en',
  t,
  playlist = [],
  currentTrackIndex = 0,
  showPlaylistDrawer,
  setShowPlaylistDrawer
}) {
  const isArabic = currentLanguage === 'ar';
  const currentTrack = playlist[currentTrackIndex];

  return (
    <aside
      aria-label="Quick Actions Navigation"
      className={`fixed ${isArabic ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 pointer-events-auto select-none`}
    >
      {/* Vertical Dock Container with 4 Icons */}
      <div className="relative rounded-full glass-panel p-2 sm:p-2.5 flex flex-col items-center gap-2.5 border border-amber-500/30 shadow-[0_12px_45px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-300 hover:border-amber-400/60">

        {/* 1. AUDIO PLAYLIST TOGGLE ICON */}
        <div className="relative group">
          <button
            onClick={toggleAudio}
            onContextMenu={(e) => {
              e.preventDefault();
              setShowPlaylistDrawer(prev => !prev);
            }}
            className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isPlaying
              ? 'bg-gradient-to-tr from-amber-500 to-amber-400 text-neutral-950 shadow-[0_0_20px_rgba(245,158,11,0.55)] scale-105'
              : 'bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white border border-white/10'
              }`}
            title={isPlaying ? t?.audioTooltipPlay : t?.audioTooltipPause}
            aria-label={isPlaying ? 'Pause background playlist' : 'Play background playlist'}
          >
            {isPlaying ? (
              <div className="flex items-end gap-[2.5px] h-4">
                <span className="w-[3px] bg-neutral-950 rounded-full animate-sound-bar-1 h-3" />
                <span className="w-[3px] bg-neutral-950 rounded-full animate-sound-bar-2 h-4" />
                <span className="w-[3px] bg-neutral-950 rounded-full animate-sound-bar-3 h-2.5" />
                <span className="w-[3px] bg-neutral-950 rounded-full animate-sound-bar-4 h-3.5" />
              </div>
            ) : (
              <VolumeX className="w-5 h-5 text-neutral-400 group-hover:text-amber-300 transition-colors" />
            )}

            {/* Ripple wave when playing */}
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border border-amber-400/50 animate-ping pointer-events-none opacity-40" />
            )}
          </button>

          {/* Tooltip on Hover */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-full mr-3' : 'left-full ml-3'
              } hidden group-hover:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel text-xs text-neutral-100 whitespace-nowrap shadow-xl border border-white/15 pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-150`}
          >
            <Music className="w-3.5 h-3.5 text-amber-300" />
            <span>{isPlaying ? t?.audioTooltipPlay : t?.audioTooltipPause}</span>
            {currentTrack && (
              <span className="text-[10px] text-amber-300/80 font-mono">
                ({currentTrack.title.slice(0, 20)}...)
              </span>
            )}
          </div>
        </div>

        {/* 2. ALEXANDRIA VIDEOS MODAL ICON */}
        <div className="relative group">
          <button
            onClick={openVideoModal}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-300 border border-white/10 hover:border-amber-400/50 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            title={t?.videoTooltip || 'Alexandria Videos'}
            aria-label="Play Alexandria Videos Playlist"
          >
            <Film className="w-5 h-5 transition-transform group-hover:scale-110" />
          </button>

          {/* Tooltip on Hover */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-full mr-3' : 'left-full ml-3'
              } hidden group-hover:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel text-xs text-neutral-100 whitespace-nowrap shadow-xl border border-white/15 pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-150`}
          >
            <Play className="w-3.5 h-3.5 text-amber-300 fill-current" />
            <span>{t?.videoTooltip || 'Alexandria Videos'}</span>
          </div>
        </div>

        {/* 3. AI VIDEOS MODAL ICON (AI) */}
        <div className="relative group">
          <button
            onClick={openAiModal}
            className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-purple-900/40 via-indigo-800/30 to-purple-600/30 hover:from-purple-600/60 hover:to-indigo-500/60 text-purple-200 hover:text-white border border-purple-400/40 hover:border-purple-300 flex flex-col items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:shadow-[0_0_22px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95 cursor-pointer"
            title={t?.aiVideoTooltip || 'AI Historical Videos'}
            aria-label="Play AI Historical Reconstructions"
          >
            <span className="font-mono text-xs sm:text-sm font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200">
              AI
            </span>
            <span className="w-1 h-1 rounded-full bg-purple-400 animate-pulse mt-0.5" />
          </button>

          {/* Tooltip on Hover */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-full mr-3' : 'left-full ml-3'
              } hidden group-hover:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel text-xs text-purple-200 whitespace-nowrap shadow-xl border border-purple-500/30 pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-150`}
          >
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            <span>{t?.aiVideoTooltip || 'AI Historical Reconstructions'}</span>
          </div>
        </div>

        {/* 4. ARABIC LANGUAGE CONVERSION ICON (AR / EN) */}
        <div className="relative group">
          <button
            onClick={toggleLanguage}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-amber-500/20 text-neutral-200 hover:text-amber-200 border border-white/10 hover:border-amber-400/50 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer font-bold tracking-wider"
            title={t?.langTooltip || 'Toggle Language'}
            aria-label="Toggle language between English and Arabic"
          >
            {isArabic ? (
              <span className="font-cinzel text-xs font-black tracking-widest text-amber-300">
                EN
              </span>
            ) : (
              <span className="font-sans text-sm font-black text-amber-300">
                AR
              </span>
            )}
          </button>

          {/* Tooltip on Hover */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-full mr-3' : 'left-full ml-3'
              } hidden group-hover:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel text-xs text-neutral-100 whitespace-nowrap shadow-xl border border-white/15 pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-150`}
          >
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span>{t?.langTooltip}</span>
          </div>
        </div>
      </div>

      {/* Golden Glowing Separator */}
      <div className="w-8 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent my-1" />

      {/* "MADE BY :" HIGH-CONTRAST INTERACTIVE BUTTON */}
      <div className="relative group">
        <button
          onClick={openProfileModal}
          className="group relative flex flex-col items-center justify-center px-3 py-2.5 sm:px-3.5 sm:py-3 rounded-2xl bg-gradient-to-b from-amber-500/30 via-neutral-900/90 to-black/95 border-2 border-amber-400/70 hover:border-amber-300 text-neutral-100 hover:text-white shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
          title={t?.profileTooltip || 'Made by WebAlex'}
          aria-label="Open Creator Profile Modal"
        >
          {/* Ambient Inner Shimmer & Pulse Light */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 bg-amber-400/25 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

          {/* Top Row: "Made by :" label */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] sm:text-[11px] font-cinzel font-bold tracking-widest text-amber-300 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] whitespace-nowrap">
              {t?.madeBy || 'Made by :'}
            </span>
          </div>

          {/* Bottom Row: WebAlex + LighthouseIcon + Interactive Arrow Button */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs sm:text-sm font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400 font-cinzel drop-shadow-md">
              WebAlex
            </span>
            <LighthouseIcon className="w-4 h-4 group-hover:scale-115 group-hover:rotate-6 transition-all duration-300 flex-shrink-0" />
            
            {/* High-Contrast Interactive Arrow Circle */}
            <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-neutral-950 flex items-center justify-center font-bold shadow-[0_0_10px_rgba(245,158,11,0.5)] group-hover:bg-amber-200 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(253,230,138,0.9)] transition-all duration-300 flex-shrink-0">
              <ChevronRight className={`w-3.5 h-3.5 stroke-[3] transition-transform duration-300 ${isArabic ? 'group-hover:-translate-x-0.5 rotate-180' : 'group-hover:translate-x-0.5'}`} />
            </span>
          </div>
        </button>

        {/* Tooltip on Hover */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-full mr-3' : 'left-full ml-3'
            } hidden group-hover:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel text-xs text-neutral-100 whitespace-nowrap shadow-xl border border-white/15 pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-150`}
        >
          <User className="w-3.5 h-3.5 text-amber-300" />
          <span>{t?.profileTooltip || 'Made by WebAlex (Contact & Info)'}</span>
        </div>
      </div>
    </aside>
  );
}
