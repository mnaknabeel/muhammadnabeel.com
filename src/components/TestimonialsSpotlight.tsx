"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CaretLeft,
  CaretRight,
  Star,
  Quotes,
  CheckCircle,
  Sparkle,
} from "phosphor-react";

interface Testimonial {
  id: number;
  tag: string;
  tagColor: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    tag: "Amazon FBA Bookkeeping",
    tagColor: "#c8f603",
    quote:
      "Nabeel rescued our Amazon books after two local CPAs gave up on reconciling our multi-currency settlement reports. He mapped SKU-level COGS, automated our bi-weekly payouts, and cut our month-end close from 3 weeks down to 3 days.",
    author: "David K.",
    role: "Managing Director",
    company: "Apex Brands LLC (Austin, TX)",
    metric: "$1.2M GMV · Close Cycle: 3w → 3d",
    rating: 5,
  },
  {
    id: 2,
    tag: "Pakistan Tax & ATL Advisory",
    tagColor: "#ffc900",
    quote:
      "FBR tax filing in Pakistan used to give me immense stress every September. Nabeel filed my foreign IT remittances under Section 154A at 0.25%, balanced my Section 116 Wealth Statement to zero discrepancy, and had my official CPR receipt in under 24 hours.",
    author: "Hamza Tariq",
    role: "Principal Software Architect",
    company: "DevScale Labs (Remote)",
    metric: "100% Iris Compliance · 24h CPR",
    rating: 5,
  },
  {
    id: 3,
    tag: "Catch-up & Cleanup",
    tagColor: "#c8f603",
    quote:
      "Our QuickBooks Online sat neglected for 18 months with over 800 unclassified transactions. Nabeel executed a full catch-up in under 10 business days. Everything reconciled to the penny. Hands down the highest ROI financial investment we made this year.",
    author: "Sarah Jenkins",
    role: "Founder & CEO",
    company: "Kinfolk Living (London / Remote)",
    metric: "18 Months Reconciled · $450K Cleaned",
    rating: 5,
  },
  {
    id: 4,
    tag: "Salaried + Multi-Income Tax",
    tagColor: "#00ff66",
    quote:
      "Between my corporate tech salary, rental properties, and bank profit on debt, multi-source tax filing was overwhelming. Nabeel claimed all Section 139(b) medical relief and advance withholding credits. Kept me safely on ATL without paying an unnecessary rupee.",
    author: "Ali Raza",
    role: "VP of Engineering",
    company: "CloudCore Systems",
    metric: "PKR 140k+ Saved Legally · ATL Active",
    rating: 5,
  },
];

export default function TestimonialsSpotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const current = testimonials[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="relative overflow-hidden border-b-2 border-black bg-[#fafaf7] px-5 py-20 sm:px-8 sm:py-28">
      {/* Background Ambience */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full blur-[120px] opacity-15"
        style={{
          background: "radial-gradient(circle, #c8f603 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#ffc900] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[3px_3px_0_#000]">
              <Sparkle size={15} weight="fill" />
              <span>Carousel Spotlight · Verified Client Proof</span>
            </div>
            <h2 className="mt-3 text-[clamp(2.1rem,5vw,3.5rem)] font-extrabold tracking-tight text-black">
              Trusted by founders, engineers &amp; merchants.
            </h2>
            <p className="mt-2 text-base text-black/75 max-w-xl">
              Real results across US e-commerce brands, software exporters, and busy salaried professionals.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-white text-black shadow-[3px_3px_0_#000] transition hover:-translate-y-0.5 hover:bg-[#c8f603] active:translate-y-0 active:shadow-none"
            >
              <CaretLeft size={22} weight="bold" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-white text-black shadow-[3px_3px_0_#000] transition hover:-translate-y-0.5 hover:bg-[#c8f603] active:translate-y-0 active:shadow-none"
            >
              <CaretRight size={22} weight="bold" />
            </button>
          </div>
        </div>

        {/* Spotlight Card Carousel */}
        <div className="relative mt-12">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="spotlight-card relative rounded-[28px_28px_28px_4px] border-2 border-black bg-white p-7 shadow-[8px_8px_0_#c8f603] sm:p-11"
            >
              {/* Quote Watermark Icon */}
              <div className="absolute right-8 top-8 text-black/10 select-none pointer-events-none">
                <Quotes size={80} weight="fill" />
              </div>

              {/* Tag & Stars Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
                <span
                  className="rounded-full border border-black px-3.5 py-1 text-xs font-bold text-black"
                  style={{ backgroundColor: current.tagColor }}
                >
                  {current.tag}
                </span>

                <div className="flex items-center gap-1 text-[#ffc900]">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={18} weight="fill" className="text-black fill-[#ffc900]" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-black">5.0 / 5.0</span>
                </div>
              </div>

              {/* Main Quote Content */}
              <blockquote className="mt-6 text-lg font-medium leading-relaxed text-black sm:text-2xl sm:leading-snug">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Author & Metric Footer */}
              <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-black text-black">{current.author}</p>
                    <CheckCircle size={16} weight="fill" className="text-emerald-600" />
                  </div>
                  <p className="text-xs text-black/70">
                    {current.role} · <span className="font-semibold text-black">{current.company}</span>
                  </p>
                </div>

                <div className="rounded-xl border border-black bg-[#f4f4f0] px-4 py-2 text-xs font-bold text-black shadow-[2px_2px_0_#000]">
                  <span className="text-emerald-700">✦ Impact: </span>
                  {current.metric}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-3 rounded-full border border-black transition-all ${
                  idx === currentIndex
                    ? "w-8 bg-[#c8f603] shadow-[2px_2px_0_#000]"
                    : "w-3 bg-white hover:bg-black/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
