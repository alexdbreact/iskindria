'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  X,
  Play,
  Film,
  ChevronRight,
  ChevronLeft,
  ListVideo,
  Bot,
  Compass,
  Clapperboard,
  Landmark,
  ExternalLink,
  Sparkles,
  Layers
} from 'lucide-react';
import LighthouseIcon from '@/components/LighthouseIcon';
import { YOUTUBE_VIDEOS, VIDEO_CATEGORIES } from '@/lib/mediaData';

export default function VideoModal({
  isOpen,
  onClose,
  initialCategory = 'all',
  t,
  lang = 'en'
}) {
  const isArabic = lang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState(true);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // Sync category when initialCategory changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(initialCategory || 'all');
      setCurrentIdx(0);
      setIsIframeLoading(true);
    }
  }, [isOpen, initialCategory]);

  // Filtered videos based on category
  const filteredVideos = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all') {
      return YOUTUBE_VIDEOS;
    }
    return YOUTUBE_VIDEOS.filter(v => v.category === selectedCategory);
  }, [selectedCategory]);

  // Safe current video reference
  const currentVideo = filteredVideos[currentIdx] || filteredVideos[0] || YOUTUBE_VIDEOS[0];

  // Reset index when category changes
  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setCurrentIdx(0);
    setIsIframeLoading(true);
  };

  const handleNext = useCallback(() => {
    if (filteredVideos.length <= 1) return;
    setIsIframeLoading(true);
    setCurrentIdx(prev => (prev + 1) % filteredVideos.length);
  }, [filteredVideos.length]);

  const handlePrev = useCallback(() => {
    if (filteredVideos.length <= 1) return;
    setIsIframeLoading(true);
    setCurrentIdx(prev => (prev - 1 + filteredVideos.length) % filteredVideos.length);
  }, [filteredVideos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (isArabic) handlePrev();
        else handleNext();
      } else if (e.key === 'ArrowLeft') {
        if (isArabic) handleNext();
        else handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose, isArabic]);

  if (!isOpen) return null;

  // Category Icon Resolver
  const getCategoryIcon = (catId) => {
    switch (catId) {
      case 'tour': return <Compass className="w-3.5 h-3.5" />;
      case 'documentary': return <Clapperboard className="w-3.5 h-3.5" />;
      case 'ai': return <Bot className="w-3.5 h-3.5" />;
      case 'historical': return <Landmark className="w-3.5 h-3.5" />;
      default: return <Film className="w-3.5 h-3.5" />;
    }
  };

  // Category Color Badge
  const getCategoryBadgeClass = (catId) => {
    switch (catId) {
      case 'tour':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'documentary':
        return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
      case 'ai':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'historical':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      default:
        return 'bg-white/10 text-neutral-300 border-white/20';
    }
  };

  const titleText = currentVideo?.title?.[lang] || currentVideo?.title?.en || 'Alexandria Video';
  const descText = currentVideo?.description?.[lang] || currentVideo?.description?.en || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300 select-none">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div
        dir={t?.dir || 'ltr'}
        className="relative z-10 w-full max-w-6xl max-h-[95vh] rounded-3xl glass-panel border border-amber-500/40 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col animate-in zoom-in-95 duration-300 bg-[#0E0C13]/98"
      >
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-black/60 backdrop-blur-xl gap-3">
          {/* Title & Active Category Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500/30 to-amber-300/10 border border-amber-400/40 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-lg">
              {getCategoryIcon(currentVideo.category)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-white tracking-wide truncate">
                  {t?.videoModalTitle || 'Alexandria Cinema'}
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase border ${getCategoryBadgeClass(currentVideo.category)}`}>
                  {currentVideo.categoryName?.[lang] || currentVideo.categoryName?.en}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-light truncate max-w-xs sm:max-w-md mt-0.5">
                {titleText}
              </p>
            </div>
          </div>

          {/* Action buttons & playlist toggle */}
          <div className="flex items-center justify-end gap-2">
            {/* Watch on YouTube direct link */}
            <a
              href={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-white border border-red-500/30 text-xs font-medium transition-all shadow-md active:scale-95"
              title={t?.watchOnYouTube || 'Watch on YouTube'}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="hidden sm:inline">{t?.watchOnYouTube || 'YouTube'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Toggle Playlist Button */}
            <button
              onClick={() => setShowPlaylistDrawer(prev => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                showPlaylistDrawer
                  ? 'bg-amber-400/25 text-amber-300 border border-amber-400/50 shadow-md'
                  : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
              }`}
              title="Toggle Playlist"
            >
              <ListVideo className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t?.playlist || 'Playlist'}</span>
              <span className="font-mono text-[10px] bg-black/40 px-1.5 py-0.2 rounded-full">
                {filteredVideos.length}
              </span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-all cursor-pointer shadow-lg active:scale-90"
              title={t?.close || 'Close'}
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* 4 Category Filter Tabs Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#14101A] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-mono uppercase tracking-wider mr-2 hidden md:flex">
            <Layers className="w-3.5 h-3.5 text-amber-400/70" />
            <span>{t?.categoryFilter || 'Categories'}:</span>
          </div>

          {VIDEO_CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            const count = cat.id === 'all'
              ? YOUTUBE_VIDEOS.length
              : YOUTUBE_VIDEOS.filter(v => v.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-102'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{t?.categories?.[cat.id] || cat.label[lang] || cat.label.en}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-black/30 text-neutral-950' : 'bg-black/40 text-neutral-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Theater Area: Video Player + Side Playlist */}
        <div className="relative flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[340px] sm:min-h-[460px] bg-black">
          {/* Main YouTube Embed Container */}
          <div className="relative flex-1 bg-neutral-950 flex flex-col items-center justify-center overflow-hidden">
            {/* YouTube Responsive Iframe Embed */}
            <div className="relative w-full h-full min-h-[300px] sm:min-h-[420px] max-h-[68vh] aspect-video">
              <iframe
                key={currentVideo.youtubeId}
                src={`https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={titleText}
                onLoad={() => setIsIframeLoading(false)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0 absolute inset-0"
              />
            </div>

            {/* Floating Navigation Controls */}
            {filteredVideos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-black flex items-center justify-center backdrop-blur-md border border-white/15 transition-all hover:scale-110 active:scale-95 shadow-2xl opacity-75 hover:opacity-100 cursor-pointer z-20`}
                  title={t?.previousTrack || 'Previous Video'}
                >
                  {isArabic ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>

                <button
                  onClick={handleNext}
                  className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-black flex items-center justify-center backdrop-blur-md border border-white/15 transition-all hover:scale-110 active:scale-95 shadow-2xl opacity-75 hover:opacity-100 cursor-pointer z-20`}
                  title={t?.nextTrack || 'Next Video'}
                >
                  {isArabic ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              </>
            )}
          </div>

          {/* Side Playlist Drawer */}
          {showPlaylistDrawer && (
            <div className="w-full lg:w-88 max-h-52 lg:max-h-[68vh] overflow-y-auto bg-[#110D17] border-t lg:border-t-0 lg:border-l border-white/10 p-3 custom-scrollbar flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-semibold text-neutral-300 px-1">
                <span className="uppercase font-mono tracking-wider text-[11px] text-amber-300 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5" />
                  <span>{t?.categories?.[selectedCategory] || 'Playlist'}</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {currentIdx + 1} / {filteredVideos.length}
                </span>
              </div>

              <div className="space-y-2 flex-1">
                {filteredVideos.map((vid, index) => {
                  const isSelected = index === currentIdx;
                  const itemTitle = vid.title?.[lang] || vid.title?.en;

                  return (
                    <button
                      key={vid.id}
                      onClick={() => {
                        setIsIframeLoading(true);
                        setCurrentIdx(index);
                      }}
                      className={`w-full text-left p-2 rounded-2xl flex items-center gap-3 transition-all duration-200 cursor-pointer group ${
                        isSelected
                          ? 'bg-amber-500/20 text-amber-200 border border-amber-400/50 shadow-[0_4px_20px_rgba(245,158,11,0.25)]'
                          : 'bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300 border border-white/5'
                      }`}
                    >
                      {/* Thumbnail Preview with Play Overlay */}
                      <div className="relative w-24 h-15 rounded-xl overflow-hidden bg-black/60 flex-shrink-0 border border-white/10">
                        <img
                          src={vid.thumbnail}
                          alt={itemTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className={`absolute inset-0 flex items-center justify-center ${
                          isSelected ? 'bg-amber-500/40' : 'bg-black/30 group-hover:bg-black/10'
                        }`}>
                          <Play className={`w-4 h-4 fill-current ${isSelected ? 'text-white scale-110' : 'text-white/80'}`} />
                        </div>
                        <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[9px] font-mono text-white/90">
                          HD
                        </span>
                      </div>

                      {/* Video Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-mono border ${getCategoryBadgeClass(vid.category)}`}>
                            {vid.categoryName?.[lang] || vid.categoryName?.en}
                          </span>
                        </div>
                        <p className={`text-xs font-semibold leading-snug truncate ${
                          isSelected ? 'text-amber-200' : 'text-neutral-100 group-hover:text-amber-300'
                        }`}>
                          {itemTitle}
                        </p>
                        <span className="text-[10px] text-neutral-400 block truncate mt-0.5">
                          {vid.author}
                        </span>
                      </div>

                      {/* Active Indicator */}
                      {isSelected && (
                        <div className="flex items-center gap-0.5 h-3 flex-shrink-0 pr-1">
                          <span className="w-1 bg-amber-400 rounded-full animate-sound-bar-1 h-3" />
                          <span className="w-1 bg-amber-400 rounded-full animate-sound-bar-2 h-4" />
                          <span className="w-1 bg-amber-400 rounded-full animate-sound-bar-3 h-2" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Info Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-black/80 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-neutral-400 gap-2">
          <div className="flex items-center gap-2 text-amber-300/90 truncate">
            <LighthouseIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate max-w-sm sm:max-w-xl font-medium">{titleText}</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-500">
            <span>{currentVideo.author}</span>
            <span>&bull;</span>
            <span className="text-amber-400/80">4 Categories &bull; 9 Curated Videos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
