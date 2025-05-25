import Hero from "@/components/Hero"
import FeaturedBeats from "@/components/FeaturedBeats"
import About from "@/components/About"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedBeats />
      <About />
      <Footer />
    </main>
  )
}
