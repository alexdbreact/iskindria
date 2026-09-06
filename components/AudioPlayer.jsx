'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, SkipForward, SkipBack, Music, ListMusic, Play, Pause } from 'lucide-react';

export default function AudioPlayer({
  isPlaying,
  setIsPlaying,
  currentTrackIndex,
  setCurrentTrackIndex,
  playlist,
  lang = 'en',
  t,
  showExpandedMenu = false,
  setShowExpandedMenu
}) {
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.65);
  const [isMuted, setIsMuted] = useState(false);

  // Current track
  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  // Try autoplay on mount with smooth fallback for browser autoplay policy
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        // Autoplay blocked by browser policy; wait for first user gesture anywhere on window
        console.log('Autoplay deferred until user interaction.');
        setIsPlaying(false);

        const handleFirstInteraction = async () => {
          if (!hasInteracted && audioRef.current) {
            try {
              await audioRef.current.play();
              setIsPlaying(true);
              setHasInteracted(true);
            } catch (e) {
              console.log('Audio play error on gesture:', e);
            }
          }
          window.removeEventListener('pointerdown', handleFirstInteraction);
          window.removeEventListener('keydown', handleFirstInteraction);
        };

        window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
        window.addEventListener('keydown', handleFirstInteraction, { once: true });
      }
    };

    playAudio();
  }, []);

  // Handle play/pause state synchronization
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(e => {
        console.log('Play failed:', e);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, setIsPlaying]);

  // Handle track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.src;
    audio.load();
    if (isPlaying) {
      audio.play().catch(e => console.log('Audio play error on track change:', e));
    }
  }, [currentTrackIndex]);

  const handleNextTrack = useCallback(() => {
    if (playlist.length <= 1) return;
    setCurrentTrackIndex(prev => (prev + 1) % playlist.length);
  }, [playlist.length, setCurrentTrackIndex]);

  const handlePrevTrack = useCallback(() => {
    if (playlist.length <= 1) return;
    setCurrentTrackIndex(prev => (prev - 1 + playlist.length) % playlist.length);
  }, [playlist.length, setCurrentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleTrackEnded = () => {
    handleNextTrack();
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack?.src}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleTrackEnded}
      />

      {/* Expanded Playlist Drawer (when clicked or hovered) */}
      {showExpandedMenu && (
        <div
          dir={t?.dir || 'ltr'}
          className={`absolute ${t?.dir === 'rtl' ? 'right-16' : 'left-16'} top-0 w-72 sm:w-80 rounded-2xl glass-panel p-4 shadow-2xl border border-amber-500/20 backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-200`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300">
                <Music className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-semibold block">
                  {t?.nowPlaying || 'Now Playing'}
                </span>
                <span className="text-xs font-semibold text-white truncate max-w-[170px] block">
                  {currentTrack?.title || 'Alexandria Melodies'}
                </span>
              </div>
            </div>
            
            {/* Equalizer Wave Badge */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-4 px-1">
                <span className="w-1 bg-amber-400 rounded-full animate-sound-bar-1 h-3" />
                <span className="w-1 bg-amber-300 rounded-full animate-sound-bar-2 h-4" />
                <span className="w-1 bg-amber-400 rounded-full animate-sound-bar-3 h-2" />
                <span className="w-1 bg-amber-200 rounded-full animate-sound-bar-4 h-3.5" />
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevTrack}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
                title={t?.previousTrack || 'Previous'}
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={togglePlay}
                className="p-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 hover:scale-105 active:scale-95 transition-all shadow-md"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={handleNextTrack}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
                title={t?.nextTrack || 'Next'}
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="text-[11px] font-mono text-neutral-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-1 mb-3 overflow-hidden cursor-pointer"
            onClick={(e) => {
              if (!audioRef.current || !duration) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              audioRef.current.currentTime = clickPos * duration;
            }}
          >
            <div
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-100"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />
          </div>

          {/* Playlist Tracks List */}
          <div className="space-y-1 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
            <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 px-1 py-0.5">
              {t?.playlist || 'Playlist'} ({playlist.length})
            </div>
            {playlist.map((track, idx) => {
              const isSelected = idx === currentTrackIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentTrackIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-amber-400/20 text-amber-200 font-medium border border-amber-400/30'
                      : 'hover:bg-white/5 text-neutral-300'
                  }`}
                >
                  <span className="truncate pr-2">{track.title}</span>
                  {isSelected && isPlaying && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
