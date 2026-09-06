'use client';

import { useState, useRef, useEffect } from 'react';
import {
  X,
  Globe,
  Phone,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Code2,
  MapPin,
  Layers,
  Zap
} from 'lucide-react';
import LighthouseIcon from '@/components/LighthouseIcon';

export default function ProfileModal({ isOpen, onClose, t }) {
  const [copiedField, setCopiedField] = useState(null);
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const profile = t?.profileCard || {
    badge: 'Lead Architect & Creative Developer',
    name: 'WebAlex',
    role: 'Full Stack & Creative Web Developer',
    tagline: 'Crafting Next-Generation Digital & 3D Web Experiences',
    location: 'Alexandria, Egypt',
    website: 'https://web.iskindria.com',
    websiteDisplay: 'web.iskindria.com',
    phone: '+201159666279',
    phoneDisplay: '+20 115 966 6279',
    visitWebsite: 'Visit Website',
    callNow: 'Call Direct',
    whatsappChat: 'WhatsApp',
    copied: 'Copied to clipboard!',
    copyPhone: 'Copy Phone',
    copyUrl: 'Copy Link',
    cardTitle: 'Creator Profile',
    skills: ['Next.js 16', 'React 19', '3D WebGL', 'Tailwind CSS', 'Creative UI']
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      {/* Backdrop Click Dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Floating Glow Orbs */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />

      {/* Main 3D Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        dir={t?.dir || 'ltr'}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className="relative z-10 w-full max-w-md rounded-3xl p-1 bg-gradient-to-b from-amber-400/40 via-amber-600/20 to-neutral-900/80 shadow-[0_25px_80px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-300 group select-none"
      >
        {/* Dynamic Light Sheen on Card */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 235, 180, ${glare.opacity}), transparent 60%)`
          }}
        />

        {/* Card Body */}
        <div className="relative z-20 w-full rounded-[23px] bg-[#110E16]/95 backdrop-blur-2xl p-6 sm:p-8 flex flex-col items-center text-center overflow-hidden border border-white/10">
          {/* Top subtle badge & close button */}
          <div className="w-full flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[11px] font-mono uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Creator</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
              title={t?.close || 'Close'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Animated Avatar / Monogram */}
          <div className="relative mb-5 group-hover:scale-105 transition-transform duration-300">
            {/* Outer spinning ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-400 via-purple-500 to-amber-500 opacity-60 blur-md animate-spin" style={{ animationDuration: '8s' }} />
            
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#1B1622] via-[#2A1F36] to-[#16121D] border-2 border-amber-400/60 flex flex-col items-center justify-center shadow-2xl overflow-hidden">
              <div className="font-cinzel text-3xl sm:text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600">
                WA
              </div>
              <span className="text-[9px] font-mono tracking-widest text-amber-300/80 uppercase">
                Studio
              </span>
            </div>

            {/* Lighthouse emblem badge */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shadow-lg border-2 border-[#110E16]">
              <LighthouseIcon className="w-4 h-4" />
            </div>
          </div>

          {/* Name and Title */}
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-amber-300 mb-1">
            {profile.name}
          </h2>

          <p className="text-xs sm:text-sm font-medium text-amber-300/90 tracking-wide mb-2">
            {profile.role}
          </p>

          <p className="text-xs text-neutral-400 font-light max-w-xs leading-relaxed mb-4">
            {profile.tagline}
          </p>

          {/* Location pill */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-6">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{profile.location}</span>
          </div>

          {/* Contact Details Interactive Blocks */}
          <div className="w-full space-y-2.5 mb-6">
            {/* Website Row */}
            <div className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between group/row">
              <div className="flex items-center gap-2.5 text-left truncate">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-300 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] text-neutral-400 block uppercase tracking-wider font-mono">
                    {t?.profileCard?.websiteLabel || 'Website'}
                  </span>
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-medium text-white hover:text-amber-300 underline-offset-2 hover:underline truncate block"
                  >
                    {profile.websiteDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => copyToClipboard(profile.website, 'website')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
                  title={profile.copyUrl}
                >
                  {copiedField === 'website' ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition-colors"
                  title={profile.visitWebsite}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp Row */}
            <div className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between group/row">
              <div className="flex items-center gap-2.5 text-left truncate">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-300 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] text-neutral-400 block uppercase tracking-wider font-mono">
                    {t?.profileCard?.phoneLabel || 'Mobile Phone'}
                  </span>
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-xs sm:text-sm font-medium text-white hover:text-amber-300 tracking-wider truncate block"
                  >
                    {profile.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => copyToClipboard(profile.phone, 'phone')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
                  title={profile.copyPhone}
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <a
                  href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors"
                  title={profile.whatsappChat}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Action CTA Buttons */}
          <div className="w-full grid grid-cols-2 gap-3">
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-cinzel text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{profile.visitWebsite}</span>
            </a>

            <a
              href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-cinzel text-xs font-semibold uppercase tracking-wider border border-white/15 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{profile.whatsappChat}</span>
            </a>
          </div>

          {/* Skills tags */}
          <div className="mt-5 pt-4 border-t border-white/5 w-full flex flex-wrap justify-center gap-1.5">
            {profile.skills?.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-white/[0.03] text-[10px] text-neutral-400 font-mono tracking-tight border border-white/5"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Copied notification toast */}
          {copiedField && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-amber-400 text-neutral-950 text-xs font-semibold shadow-xl flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>{profile.copied}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
