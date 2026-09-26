"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { items } from "@/components/sections/Portfolio";
import { ArrowUpRight, Sparkle, Eye, FileText, CheckCircle } from "phosphor-react";

const lime = "#c8f603";

const CATEGORIES = [
  { id: "all", label: "All Deliverables" },
  { id: "ecommerce", label: "E-Commerce & Amazon" },
  { id: "fb_logistics", label: "F&B & Logistics" },
  { id: "dashboards", label: "Dashboards & Models" },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const reduced = useReducedMotion();

  const filteredItems = items.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "ecommerce") {
      return (
        item.tags.some((t) => ["Amazon FBA", "E-Commerce"].includes(t)) ||
        item.title.toLowerCase().includes("amazon")
      );
    }
    if (activeFilter === "fb_logistics") {
      return (
        item.tags.some((t) => ["F&B", "Logistics", "Startup"].includes(t)) ||
        item.subtitle.toLowerCase().includes("restaurant") ||
        item.subtitle.toLowerCase().includes("delivery")
      );
    }
    if (activeFilter === "dashboards") {
      return (
        item.tags.some((t) => ["Dashboard", "Annual Review", "AP"].includes(t)) ||
        item.title.toLowerCase().includes("dashboard")
      );
    }
    return true;
  });

  return (
    <section id="work" className="relative overflow-hidden bg-[#f4f4f0] px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b-2 border-black pb-8 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#c8f603] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0_#000]">
              <Sparkle size={14} weight="bold" />
              <span>Verified Deliverables</span>
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-5xl">
              Real Work. Real Spreadsheets. Real Impact.
            </h2>
            <p className="mt-3 max-w-2xl text-base font-bold text-black sm:text-lg">
              Explore 12 interactive financial deliverables built for actual clients. Anonymized data, real formulas, automated reconciliation pipelines, and audit-ready reports.
            </p>
          </div>

          {/* Filter Pills — Jiro Feature Work Benjamen Pattern */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const active = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`rounded-full border-2 border-black px-4 py-1.5 text-xs font-black uppercase tracking-wider transition ${
                    active
                      ? "bg-black text-[#c8f603] shadow-[2px_2px_0_#c8f603]"
                      : "bg-white text-black hover:bg-neutral-200 shadow-[2px_2px_0_#000]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Deliverables Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.a
                key={item.file}
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.06 }}
                className="group flex flex-col overflow-hidden rounded-[20px] border-2 border-black bg-white transition hover:-translate-y-1.5 hover:shadow-[7px_7px_0_#c8f603]"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b-2 border-black bg-neutral-900">
                  <Image
                    src={item.thumb}
                    alt={item.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Top-Right Badge Tag */}
                  <span className="absolute right-3 top-3 rounded-md border border-black bg-white/95 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-black shadow-[2px_2px_0_#000]">
                    Verified
                  </span>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-black bg-[#c8f603] px-4 py-2 text-xs font-black text-black shadow-[3px_3px_0_#000]">
                      <Eye size={16} weight="bold" />
                      <span>Inspect Deliverable</span>
                      <ArrowUpRight size={14} weight="bold" />
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between text-xs text-black font-black uppercase tracking-wider">
                    <span>{item.subtitle}</span>
                    <ArrowUpRight size={16} className="text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <h3 className="mt-2 text-lg font-black leading-snug text-black">
                    {item.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed font-bold text-black sm:text-sm">
                    {item.description}
                  </p>

                  {/* Tags footer */}
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border-2 border-black bg-[#f4f4f0] px-2.5 py-0.5 text-[10px] font-black text-black"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
