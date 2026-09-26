"use client";

import { useEffect, useRef } from "react";

interface InteractiveMeshGradientProps {
  className?: string;
  opacity?: number;
}

export default function InteractiveMeshGradient({
  className = "",
  opacity = 0.08,
}: InteractiveMeshGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 50, y: 35, targetX: 50, targetY: 35 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const pctX = Math.max(0, Math.min(100, (clientX / rect.width) * 100));
      const pctY = Math.max(0, Math.min(100, (clientY / rect.height) * 100));

      posRef.current.targetX = pctX;
      posRef.current.targetY = pctY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Smooth lerp loop
    const animate = () => {
      const { x, y, targetX, targetY } = posRef.current;
      const nextX = x + (targetX - x) * 0.06;
      const nextY = y + (targetY - y) * 0.06;

      posRef.current.x = nextX;
      posRef.current.y = nextY;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--gx", `${nextX}%`);
        containerRef.current.style.setProperty("--gy", `${nextY}%`);
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none transition-opacity duration-1000 ${className}`}
      style={
        {
          "--gx": "50%",
          "--gy": "35%",
          opacity,
        } as React.CSSProperties
      }
    >
      {/* Dynamic Mouse-Following Mesh Orb 1 (Lime Glow) */}
      <div
        className="absolute h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] transition-transform duration-75"
        style={{
          left: "var(--gx)",
          top: "var(--gy)",
          background: "radial-gradient(circle, #c8f603 0%, rgba(200, 246, 3, 0.4) 40%, transparent 70%)",
        }}
      />

      {/* Floating Counter-Orb 2 (Gold Glow) */}
      <div
        className="absolute h-[500px] w-[500px] rounded-full blur-[140px] opacity-70"
        style={{
          right: "12%",
          top: "20%",
          background: "radial-gradient(circle, #ffc900 0%, rgba(255, 201, 0, 0.3) 50%, transparent 75%)",
        }}
      />

      {/* Subtle Bottom Emerald Bloom */}
      <div
        className="absolute h-[550px] w-[550px] -bottom-20 left-1/4 rounded-full blur-[150px] opacity-50"
        style={{
          background: "radial-gradient(circle, #00ff66 0%, rgba(0, 255, 102, 0.2) 50%, transparent 80%)",
        }}
      />

      {/* Geometric Ambient Grid Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: "linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
