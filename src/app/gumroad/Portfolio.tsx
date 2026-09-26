"use client";

/*
  Portfolio — the main focus of the mockup.
  Data comes from the real site's Portfolio section (single source of truth).
  Gumroad treatment: featured cards + grid, black borders, offset-shadow hovers.
*/

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { items } from "@/components/sections/Portfolio";

const lime = "#c8f603";

const featuredSlugs = [
  "/portfolio/pnl-amazon-fba-seller.html",
  "/portfolio/income-statement-ghostro-delivery.html",
];

function Card({
  item,
  featured = false,
  index = 0,
}: {
  item: (typeof items)[0];
  featured?: boolean;
  index?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.a
      href={item.file}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col border border-black bg-white transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] ${
        featured ? "rounded-[24px_24px_24px_4px]" : "rounded-[20px]"
      }`}
      initial={reduced ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`relative w-full overflow-hidden border-b border-black ${
          featured ? "aspect-[16/8]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={item.thumb}
          alt={item.title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <span
          className="absolute bottom-3 right-3 translate-y-2 rounded-md border border-black px-2.5 py-1 text-xs font-semibold opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
          style={{ background: lime }}
        >
          View report →
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-2 text-[12px] uppercase tracking-[0.08em] text-black">
          {item.subtitle}
        </p>
        <h3
          className={`font-medium leading-snug tracking-[-0.01em] ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-black">
          {item.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
          {item.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-black px-2.5 py-0.5 text-[11px]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function Portfolio() {
  const rest = items.filter((i) => !featuredSlugs.includes(i.file));
  const featured = items.filter((i) => featuredSlugs.includes(i.file));

  return (
    <section id="work" className="bg-[#f4f4f0] px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-[15px]">
          <span
            className="rounded px-2 py-1 font-semibold"
            style={{ background: lime }}
          >
            Portfolio
          </span>{" "}
          — 12 real deliverables
        </p>
        <h2 className="mb-4 text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em]">
          The work speaks.
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-black sm:mb-16">
          Real client reports — anonymized but real numbers. Every card opens a
          full deliverable: P&amp;Ls, dashboards, audits, and forecast models
          built in the wild.
        </p>

        {/* featured two */}
        <div className="mb-5 grid gap-5 md:grid-cols-2">
          {featured.map((item, i) => (
            <Card key={item.file} item={item} featured index={i} />
          ))}
        </div>

        {/* the rest */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item, i) => (
            <Card key={item.file} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
