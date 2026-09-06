'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Play,
  Pause,
  Film,
  ChevronRight,
  ChevronLeft,
  ListVideo,
  Volume2,
  VolumeX,
  Maximize,
  Bot
} from 'lucide-react';
import LighthouseIcon from '@/components/LighthouseIcon';

export default function VideoModal({
  isOpen,
  onClose,
  videos = [],
  modalTitle = 'Alexandria Video Tour',
  modalSubtitle = 'Cinematic Journey',
  isAiMode = false,
  t
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState(true);
  const videoRef = useRef(null);

  // Reset to first video on modal open
  useEffect(() => {
    if (isOpen) {
      setCurrentIdx(0);
    }
  }, [isOpen]);

  const currentVideo = videos[currentIdx] || videos[0] || {
    title: 'Alexandria, Egypt',
    src: '/video/Alexandria%20%2C%20Egypt%20%F0%9F%87%AA%F0%9F%87%AC-%20by%20drone%20%5B4K%5D.mp4'
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, videos.length, currentIdx]);

  // Video autoplay when current video changes
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log('Video play catch:', e));
    }
  }, [currentIdx, isOpen]);

  const handleNext = useCallback(() => {
    if (videos.length <= 1) return;
    setCurrentIdx(prev => (prev + 1) % videos.length);
  }, [videos.length]);

  const handlePrev = useCallback(() => {
    if (videos.length <= 1) return;
    setCurrentIdx(prev => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div
        dir={t?.dir || 'ltr'}
        className="relative z-10 w-full max-w-6xl max-h-[92vh] rounded-3xl glass-panel border border-amber-500/30 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col animate-in zoom-in-95 duration-300 bg-[#0E0C13]/95"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 sm:py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${
              isAiMode
                ? 'bg-purple-500/20 border border-purple-400/40 text-purple-300'
                : 'bg-amber-500/20 border border-amber-400/30 text-amber-300'
            }`}>
              {isAiMode ? <Bot className="w-5 h-5" /> : <Film className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-sm sm:text-lg font-bold text-white tracking-wide">
                  {modalTitle}
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-widest border ${
                  isAiMode
                    ? 'bg-purple-400/10 text-purple-300 border-purple-400/30'
                    : 'bg-amber-400/10 text-amber-300 border-amber-400/20'
                }`}>
                  {isAiMode ? 'AI Generated' : `${currentIdx + 1} / ${videos.length} ${t?.tracksCount || 'Videos'}`}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-light truncate max-w-xs sm:max-w-md">
                {currentVideo.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle Playlist Button */}
            {videos.length > 1 && (
              <button
                onClick={() => setShowPlaylistDrawer(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  showPlaylistDrawer
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
                }`}
                title="Toggle Video Playlist"
              >
                <ListVideo className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t?.playlist || 'Playlist'}</span>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-all cursor-pointer shadow-lg active:scale-90"
              title={t?.close || 'Close'}
              aria-label="Close video modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Area: Video + Side Playlist */}
        <div className="relative flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[300px] sm:min-h-[420px] bg-black">
          {/* Main Video Box */}
          <div className="relative flex-1 bg-neutral-950 flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src={currentVideo.src}
              controls
              autoPlay
              playsInline
              onEnded={handleNext}
              className="w-full h-full max-h-[65vh] object-contain"
            >
              Your browser does not support video playback.
            </video>

            {/* Floating Navigation Controls on hover */}
            {videos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all hover:scale-110 active:scale-95 shadow-2xl opacity-75 hover:opacity-100"
                  title={t?.previousTrack || 'Previous Video'}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all hover:scale-110 active:scale-95 shadow-2xl opacity-75 hover:opacity-100"
                  title={t?.nextTrack || 'Next Video'}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Side Playlist Drawer */}
          {showPlaylistDrawer && videos.length > 1 && (
            <div className="w-full lg:w-80 max-h-48 lg:max-h-[65vh] overflow-y-auto bg-[#120F17]/90 border-t lg:border-t-0 lg:border-l border-white/10 p-3 sm:p-4 custom-scrollbar flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-semibold text-neutral-300">
                <span className="uppercase font-mono tracking-wider text-[11px] text-amber-300">
                  {t?.playlist || 'Video Playlist'} ({videos.length})
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {currentIdx + 1} / {videos.length}
                </span>
              </div>

              <div className="space-y-1.5 flex-1">
                {videos.map((vid, index) => {
                  const isSelected = index === currentIdx;
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentIdx(index)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs flex items-start gap-2.5 transition-all ${
                        isSelected
                          ? 'bg-amber-500/20 text-amber-200 border border-amber-400/40 font-medium shadow-md'
                          : 'hover:bg-white/5 text-neutral-300 border border-transparent'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-mono ${
                        isSelected
                          ? 'bg-amber-400 text-neutral-950 font-bold'
                          : 'bg-white/10 text-neutral-400'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium text-xs leading-snug">
                          {vid.title}
                        </p>
                        <span className="text-[10px] text-neutral-500 block truncate mt-0.5">
                          {vid.filename}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping flex-shrink-0 mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Info Bar */}
        <div className="px-5 sm:px-7 py-2.5 bg-black/60 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2 text-amber-300/80">
            <LighthouseIcon className="w-3.5 h-3.5" />
            <span className="truncate max-w-xs sm:max-w-md">{currentVideo.title}</span>
          </div>
          <span className="font-mono text-[11px] text-neutral-500 hidden sm:inline">
            {isAiMode ? '/public/AI' : '/public/video'}
          </span>
        </div>
      </div>
    </div>
  );
}
