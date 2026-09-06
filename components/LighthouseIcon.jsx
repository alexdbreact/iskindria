'use client';

export default function LighthouseIcon({ className = 'w-6 h-6', alt = 'Vision Icon' }) {
  return (
    <img
      src="/vision_image.png"
      alt={alt}
      className={`inline-block object-contain filter drop-shadow-[0_0_10px_rgba(245,158,11,0.7)] flex-shrink-0 ${className}`}
    />
  );
}
