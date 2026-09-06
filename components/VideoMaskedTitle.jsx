'use client';

import { useEffect, useRef } from 'react';

export default function VideoMaskedTitle({
  text = 'ISKINDRIA',
  isArabic = false,
  videoSrc = '/title.mp4'
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log('Video play catch:', e));
    }
  }, [text, isArabic]);

  const maskId = isArabic ? 'title-mask-ar' : 'title-mask-en';
  const viewBoxW = isArabic ? 1200 : 1400;
  const viewBoxH = 260;
  const fontSize = isArabic ? 190 : 170;
  const letterSpacing = isArabic ? 0 : 12;
  const textX = viewBoxW / 2;
  const textY = isArabic ? 172 : 165;
  const fontFamily = isArabic
    ? 'var(--font-cairo), Cairo, sans-serif'
    : 'var(--font-cinzel), Cinzel, serif';

  return (
    <div className="relative w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto flex items-center justify-center select-none py-1">
      <svg
        viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
        className="w-full h-auto max-h-[160px] sm:max-h-[220px] md:max-h-[280px] lg:max-h-[320px] drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={viewBoxW} height={viewBoxH}>
            {/* Black rect hides everything outside letters */}
            <rect x="0" y="0" width={viewBoxW} height={viewBoxH} fill="black" />
            
            {/* Pure white text: reveals video strictly inside font glyphs */}
            <text
              x={textX}
              y={textY}
              textAnchor="middle"
              fill="white"
              fontSize={fontSize}
              fontWeight="900"
              fontFamily={fontFamily}
              letterSpacing={letterSpacing}
            >
              {text}
            </text>
          </mask>
        </defs>

        {/* Video element inside SVG foreignObject masked by the text */}
        <foreignObject
          x="0"
          y="0"
          width={viewBoxW}
          height={viewBoxH}
          mask={`url(#${maskId})`}
        >
          <div className="w-full h-full bg-transparent flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover contrast-125 brightness-115 scale-105"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </foreignObject>

        {/* Subtle gold stroke outline highlighting the letter edges */}
        <text
          x={textX}
          y={textY}
          textAnchor="middle"
          fill="none"
          stroke="#FDE68A"
          strokeWidth="2.5"
          strokeOpacity="0.45"
          fontSize={fontSize}
          fontWeight="900"
          fontFamily={fontFamily}
          letterSpacing={letterSpacing}
          className="pointer-events-none"
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
