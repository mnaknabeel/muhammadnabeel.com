"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"
import { CaretDown, WhatsappLogo } from "phosphor-react"
import PhotoPlaceholder from "@/components/PhotoPlaceholder"

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null)
  const color = new THREE.Color("#c8f603")

  const particles = useMemo(() => {
    const positions = new Float32Array(300 * 3)
    for (let i = 0; i < 300; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#c8f603" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 0, 5]} intensity={2} color="#c8f603" />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={meshRef} scale={2.5}>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <MeshDistortMaterial
            color={color}
            roughness={0.2}
            metalness={0.8}
            distort={0.15}
            speed={2}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#c8f603" transparent opacity={0.4} />
      </points>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={1.5}
      />
    </>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
          <Scene />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 px-6 max-w-5xl mx-auto">
        <div className="shrink-0">
          <PhotoPlaceholder
            name="profile.jpeg"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-2 border-lime/30 shadow-[0_0_30px_#c8f60322]"
          />
        </div>
        <div className="text-center md:text-left">
          <p className="text-lime font-mono text-sm tracking-widest uppercase mb-4">
            Finance Engineer | Bookkeeping &amp; Automation | QuickBooks Pro
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
            Muhammad
            <br />
            Nabeel
          </h1>
          <p className="text-muted text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
            I build financial systems, automate workflows, and turn messy data
            into decisions that drive growth.
          </p>
          <a
            href="https://wa.me/923410224988"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-lime text-ink font-semibold text-xs sm:text-sm hover:shadow-[0_0_30px_#c8f60344] transition-all duration-300"
          >
            <WhatsappLogo size={18} />
            Let's Talk
          </a>
        </div>
      </div>

      <a
        href="#summary"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-lime transition-colors"
      >
        <CaretDown size={24} className="animate-bounce" />
      </a>
    </section>
  )
}
