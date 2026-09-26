"use client";

import React, { useEffect, useRef, useState } from "react";
import { WhatsappLogo } from "phosphor-react";

interface HangingCardData {
  tag: string;
  title: string;
  price: string;
  desc: string;
  highlight?: boolean;
  features?: string[];
}

const CARDS: HangingCardData[] = [
  {
    tag: "Most popular",
    title: "Salaried",
    price: "3,500",
    desc: "Single employer, clean salary slip. Complete filing on Iris + ATL status verification.",
    highlight: true,
  },
  {
    tag: "Multiple sources",
    title: "Salaried + Other Income",
    price: "4,500",
    desc: "Salary plus rental yield, bank profit, dividend receipts, or side consulting.",
  },
  {
    tag: "IT exporters",
    title: "Freelancers & Tech",
    price: "5,000",
    desc: "Foreign remittances, Section 154A 1% / 0.25% PSEB tax exemptions, PRC reconciliation.",
    highlight: true,
  },
  {
    tag: "Non-resident",
    title: "Overseas Pakistanis",
    price: "7,000",
    desc: "NRPs owning property or bank accounts back home. 100% remote filing via WhatsApp.",
  },
  {
    tag: "Full business books",
    title: "Business & Sole Prop",
    price: "8,000",
    desc: "Sole proprietors & AOPs — P&L preparation, balance sheet, and withholding tax credits.",
  },
];

const STRING_LENS = [140, 205, 115, 185, 135]; // Varied drop lengths in px

interface PendulumState {
  el: HTMLDivElement | null;
  cardEl: HTMLDivElement | null;
  L: number;
  angle: number;
  vel: number;
  dragging: boolean;
  lastX: number;
}

export default function HangingPricingCards() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hangersRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initialize pendulums
    const pendulums: PendulumState[] = CARDS.map((_, i) => ({
      el: hangersRef.current[i],
      cardEl: cardsRef.current[i],
      L: STRING_LENS[i % STRING_LENS.length],
      angle: (Math.random() - 0.5) * 0.16, // slight organic starting tilt
      vel: 0,
      dragging: false,
      lastX: 0,
    }));

    const G = 2600; // gravity in px/s^2 — snappier realistic swing
    const DAMPING = 0.55;

    let lastTime: number | null = null;
    let animId: number;

    const frame = (t: number) => {
      if (lastTime === null) lastTime = t;
      const dt = Math.min((t - lastTime) / 1000, 0.033);
      lastTime = t;

      for (let i = 0; i < pendulums.length; i++) {
        const p = pendulums[i];
        if (!p.dragging && !reduceMotion) {
          const acc = -(G / (p.L + 220)) * Math.sin(p.angle) - DAMPING * p.vel;
          p.vel += acc * dt;
          p.angle += p.vel * dt;
        }
        if (p.el) {
          p.el.style.transform = `rotate(${p.angle}rad)`;
        }
      }

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);

    // Pointer Dragging for each card
    const cleanups: (() => void)[] = [];

    pendulums.forEach((p) => {
      const card = p.cardEl;
      if (!card) return;

      const onPointerDown = (e: PointerEvent) => {
        p.dragging = true;
        p.lastX = e.clientX;
        p.vel = 0;
        setIsDragging(true);
        try {
          card.setPointerCapture(e.pointerId);
        } catch {}
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!p.dragging) return;
        const dx = e.clientX - p.lastX;
        p.lastX = e.clientX;
        const target = p.angle + dx / (p.L + 220);
        const clamped = Math.max(-0.85, Math.min(0.85, target));
        p.vel = (clamped - p.angle) * 18; // fling velocity
        p.angle = clamped;
      };

      const onPointerUp = () => {
        p.dragging = false;
        setIsDragging(false);
      };

      card.addEventListener("pointerdown", onPointerDown);
      card.addEventListener("pointermove", onPointerMove);
      card.addEventListener("pointerup", onPointerUp);
      card.addEventListener("pointercancel", onPointerUp);

      cleanups.push(() => {
        card.removeEventListener("pointerdown", onPointerDown);
        card.removeEventListener("pointermove", onPointerMove);
        card.removeEventListener("pointerup", onPointerUp);
        card.removeEventListener("pointercancel", onPointerUp);
      });
    });

    // Mouse breeze interaction across stage
    let lastMX: number | null = null;
    const onStageMouseMove = (e: MouseEvent) => {
      if (reduceMotion) return;
      if (lastMX !== null) {
        const push = (e.clientX - lastMX) * 0.0018;
        pendulums.forEach((p, i) => {
          p.vel += push * (0.75 + 0.12 * i);
        });
      }
      lastMX = e.clientX;
    };

    const onStageMouseLeave = () => {
      lastMX = null;
    };

    stage.addEventListener("mousemove", onStageMouseMove);
    stage.addEventListener("mouseleave", onStageMouseLeave);

    // Entrance Gust: when section enters viewport, swing cards in sequence
    let seen = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !seen) {
          seen = true;
          pendulums.forEach((p, i) => {
            setTimeout(() => {
              p.vel += (i % 2 === 0 ? 1 : -1) * 1.5;
            }, i * 140);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Idle gusts every few seconds
    const interval = setInterval(() => {
      if (reduceMotion) return;
      const target = pendulums[Math.floor(Math.random() * pendulums.length)];
      if (target && !target.dragging) {
        target.vel += (Math.random() - 0.5) * 0.65;
      }
    }, 4000);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(interval);
      observer.disconnect();
      stage.removeEventListener("mousemove", onStageMouseMove);
      stage.removeEventListener("mouseleave", onStageMouseLeave);
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="plans"
      className="relative w-full overflow-hidden border-b-2 border-black bg-[#080c14] px-4 py-20 text-white select-none sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl text-center">
        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#c8f603]/40 bg-[#c8f603]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#c8f603]">
          <span className="inline-block h-2 w-2 rounded-full bg-[#c8f603] animate-pulse" />
          Interactive Filing Plans
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-[clamp(1.85rem,4.5vw,3.25rem)] font-extrabold tracking-tight text-white">
          Pick your category.{" "}
          <span className="text-[#c8f603] underline decoration-[#c8f603]/40 underline-offset-8">
            Give it a swing.
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Fixed, transparent pricing for Tax Year 2026. Drag any card to test the physics, or click to file directly on WhatsApp.
        </p>

        {/* Glowing Hanging Rail */}
        <div
          className="mx-auto mt-10 h-1.5 w-full max-w-4xl rounded-full"
          style={{
            background: "linear-gradient(90deg, #1e2530, #c8f603 50%, #1e2530)",
            boxShadow: "0 0 20px rgba(200, 246, 3, 0.45)",
          }}
        />

        {/* The Hanging Stage */}
        <div
          ref={stageRef}
          className={`mx-auto flex max-w-5xl flex-wrap items-start justify-center gap-3 pt-0 sm:gap-6 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ touchAction: "pan-y" }}
        >
          {CARDS.map((c, i) => {
            const dropLength = STRING_LENS[i % STRING_LENS.length];
            const whatsappText = encodeURIComponent(
              `Hi Nabeel! I would like to file my Tax Year 2026 return under the "${c.title}" package (PKR ${c.price}). What documents should I send?`
            );

            return (
              <div
                key={c.title}
                ref={(el) => {
                  hangersRef.current[i] = el;
                }}
                className="hanger flex flex-col items-center will-change-transform"
                style={{ transformOrigin: "50% 0" }}
              >
                {/* Hanging String with gradient */}
                <div
                  className="w-[2px] rounded-full"
                  style={{
                    height: `${dropLength}px`,
                    background: "linear-gradient(180deg, #c8f603, #3f4752)",
                  }}
                />

                {/* Metallic Hook */}
                <div
                  className="h-3.5 w-3.5 rounded-full border-[3px] border-[#c8f603] border-b-transparent border-l-transparent"
                  style={{
                    transform: "rotate(45deg)",
                    marginTop: "-2px",
                  }}
                />

                {/* The Hanging Card */}
                <div
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                  className={`group relative mt-2 flex w-[clamp(170px,18vw,225px)] flex-col justify-between rounded-2xl border p-5 text-left transition-shadow duration-200 select-none ${
                    c.highlight
                      ? "border-[#c8f603] bg-[#121824] shadow-[0_18px_40px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_45px_rgba(200,246,3,0.22)]"
                      : "border-neutral-800 bg-[#0e131d] shadow-[0_16px_36px_rgba(0,0,0,0.55)] hover:border-[#c8f603]/80 hover:shadow-[0_18px_40px_rgba(200,246,3,0.14)]"
                  }`}
                  style={{
                    borderTopWidth: "3px",
                    borderTopColor: "#c8f603",
                  }}
                >
                  <div>
                    {/* Top Tag */}
                    <span className="inline-block rounded-full bg-[#c8f603] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-black">
                      {c.tag}
                    </span>

                    {/* Card Title */}
                    <h3 className="mt-3 text-base font-bold text-white leading-snug sm:text-lg">
                      {c.title}
                    </h3>

                    {/* Price */}
                    <div className="mt-2 text-2xl font-black text-[#c8f603] sm:text-3xl">
                      Rs {c.price} <small className="text-xs font-medium text-neutral-400">fixed</small>
                    </div>

                    {/* Short Description */}
                    <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                      {c.desc}
                    </p>
                  </div>

                  {/* Card Direct CTA */}
                  <div className="mt-5 pt-3 border-t border-white/10">
                    <a
                      href={`https://wa.me/923410224988?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-black bg-[#c8f603] py-2 text-xs font-bold text-black transition hover:bg-white hover:shadow-[2px_2px_0_#fff]"
                    >
                      <WhatsappLogo size={15} weight="bold" />
                      <span>Select Plan</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global CTA Row */}
        <div className="mt-14 flex flex-col items-center justify-center">
          <a
            href="https://wa.me/923410224988?text=Hi%20Nabeel!%20I%20want%20to%20file%20my%20Pakistan%20Income%20Tax%20Return%20for%20Tax%20Year%202026."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border-2 border-black bg-[#c8f603] px-8 py-3.5 text-base font-extrabold text-black shadow-[4px_4px_0_#000] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[4px_4px_0_#c8f603]"
          >
            <WhatsappLogo size={22} weight="fill" />
            <span>File my return on WhatsApp</span>
          </a>
          <div className="mt-3 text-xs text-neutral-500">
            WhatsApp: 0341-0224988 &nbsp;·&nbsp; Reply typically within a few hours &nbsp;·&nbsp; Guaranteed FBR CPR
          </div>
        </div>
      </div>
    </section>
  );
}
