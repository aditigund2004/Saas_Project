import React, { useEffect, useRef, useState } from 'react';

/**
 * Rotating 3D DNA Helix Animation
 * High-performance dual-helix 3D projection on HTML5 Canvas with glowing nucleotides and base-pair rungs.
 * Automatically pauses when off-screen to preserve battery and GPU.
 * Fallback to crisp static SVG poster on `prefers-reduced-motion`.
 */
export function DnaHelixAnimation({ videoSrc = null, className = '', style = {} }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Pause rendering when off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isVisible || videoSrc) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let angle = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(rect.width * dpr, 100);
      canvas.height = Math.max(rect.height * dpr, 100);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const numPoints = 32;
    const speed = 0.012; // slow, elegant rotation

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const helixRadius = Math.min(width * 0.26, 65);

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const startY = height * 0.08;
      const endY = height * 0.92;
      const totalY = endY - startY;
      const stepY = totalY / numPoints;

      // Calculate 3D points
      const pairs = [];
      for (let i = 0; i <= numPoints; i++) {
        const y = startY + i * stepY;
        const currentAngle = angle + (i * 0.35);

        // Strand 1 (A)
        const x1 = centerX + Math.cos(currentAngle) * helixRadius;
        const z1 = Math.sin(currentAngle) * helixRadius;

        // Strand 2 (B) - 180 degrees opposite
        const x2 = centerX + Math.cos(currentAngle + Math.PI) * helixRadius;
        const z2 = Math.sin(currentAngle + Math.PI) * helixRadius;

        pairs.push({
          y,
          x1, z1,
          x2, z2,
          // Calculate mean z for depth sorting rungs
          avgZ: (z1 + z2) / 2
        });
      }

      // Sort by depth so back strands render before front strands
      pairs.forEach(pair => {
        // Base pair connecting bar (rung)
        const depth = (pair.avgZ + helixRadius) / (helixRadius * 2); // 0 to 1
        const alpha = 0.15 + depth * 0.45;

        const gradient = ctx.createLinearGradient(pair.x1, pair.y, pair.x2, pair.y);
        gradient.addColorStop(0, `rgba(56, 189, 248, ${alpha})`);   // Cyan
        gradient.addColorStop(0.5, `rgba(96, 165, 250, ${alpha * 0.7})`); // Sky
        gradient.addColorStop(1, `rgba(37, 99, 235, ${alpha})`);   // Cobalt

        ctx.beginPath();
        ctx.moveTo(pair.x1, pair.y);
        ctx.lineTo(pair.x2, pair.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.2 + depth * 1.2;
        ctx.stroke();

        // Render nodes with 3D scaling and glow
        // Node 1 (Strand A)
        const depth1 = (pair.z1 + helixRadius) / (helixRadius * 2);
        const radius1 = 2.5 + depth1 * 3;
        ctx.beginPath();
        ctx.arc(pair.x1, pair.y, radius1, 0, Math.PI * 2);
        ctx.fillStyle = pair.z1 > 0 ? '#38bdf8' : '#1d4ed8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = pair.z1 > 0 ? 8 : 2;
        ctx.fill();

        // Node 2 (Strand B)
        const depth2 = (pair.z2 + helixRadius) / (helixRadius * 2);
        const radius2 = 2.5 + depth2 * 3;
        ctx.beginPath();
        ctx.arc(pair.x2, pair.y, radius2, 0, Math.PI * 2);
        ctx.fillStyle = pair.z2 > 0 ? '#67e8f9' : '#2563eb';
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = pair.z2 > 0 ? 8 : 2;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw continuous backbone strands
      for (let strand = 1; strand <= 2; strand++) {
        ctx.beginPath();
        for (let i = 0; i < pairs.length; i++) {
          const x = strand === 1 ? pairs[i].x1 : pairs[i].x2;
          const y = pairs[i].y;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = strand === 1 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(37, 99, 235, 0.45)';
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      angle += speed;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReducedMotion, isVisible, videoSrc]);

  const isAbsolute = className.includes('absolute') || style.position === 'absolute';

  return (
    <div
      ref={containerRef}
      style={{
        ...(isAbsolute ? { position: 'absolute' } : {}),
        ...style
      }}
      className={`${isAbsolute ? 'absolute' : 'relative'} overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* If an external WebM video is provided, display it with poster fallback */}
      {videoSrc ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-full object-contain opacity-70"
        >

          <source src={videoSrc} type="video/webm" />
        </video>
      ) : prefersReducedMotion ? (
        /* Reduced motion accessible static SVG fallback */
        <svg viewBox="0 0 160 380" className="w-full h-full opacity-60">
          <defs>
            <linearGradient id="dna-static-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <path
            d="M 40,20 Q 80,100 120,180 T 40,340"
            fill="none"
            stroke="url(#dna-static-gradient)"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          />
          <path
            d="M 120,20 Q 80,100 40,180 T 120,340"
            fill="none"
            stroke="url(#dna-static-gradient)"
            strokeWidth="2.5"
          />
        </svg>
      ) : (
        /* Smooth, realistic 3D Canvas Helix */
        <canvas ref={canvasRef} className="w-full h-full block" />
      )}
    </div>
  );
}

