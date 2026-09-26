"use client";

import { useEffect, useRef } from "react";

/**
 * TaxHeroCanvas — Authentic Vertical Financial & Tax Matrix Rain
 *
 * Implements the iconic Matrix digital rain algorithm powered by HTML5 Canvas:
 * - Falling streams of statutory tax sections (116, 139, 154A, 60, 7E), currency symbols (₨, $, %),
 *   and FBR filing ledger codes.
 * - Glowing phosphor heads (#ffffff / #c8f603) with bloom glow, followed by vibrant matrix green
 *   trails (#00ff66, #22c55e) fading naturally into deep obsidian.
 * - Interactive mouse reaction: streams near the pointer illuminate in bright neon lime.
 * - 100% visible, bold, and high-impact.
 */
export default function TaxHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const pointer = { x: -1000, y: -1000 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const parent = containerRef.current || canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handlePointerMove, { passive: true });
      parent.addEventListener("mouseleave", handlePointerLeave, { passive: true });
    }

    // Tax, Finance & Statutory tokens
    const tokens = [
      "116", "139", "154A", "60", "60D", "62A", "236G", "153", "231A", "7E",
      "₨", "$", "%", "ATL", "FBR", "PKR", "TAX", "P&L", "CPR", "NTN",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
      "88", "42", "07", "99", "10K", "✦"
    ];

    const fontSize = 14;
    const colSpacing = 22;
    let columns = 0;
    let drops: number[] = [];
    let speeds: number[] = [];

    const setSize = () => {
      width = canvas.width = parent?.clientWidth || window.innerWidth;
      height = canvas.height = parent?.clientHeight || 800;

      columns = Math.floor(width / colSpacing);
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
      speeds = Array.from({ length: columns }, () => 0.8 + Math.random() * 1.4);

      // Solid dark base on resize
      ctx.fillStyle = "#05080f";
      ctx.fillRect(0, 0, width, height);
    };

    setSize();
    window.addEventListener("resize", setSize, { passive: true });

    let lastTime = performance.now();

    const draw = (now: number) => {
      // Regulate to ~45-50fps for smooth cinematic waterfall cadence
      if (now - lastTime < 20) {
        animId = requestAnimationFrame(draw);
        return;
      }
      lastTime = now;

      // Authentic phosphorescent trail fade (darkens prior frames smoothly)
      ctx.fillStyle = "rgba(5, 8, 15, 0.13)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = "bold 13px ui-monospace, 'JetBrains Mono', 'DM Mono', monospace";

      for (let i = 0; i < drops.length; i++) {
        const token = tokens[Math.floor(Math.random() * tokens.length)];
        const x = i * colSpacing + 6;
        const y = drops[i] * fontSize;

        // Proximity to pointer
        const dist = Math.hypot(x - pointer.x, y - pointer.y);
        const isNearPointer = dist < 120;

        // Leading head character has bright bloom glow
        const isLead = Math.random() > 0.4 || isNearPointer;

        if (isNearPointer) {
          ctx.save();
          ctx.shadowColor = "#c8f603";
          ctx.shadowBlur = 12;
          ctx.fillStyle = "#c8f603"; // Neon Lime on cursor interaction
          ctx.fillText(token, x, y);
          ctx.restore();
        } else if (isLead && Math.random() > 0.85) {
          ctx.save();
          ctx.shadowColor = "#00ff66";
          ctx.shadowBlur = 10;
          ctx.fillStyle = "#ffffff"; // Pure white hot lead
          ctx.fillText(token, x, y);
          ctx.restore();
        } else {
          ctx.shadowBlur = 0;
          // Vibrant matrix green
          ctx.fillStyle = Math.random() > 0.6 ? "#00ff66" : "#22c55e";
          ctx.fillText(token, x, y);
        }

        // Reset column to top once past bottom with randomized staggered re-entry
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = 0.8 + Math.random() * 1.4;
        }

        drops[i] += speeds[i];
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", setSize);
      if (parent) {
        parent.removeEventListener("mousemove", handlePointerMove);
        parent.removeEventListener("mouseleave", handlePointerLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#05080f]"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-full w-full block"
      />
      {/* Soft gradient wash that preserves 100% matrix visibility while ensuring left headlines are crystal clear */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 28% 45%, rgba(5, 8, 15, 0.78) 0%, rgba(5, 8, 15, 0.3) 65%, transparent 100%)",
        }}
      />
      {/* Subtle bottom fade into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#05080f] to-transparent" />
    </div>
  );
}
