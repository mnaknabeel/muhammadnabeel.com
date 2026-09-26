"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorTracker() {
  const [mounted, setMounted] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mouse = useRef({ x: -200, y: -200 });
  const dotPos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const pointerSeen = useRef(false);

  const followerOnRef = useRef(true);
  const particlesOnRef = useRef(true);

  const particles = useRef<
    Array<{ x: number; y: number; vx: number; vy: number; size: number; life: number; color: string }>
  >([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    let dpr = 1;
    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Initial center position
    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    dotPos.current = { ...mouse.current };
    ringPos.current = { ...mouse.current };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Particle emitter
    const spawnParticles = (x: number, y: number) => {
      if (!particlesOnRef.current || particles.current.length > 140) return;
      const palette = ["#ff5222", "#ff7450", "#c8f603", "#ffc900"];
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 2.2,
          vy: (Math.random() - 0.5) * 2.2,
          size: 2 + Math.random() * 3,
          life: 1,
          color: palette[Math.floor(Math.random() * palette.length)],
        });
      }
    };

    // Draw particle trail
    const drawParticles = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (!particlesOnRef.current && particles.current.length === 0) return;

      ctx.globalCompositeOperation = "lighter";
      const list = particles.current;
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.035;

        if (p.life <= 0) {
          list.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    // Frame animation loop
    let animId: number;
    const frame = () => {
      if (followerOnRef.current) {
        dotPos.current.x = lerp(dotPos.current.x, mouse.current.x, 0.38);
        dotPos.current.y = lerp(dotPos.current.y, mouse.current.y, 0.38);
        ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.13);
        ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.13);

        dot.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
        ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      drawParticles();
      animId = requestAnimationFrame(frame);
    };
    animId = requestAnimationFrame(frame);

    // Mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);

      if (!pointerSeen.current) {
        pointerSeen.current = true;
        if (followerOnRef.current) {
          dot.classList.add("is-visible");
          ring.classList.add("is-visible");
        }
      }

      spawnParticles(e.clientX, e.clientY);
    };

    // Hover interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && el.closest("a, button, [data-cursor], input, select, textarea, .tilt-card, .magnetic")) {
        ring.classList.add("is-active");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && el.closest("a, button, [data-cursor], input, select, textarea, .tilt-card, .magnetic")) {
        ring.classList.remove("is-active");
      }
    };

    const handleMouseDown = () => ring.classList.add("is-down");
    const handleMouseUp = () => ring.classList.remove("is-down");

    const handleMouseLeave = () => {
      dot.classList.remove("is-visible");
      ring.classList.remove("is-visible");
      pointerSeen.current = false;
    };

    // Card-Local Spotlight & 3D Tilt Delegate (Playbook Recipe D)
    const handleCardMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const card = target.closest<HTMLElement>(".tilt-card, .spotlight-card");
      if (!card) return;

      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      card.style.setProperty("--card-x", `${x}px`);
      card.style.setProperty("--card-y", `${y}px`);

      if (card.classList.contains("tilt-card")) {
        const px = x / r.width - 0.5;
        const py = y / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg)`;
      }
    };

    const handleCardOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const card = target.closest<HTMLElement>(".tilt-card");
      if (!card) return;

      const related = e.relatedTarget as HTMLElement | null;
      if (related && card.contains(related)) return;

      card.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
      card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
      setTimeout(() => {
        if (card) card.style.transition = "";
      }, 460);
    };

    // Magnetic Button Delegate (Playbook Recipe E)
    const handleMagneticMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const btn = target.closest<HTMLElement>(".magnetic");
      if (!btn) return;

      const r = btn.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);

      btn.style.transition = "transform 0.08s linear";
      btn.style.transform = `translate(${x * 0.32}px, ${y * 0.32}px)`;
    };

    const handleMagneticOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const btn = target.closest<HTMLElement>(".magnetic");
      if (!btn) return;

      const related = e.relatedTarget as HTMLElement | null;
      if (related && btn.contains(related)) return;

      btn.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
      btn.style.transform = "translate(0px, 0px)";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.addEventListener("mousedown", handleMouseDown, { passive: true });
    document.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    document.addEventListener("mousemove", handleCardMove, { passive: true });
    document.addEventListener("mouseout", handleCardOut, { passive: true });
    document.addEventListener("mousemove", handleMagneticMove, { passive: true });
    document.addEventListener("mouseout", handleMagneticOut, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousemove", handleCardMove);
      document.removeEventListener("mouseout", handleCardOut);
      document.removeEventListener("mousemove", handleMagneticMove);
      document.removeEventListener("mouseout", handleMagneticOut);
    };
  }, [mounted]);



  if (!mounted) return null;

  return (
    <>
      {/* 1. Sparkle Canvas Trail */}
      <canvas
        id="trailCanvas"
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9997] h-full w-full"
      />

      {/* 2. Global Ambient Viewport Radial Illumination */}
      <div className="ambient-glow" aria-hidden="true" />

      {/* 3. Dual Cursor Follower (Dot & Ring) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 will-change-transform"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 will-change-transform"
      />
    </>
  );
}
