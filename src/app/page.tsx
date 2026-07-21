import Nav from "@/components/Nav"
import Hero from "@/components/sections/Hero"
import Summary from "@/components/sections/Summary"
import Experience from "@/components/sections/Experience"
import CaseStudies from "@/components/sections/CaseStudies"
import Skills from "@/components/sections/Skills"
import Contact from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Summary />
        <Experience />
        <CaseStudies />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-border py-6 text-center text-muted text-xs font-mono">
        &copy; {new Date().getFullYear()} Muhammad Nabeel
      </footer>
    </>
  )
}
