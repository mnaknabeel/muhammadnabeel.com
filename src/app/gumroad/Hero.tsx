"use client";

/*
  3D scroll hero — finance niche (v2: contained, symbol-driven).
  - Bar chart lives INSIDE a bordered "Revenue engine" dashboard card → can never overlap text.
  - Backdrop is ambience only: faint ledger grid, 2 coins top-right, lime sparkles.
  - "money." is ringed by a finance-symbol ring (SVG textPath: $ ₨ € ¥ % digits).
  - Scroll count-up: $0 → $4,000,000+ as the bars grow.
  Dependencies already in project: three, @react-three/fiber, @react-three/drei, motion.
*/

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Edges, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import * as THREE from "three";
import Image from "next/image";
import { WhatsappLogo } from "phosphor-react";
import { favorit } from "./fonts";

const lime = "#c8f603";

const pv = (v: MotionValue<number> | number) =>
  typeof v === "number" ? v : v.get();

/* ── Backdrop 3D scene (kinetic mathematical nodes & particle nebula) ─────── */

function CrystalNode({
  position,
  scale = 1,
  speed = 1,
  shape = "octahedron",
  edgeColor = lime,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  shape?: "octahedron" | "icosahedron" | "dodecahedron";
  edgeColor?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.16 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.24 * speed;
    ref.current.rotation.z = state.clock.elapsedTime * 0.08 * speed;
  });
  return (
    <Float speed={speed * 1.4} rotationIntensity={0.85} floatIntensity={1.25}>
      <group ref={ref} position={position} scale={scale}>
        <mesh>
          {shape === "icosahedron" ? (
            <icosahedronGeometry args={[0.7, 0]} />
          ) : shape === "dodecahedron" ? (
            <dodecahedronGeometry args={[0.65, 0]} />
          ) : (
            <octahedronGeometry args={[0.68, 0]} />
          )}
          <meshStandardMaterial
            color="#070b12"
            roughness={0.16}
            metalness={0.9}
          />
          <Edges color={edgeColor} threshold={14} />
        </mesh>
      </group>
    </Float>
  );
}

function CameraDrift({ progress }: { progress: MotionValue<number> | number }) {
  const { pointer } = useThree();
  useFrame(({ camera }) => {
    const p = pv(progress);
    camera.position.set(
      pointer.x * 0.45,
      2.2 - p * 0.4 + pointer.y * 0.35,
      9 - p * 0.7
    );
    camera.lookAt(0, 0.9, 0);
  });
  return null;
}

function Backdrop({ progress }: { progress: MotionValue<number> | number }) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[6, 8, 4]} intensity={1.6} />
      {/* Neon accent point lights */}
      <pointLight position={[5, 3, -1]} intensity={2.2} color={lime} distance={8} />
      <pointLight position={[-5, 2, -2]} intensity={1.8} color="#ffc900" distance={8} />

      <Suspense fallback={null}>
        {/* Multifaceted geometric finance nodes */}
        <CrystalNode position={[5.4, 3.2, -1.8]} scale={0.85} speed={1.1} shape="icosahedron" edgeColor={lime} />
        <CrystalNode position={[6.3, 1.2, -2.8]} scale={0.58} speed={1.4} shape="octahedron" edgeColor="#ffc900" />
        <CrystalNode position={[-5.6, 2.7, -2.2]} scale={0.72} speed={1.0} shape="dodecahedron" edgeColor={lime} />
        <CrystalNode position={[-4.2, -0.6, -1.5]} scale={0.48} speed={1.3} shape="octahedron" edgeColor="#00ff66" />

        {/* Faint ledger grid floor */}
        <gridHelper
          args={[60, 60, "#d8d8ce", "#e8e6dc"]}
          material-transparent
          material-opacity={0.6}
        />

        {/* Dual-layer particle nebula */}
        <Sparkles
          count={60}
          scale={[18, 8, 9]}
          size={2.4}
          speed={0.35}
          color={lime}
          opacity={0.6}
          position={[0, 2.4, -2]}
        />
        <Sparkles
          count={35}
          scale={[16, 7, 7]}
          size={2.0}
          speed={0.25}
          color="#ffc900"
          opacity={0.45}
          position={[1, 2.0, -1.5]}
        />
      </Suspense>
      <CameraDrift progress={progress} />
    </>
  );
}

/* ── Mini 3D bar chart (inside the dashboard card) ───────── */

const BAR_H = [0.5, 0.75, 0.6, 1.0, 0.8, 1.25, 1.05, 1.6];
const LAST = BAR_H.length - 1;
const barColor = (i: number) =>
  i === LAST ? lime : i === 4 ? "#ffc900" : "#ffffff";

function MiniBars({ progress }: { progress: MotionValue<number> | number }) {
  const groups = useRef<(THREE.Group | null)[]>([]);

  useFrame(({ clock }) => {
    const p = pv(progress);
    BAR_H.forEach((h, i) => {
      const g = groups.current[i];
      if (!g) return;
      // each bar grows in sequence as scroll progresses (visible stubs at rest)
      const t = THREE.MathUtils.clamp(p * 1.7 - i * 0.09, 0.22, 1);
      g.scale.y += (h * t - g.scale.y) * 0.14;
      g.position.y = g.scale.y / 2;
    });
    // final bar pulses once the chart is complete
    const last = groups.current[LAST];
    if (last) {
      const k = THREE.MathUtils.clamp((p - 0.85) / 0.15, 0, 1);
      const pulse = 1 + Math.sin(clock.elapsedTime * 5) * 0.06 * k;
      last.scale.x = pulse;
      last.scale.z = pulse;
    }
  });

  return (
    <group position={[-1.47, 0, 0]}>
      {BAR_H.map((_, i) => (
        <group
          key={i}
          ref={(el) => {
            groups.current[i] = el;
          }}
          position={[i * 0.48, 0, 0]}
          scale={[1, 0.02, 1]}
        >
          <RoundedBox args={[0.38, 1, 0.38]} radius={0.06} smoothness={3}>
            <meshStandardMaterial
              color={barColor(i)}
              roughness={0.35}
              metalness={0.1}
              emissive={i === LAST ? lime : "#000000"}
              emissiveIntensity={i === LAST ? 0.35 : 0}
            />
            <Edges color="#0e0e0e" threshold={15} />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}

function MiniCam() {
  useFrame(({ camera }) => camera.lookAt(0, 0.6, 0));
  return null;
}

function MiniScene({ progress }: { progress: MotionValue<number> | number }) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} />
      <Suspense fallback={null}>
        <MiniBars progress={progress} />
        <gridHelper
          args={[8, 8, "#e4e2d8", "#eeece4"]}
          material-transparent
          material-opacity={0.35}
        />
      </Suspense>
      <MiniCam />
    </>
  );
}

/* ── Dashboard card (chart + counter) ────────────────────── */

const CSS_H = [10, 16, 13, 22, 18, 28, 22, 36];
const cssColor = (i: number) =>
  i === LAST ? "bg-[#c8f603]" : i === 4 ? "bg-[#ffc900]" : "bg-white";

function ChartCard({
  progress,
  counter,
  reduced,
}: {
  progress: MotionValue<number>;
  counter: MotionValue<string> | string;
  reduced: boolean;
}) {
  const barScale = useTransform(progress, [0, 1], [0.3, 1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[360px] overflow-hidden rounded-[16px_16px_16px_4px] border border-black bg-white shadow-[6px_6px_0_#c8f603]"
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-black bg-[#f4f4f0] px-4 py-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">
          Revenue engine
        </p>
        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest">
          <span
            className="live-blip inline-block h-2 w-2 rounded-full"
            style={{ background: lime }}
          />
          Live
        </p>
      </div>

      {/* 3D chart — desktop (contained in card, cannot touch the headline) */}
      <div className="hidden h-[min(125px,15vh)] border-b border-black bg-[#fafaf6] md:block">
        <Canvas camera={{ position: [0, 1.05, 2.7], fov: 36 }} dpr={[1, 1.5]}>
          <MiniScene progress={reduced ? 1 : progress} />
        </Canvas>
      </div>

      {/* compact 2D bars — mobile keeps the growth, drops the canvas */}
      <div className="border-b border-black bg-[#fafaf6] px-4 pb-2.5 pt-3 md:hidden">
        <div className="flex h-9 items-end gap-1.5">
          {CSS_H.map((h, i) => (
            <motion.div
              key={i}
              className={`w-full rounded-t-[3px] border border-black ${cssColor(i)}`}
              style={{
                height: h,
                scaleY: reduced ? undefined : barScale,
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>
      </div>

      {/* footer: scroll-driven count-up */}
      <div className="flex items-end justify-between px-4 py-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-black">
            Cumulative managed
          </p>
          <motion.p className="text-[26px] font-semibold leading-tight tabular-nums">
            {counter}
          </motion.p>
        </div>
        <span
          className="rounded-md border border-black px-2 py-1 text-xs font-semibold"
          style={{ background: lime }}
        >
          +122% MoM
        </span>
      </div>
    </motion.div>
  );
}

/* ── Finance-symbol ring around "money." ─────────────────── */

function FinanceRing() {
  return (
    <svg
      className="ring-wobble pointer-events-none absolute -bottom-2 -left-6 -right-6 -top-2 h-[calc(100%+1rem)] w-[calc(100%+3rem)]"
      viewBox="0 0 300 110"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <path
          id="money-ring"
          d="M 28 55 a 122 29 0 1 0 244 0 a 122 29 0 1 0 -244 0"
        />
      </defs>
      {/* single lime stroke hugging the symbols */}
      <ellipse cx="150" cy="55" rx="138" ry="37" stroke={lime} strokeWidth="3" />
      {/* the ring IS made of finance / data symbols */}
      <text fontSize="15" fontWeight="600" fill={lime}>
        <textPath href="#money-ring" textLength="515" lengthAdjust="spacing">
          {"$ ₨ € ¥ % ↑ ↓ 1 2 3 4 5 6 7 8 9 0 + − $"}
        </textPath>
      </text>
    </svg>
  );
}

/* ── Drifting edge glyphs (ambience, extreme edges only) ─── */

function FloatGlyph({
  ch,
  className,
  drift,
  progress,
  reduced,
}: {
  ch: string;
  className: string;
  drift: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const y = useTransform(progress, [0, 1], [0, drift]);
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute z-[5] select-none font-semibold ${className}`}
      style={reduced ? undefined : { y }}
    >
      {ch}
    </motion.span>
  );
}

/* ── Hero DOM ────────────────────────────────────────────── */

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const colY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [4, -3]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -10]);

  const rawCount = useTransform(scrollYProgress, [0.05, 1], [0, 4000000]);
  const counterText = useTransform(
    rawCount,
    (v) => "$" + Math.round(v).toLocaleString("en-US")
  );

  return (
    <div
      ref={ref}
      className={`${favorit.variable} relative md:h-[180vh]`}
      style={{ fontFamily: "var(--font-favorit), 'ABC Favorit', Avenir, sans-serif" }}
    >
      <style>{`
        @keyframes ringwobble { 0%, 100% { transform: rotate(-1.2deg); } 50% { transform: rotate(1.2deg); } }
        .ring-wobble { animation: ringwobble 9s ease-in-out infinite; transform-origin: center; }
        @keyframes blip { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        .live-blip { animation: blip 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .ring-wobble, .live-blip { animation: none; } }
      `}</style>

      <div className="relative min-h-[100dvh] bg-[#f4f4f0] md:sticky md:top-0 md:h-screen md:overflow-hidden">
        {/* 3D backdrop — ambience only */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 2.2, 9], fov: 42 }} dpr={[1, 1.75]}>
            <Backdrop progress={reduced ? 1 : scrollYProgress} />
          </Canvas>
        </div>

        {/* drifting finance glyphs at the extreme edges */}
        <FloatGlyph
          ch="$"
          className="left-2 top-[24%] text-5xl text-black/[0.07]"
          drift={-80}
          progress={scrollYProgress}
          reduced={!!reduced}
        />
        <FloatGlyph
          ch="%"
          className="bottom-[16%] left-5 text-4xl text-black/[0.06]"
          drift={-130}
          progress={scrollYProgress}
          reduced={!!reduced}
        />
        <FloatGlyph
          ch="₨"
          className="right-[6%] top-[13%] hidden text-4xl text-black/[0.06] md:block"
          drift={-60}
          progress={scrollYProgress}
          reduced={!!reduced}
        />

        {/* content */}
        <div className="relative z-10 flex min-h-[100dvh] items-center md:h-full">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 pb-12 pt-20 sm:px-8 md:grid-cols-[1.15fr_0.95fr] md:gap-10 md:pb-12 md:pt-14">
            <motion.div
              style={reduced ? undefined : { y: textY, opacity: textOpacity, scale: textScale }}
            >
              <p className="mb-3 text-[15px] md:mb-5">
                <span className="underline decoration-black/30 underline-offset-4">
                  Bookkeeping · Financial reporting · FP&amp;A
                </span>{" "}
                <span className="hidden sm:inline">— remote, for busy owners</span>
              </p>
              <h1 className="text-[clamp(2.15rem,9vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.02em] md:text-[clamp(2.6rem,7vw,5.25rem)]">
                I turn messy data into{" "}
                <span className="relative inline-block whitespace-nowrap">
                  money.
                  <FinanceRing />
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-black sm:mt-7 sm:text-lg">
                I&apos;m Muhammad Nabeel — a remote bookkeeper and accounting
                automation guy. QuickBooks, Xero, Amazon settlements, month-end
                close. Your books stay clean and you get numbers soon enough to
                actually use them.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                <a
                  href="#work"
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-black px-6 text-base font-medium transition hover:-translate-y-px hover:shadow-[4px_4px_0_#000] sm:h-12 sm:px-7"
                  style={{ background: lime }}
                >
                  See the work <span aria-hidden>→</span>
                </a>
                <a
                  href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%27d%20like%20to%20talk%20about%20outsourcing%20my%20bookkeeping"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-black bg-[#25d366] px-6 text-base font-medium transition hover:-translate-y-px hover:shadow-[4px_4px_0_#000] sm:h-12 sm:px-7"
                >
                  <WhatsappLogo size={20} weight="bold" aria-hidden />
                  WhatsApp me
                </a>
                <a
                  href="/Nabeel_Resume_2026.pdf"
                  download
                  className="inline-flex h-11 items-center rounded-md border border-black bg-white px-6 text-base font-medium transition hover:-translate-y-px hover:shadow-[4px_4px_0_#000] sm:h-12 sm:px-7"
                >
                  Download resume
                </a>
              </div>
            </motion.div>

            {/* right column: dashboard card + profile card */}
            <motion.div
              className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center md:flex-col md:items-end md:gap-5"
              style={reduced ? undefined : { y: colY }}
            >
              {/* profile — visible everywhere, never hidden, beautifully framed */}
              <motion.div
                className="order-1 relative w-full max-w-[220px] sm:max-w-[240px] md:order-2 md:max-w-[min(240px,27vh)] lg:max-w-[265px]"
                style={reduced ? undefined : { rotateX: imgRotate }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] border-2 border-black bg-white shadow-[7px_7px_0_#c8f603]">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Muhammad Nabeel — Finance Engineer"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 220px, (max-width: 768px) 240px, 265px"
                  />
                  {/* Subtle name badge banner at the base of the photo */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-6 text-white">
                    <p className="text-sm font-bold leading-tight">Muhammad Nabeel</p>
                    <p className="text-[11px] font-medium text-[#c8f603]">Finance &amp; Automation</p>
                  </div>
                </div>
                <motion.div
                  className="absolute -right-2.5 -top-3 rotate-3 rounded-md border-2 border-black bg-white px-2.5 py-1 text-xs font-semibold shadow-[3px_3px_0_#000] sm:text-sm"
                  style={reduced ? undefined : { y: badgeY }}
                >
                  <span style={{ background: lime }} className="rounded px-1.5 py-0.5">
                    $4M+
                  </span>{" "}
                  managed
                </motion.div>
              </motion.div>

              <div className="order-2 w-full max-w-[340px] sm:max-w-[320px] md:order-1 md:max-w-[360px]">
                <ChartCard
                  progress={scrollYProgress}
                  counter={reduced ? "$4,000,000+" : counterText}
                  reduced={!!reduced}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

