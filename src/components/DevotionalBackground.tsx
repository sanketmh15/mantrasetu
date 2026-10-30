import React, { useEffect, useRef } from 'react';
import { DeityId } from '../types';

interface DevotionalBackgroundProps {
  activeDeity: DeityId;
  activeTab: string;
}

interface Ember {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  hue: number;
  swayFactor: number;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  sway: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: string;
}

export const DevotionalBackground: React.FC<DevotionalBackgroundProps> = ({
  activeDeity,
  activeTab,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color theme matching deity and tab
    const getThemeConfig = () => {
      if (activeTab === 'kumbh') {
        return { baseHue: 34, emberCount: 42, petalCount: 10, themeName: 'kumbh' }; // River Godavari sunrise gold
      }
      if (activeTab === 'deities' || activeTab === 'god-detail') {
        return { baseHue: 40, emberCount: 46, petalCount: 14, themeName: 'sanctuary' }; // 50 Gods golden aura
      }
      if (activeTab === 'japa') {
        return { baseHue: 36, emberCount: 50, petalCount: 12, themeName: 'meditation' }; // Japa Mala deep saffron
      }
      if (activeDeity === 'shiva') {
        return { baseHue: 215, emberCount: 38, petalCount: 8, themeName: 'shiva' }; // Himalayan cosmic blue
      }
      if (activeDeity === 'vitthal') {
        return { baseHue: 45, emberCount: 44, petalCount: 14, themeName: 'vitthal' }; // Pandharpur Chandrabhaga gold
      }
      if (activeDeity === 'hanuman') {
        return { baseHue: 24, emberCount: 42, petalCount: 10, themeName: 'hanuman' }; // Kesari saffron vermilion
      }
      return { baseHue: 38, emberCount: 40, petalCount: 12, themeName: 'default' };
    };

    const config = getThemeConfig();

    // 1. Embers / Diya sparks (Rising gently)
    const embers: Ember[] = [];
    for (let i = 0; i < config.emberCount; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3.5 + 1.2,
        speedY: Math.random() * 0.7 + 0.3,
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.65 + 0.25,
        hue: config.baseHue + (Math.random() * 18 - 9),
        swayFactor: Math.random() * Math.PI * 2,
      });
    }

    // 2. Sacred Lotus Petals (Fluttering gently downward)
    const petals: Petal[] = [];
    for (let i = 0; i < config.petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 5,
        speedY: Math.random() * 0.5 + 0.2,
        speedX: Math.random() * 0.4 - 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.45 + 0.15,
        sway: Math.random() * Math.PI * 2,
      });
    }

    // 3. Interactive Touch/Pointer Sparkles
    const interactiveSparkles: Sparkle[] = [];

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Spawn 2 sparkling particles at touch point
      for (let k = 0; k < 2; k++) {
        interactiveSparkles.push({
          x: clientX + (Math.random() * 20 - 10),
          y: clientY + (Math.random() * 20 - 10),
          size: Math.random() * 3 + 1.5,
          alpha: 1.0,
          color: Math.random() > 0.5 ? '#f59e0b' : '#ea580c',
        });
      }
      if (interactiveSparkles.length > 50) {
        interactiveSparkles.shift();
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // A. Draw Rising Diya Embers
      embers.forEach((p) => {
        p.y -= p.speedY;
        p.x += Math.sin(time + p.swayFactor) * 0.5 + p.speedX;

        // Reset when floating out
        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Glowing corona
        const glowRadius = p.size * 3.2;
        const grad = ctx.createRadialGradient(p.x, p.y, p.size * 0.2, p.x, p.y, glowRadius);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 75%, ${p.opacity})`);
        grad.addColorStop(0.5, `hsla(${p.hue}, 95%, 55%, ${p.opacity * 0.4})`);
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 50%, 0)`);

        ctx.fillStyle = grad;
        ctx.fill();
      });

      // B. Draw Drifting Lotus Petals
      petals.forEach((petal) => {
        petal.y += petal.speedY;
        petal.x += Math.sin(time * 0.8 + petal.sway) * 0.7 + petal.speedX;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > height + 20) {
          petal.y = -20;
          petal.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotation);
        ctx.beginPath();
        // Stylized lotus petal ellipse curve
        ctx.ellipse(0, 0, petal.size * 0.5, petal.size, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${petal.opacity * 0.35})`;
        ctx.fill();
        ctx.restore();
      });

      // C. Draw Interactive Pointer Sparkles
      for (let i = interactiveSparkles.length - 1; i >= 0; i--) {
        const sp = interactiveSparkles[i];
        sp.y -= 0.6;
        sp.alpha -= 0.025;
        if (sp.alpha <= 0) {
          interactiveSparkles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = sp.color;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeDeity, activeTab]);

  // Determine dynamic theme gradients based on active view
  const isKumbh = activeTab === 'kumbh';
  const isShiva = activeDeity === 'shiva';
  const isVitthal = activeDeity === 'vitthal';
  const isHanuman = activeDeity === 'hanuman';
  const isDeities = activeTab === 'deities' || activeTab === 'god-detail';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Base Ethereal Spiritual Canvas Layer */}
      <div className="absolute inset-0 bg-[#fbf9f4] dark:bg-[#0c0b09] transition-colors duration-500" />

      {/* 2. Radiant Cosmic Aura (Slow breathing gradient halo) */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] rounded-full blur-[120px] transition-all duration-1000 ${
          isKumbh
            ? 'bg-gradient-to-b from-amber-500/25 via-saffron-600/15 to-transparent opacity-80 animate-pulse'
            : isDeities
            ? 'bg-gradient-to-b from-amber-500/30 via-yellow-600/20 to-transparent opacity-85'
            : isShiva
            ? 'bg-gradient-to-b from-blue-600/25 via-indigo-950/25 to-transparent opacity-75'
            : isVitthal
            ? 'bg-gradient-to-b from-yellow-500/30 via-amber-800/20 to-transparent opacity-80'
            : isHanuman
            ? 'bg-gradient-to-b from-saffron-600/30 via-red-800/15 to-transparent opacity-80'
            : 'bg-gradient-to-b from-amber-500/25 via-saffron-700/15 to-transparent opacity-75'
        }`}
      />

      {/* 3. Subtle Warm Temple Diya Lanterns on Bottom Corners */}
      <div
        className={`absolute -bottom-20 -left-20 w-[450px] h-[450px] rounded-full blur-[100px] opacity-40 transition-colors duration-1000 ${
          isShiva ? 'bg-indigo-700/30' : isHanuman ? 'bg-saffron-600/35' : 'bg-amber-600/35'
        }`}
      />
      <div
        className={`absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full blur-[100px] opacity-40 transition-colors duration-1000 ${
          isShiva ? 'bg-blue-600/30' : isHanuman ? 'bg-vermilion-600/30' : 'bg-yellow-600/35'
        }`}
      />

      {/* 4. Beautiful, Visible Sacred Rotating Sri Yantra / Mandala Geometry */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 dark:opacity-25 select-none pointer-events-none">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full animate-[spin_180s_linear_infinite]"
        >
          {/* Outer Sun Rays & Radiance Ring */}
          <circle cx="100" cy="100" r="96" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="88" fill="none" stroke="#ea580c" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="76" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="4 2" />
          <circle cx="100" cy="100" r="58" fill="none" stroke="#ea580c" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="42" fill="none" stroke="#f59e0b" strokeWidth="0.7" strokeDasharray="2 2" />
          <circle cx="100" cy="100" r="26" fill="none" stroke="#ea580c" strokeWidth="0.8" />

          {/* 16 Sacred Lotus Petals */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            const x1 = 100 + 42 * Math.cos(angle);
            const y1 = 100 + 42 * Math.sin(angle);
            const x2 = 100 + 76 * Math.cos(angle + 0.18);
            const y2 = 100 + 76 * Math.sin(angle + 0.18);
            const x3 = 100 + 76 * Math.cos(angle - 0.18);
            const y3 = 100 + 76 * Math.sin(angle - 0.18);
            return (
              <polygon
                key={`petal-${i}`}
                points={`${x1},${y1} ${x2},${y2} 100,100 ${x3},${y3}`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="0.6"
              />
            );
          })}

          {/* Central Sacred Sri Yantra Interlocking Triangles */}
          <polygon points="100,68 128,116 72,116" fill="none" stroke="#ea580c" strokeWidth="0.9" />
          <polygon points="100,132 128,84 72,84" fill="none" stroke="#f59e0b" strokeWidth="0.9" />
          <polygon points="100,76 120,110 80,110" fill="none" stroke="#f59e0b" strokeWidth="0.6" />
          <polygon points="100,124 120,90 80,90" fill="none" stroke="#ea580c" strokeWidth="0.6" />

          {/* Central Bindu (Divine Source of Cosmic Consciousness) */}
          <circle cx="100" cy="100" r="3.5" fill="#f59e0b" />
        </svg>
      </div>

      {/* 5. Floating Celestial Sacred Glyphs (Drifting peacefully in 3D parallax) */}
      <div className="absolute top-[15%] left-[8%] text-amber-500/25 dark:text-amber-400/20 text-4xl animate-bounce [animation-duration:8s] select-none">
        ॐ
      </div>
      <div className="absolute top-[30%] right-[10%] text-amber-500/20 dark:text-amber-400/15 text-3xl animate-pulse [animation-duration:6s] select-none">
        卐
      </div>
      <div className="absolute bottom-[25%] left-[12%] text-amber-500/20 dark:text-amber-400/15 text-3xl animate-bounce [animation-duration:10s] select-none">
        🪷
      </div>
      <div className="absolute bottom-[20%] right-[14%] text-amber-500/25 dark:text-amber-400/20 text-3xl animate-pulse [animation-duration:7s] select-none">
        🚩
      </div>
      <div className="absolute top-[65%] left-[5%] text-amber-500/15 dark:text-amber-400/15 text-2xl animate-pulse [animation-duration:9s] select-none">
        🔱
      </div>

      {/* 6. Live Interactive Canvas (Rising Embers, Falling Lotus Petals, Mouse Sparkles) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
};
