'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isClicked = useRef(false);
  const isVisible = useRef(false);
  const currentScale = useRef(1);
  const targetScale = useRef(1);

  const particles = useRef([]);
  const ripples = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d', { alpha: true }) : null;

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const updateCursorPosition = (x, y) => {
      if (cursorRef.current && isVisible.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${currentScale.current})`;
        cursorRef.current.style.opacity = '1';
      }
    };

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
      }

      // Instant 1:1 hardware position update for zero lag & pixel-perfect precision
      updateCursorPosition(e.clientX, e.clientY);

      // Add golden stardust trail particles
      if (Math.random() > 0.45) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 4,
          y: e.clientY + 12 + Math.random() * 6,
          size: Math.random() * 2.2 + 1.0,
          alpha: 0.8,
          vx: (Math.random() - 0.5) * 0.4,
          vy: Math.random() * 0.3 + 0.2,
          color: Math.random() > 0.3 ? '#FDE68A' : '#F59E0B'
        });
      }

      // Check hover on interactive targets
      const target = e.target;
      if (target) {
        const interactive = target.closest(
          'button, a, input, select, textarea, [role="button"], .cursor-pointer, .item__image, [tabindex]'
        );
        isHovered.current = !!interactive;
      }
    };

    const onMouseDown = (e) => {
      isClicked.current = true;
      // Add ripple shockwave centered at exact click point
      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 36,
        alpha: 0.95
      });

      // Burst of particles
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const speed = Math.random() * 2 + 1.2;
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 2.5 + 1.2,
          alpha: 1,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: '#FDE68A'
        });
      }
    };

    const onMouseUp = () => {
      isClicked.current = false;
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible.current = true;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth animation render loop for trailing halo & particles
    let animationFrameId;
    const animate = () => {
      // 1. Smooth, responsive lerp for trailing halo ring (tuned for buttery smooth follow)
      const ringEase = 0.28;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ringEase;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ringEase;

      // 2. Smooth scale interpolation for hover / click
      targetScale.current = isClicked.current ? 0.9 : isHovered.current ? 1.18 : 1.0;
      currentScale.current += (targetScale.current - currentScale.current) * 0.25;

      // 3. Update DOM Cursor
      if (cursorRef.current && isVisible.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) scale(${currentScale.current})`;
        cursorRef.current.style.opacity = '1';
      }

      // 4. Update Trailing Halo Ring
      if (ringRef.current && isVisible.current) {
        const ringScale = isHovered.current ? 1.5 : isClicked.current ? 0.75 : 1.0;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${ringScale})`;
        ringRef.current.style.opacity = isHovered.current ? '0.85' : '0.5';
      }

      // 5. Render Canvas Particles & Ripples
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ripples
        for (let i = ripples.current.length - 1; i >= 0; i--) {
          const r = ripples.current[i];
          r.radius += 1.8;
          r.alpha *= 0.92;

          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(253, 230, 138, ${r.alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          if (r.radius >= r.maxRadius || r.alpha < 0.05) {
            ripples.current.splice(i, 1);
          }
        }

        // Particle Trail
        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha *= 0.93;
          p.size *= 0.96;

          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.4, p.size), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          ctx.globalAlpha = 1;

          if (p.alpha < 0.05 || p.size < 0.4) {
            particles.current.splice(i, 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Background Particle Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9997] hidden md:block"
      />

      {/* Trailing Golden Beacon Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 -ml-5 -mt-5 w-10 h-10 rounded-full border border-amber-400/50 bg-amber-400/10 backdrop-blur-[1px] shadow-[0_0_15px_rgba(245,158,11,0.35)] z-[9998] opacity-0 hidden md:block will-change-transform"
      >
        {/* Rotating light sweep aura */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/40 via-amber-200/20 to-transparent animate-spin opacity-75"
          style={{ animationDuration: '3s' }}
        />
      </div>

      {/* Transparent Silhouette Pharos Lighthouse Cursor with Precision Hotspot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 hidden md:block will-change-transform"
      >
        <div className="relative pointer-events-none">
          {/* Exact Pinpoint Click Hotspot: Beacon Light Apex at (0, 0) */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 flex items-center justify-center z-30 pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_10px_#FDE68A] animate-ping" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#F59E0B]" />
          </div>

          {/* Transparent Lighthouse Silhouette Figure anchored directly below the beacon tip */}
          <div className="absolute top-0.5 left-0 -translate-x-1/2 w-9 h-11 sm:w-10 sm:h-13 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] pointer-events-none">
            <img
              src="/vision_image.png"
              alt="Pharos Lighthouse Cursor"
              className="w-full h-full object-contain pointer-events-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}
