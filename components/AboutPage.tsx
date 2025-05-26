"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Music, Users, Headphones, Mic } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const achievements = [
    { number: "500+", label: "Beats Produced" },
    { number: "100+", label: "Artists Worked With" },
    { number: "50M+", label: "Streams Generated" },
    { number: "10+", label: "Years Experience" },
  ]

  const services = [
    {
      icon: <Music className="w-8 h-8" />,
      title: "Beat Production",
      description: "Custom beats tailored to your style and vision, from trap to lo-fi and everything in between.",
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Mixing & Mastering",
      description: "Professional mixing and mastering services to make your tracks sound radio-ready.",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Sound Design",
      description: "Unique sound design and custom samples to give your music that distinctive edge.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description: "Work directly with our team to create something truly special and unique.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/">
                <h1 className="text-2xl font-bold cursor-pointer">
                  <span className="text-white">BB</span>
                </h1>
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link href="/" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Home
                </Link>
                <Link href="/store" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Store
                </Link>
                <Link href="/about" className="text-orange-500">
                  About
                </Link>
                <Link href="/contact" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
            <Link href="/store">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Play className="w-4 h-4 mr-2" />
                Browse Beats
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30 mb-6">ABOUT BLINGSBEATS</Badge>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                CRAFTING
                <br />
                <span className="text-orange-500">SONIC</span>
                <br />
                EXPERIENCES
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                We are Th3rdstream, a cutting-edge music production collective dedicated to pushing the boundaries of
                sound. Our mission is to create innovative, genre-defying beats that inspire artists and captivate
                audiences worldwide.
              </p>
              <div className="flex gap-4">
                <Link href="/contact">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">Work With Us</Button>
                </Link>
                <Link href="/store">
                  <Button variant="outline" className="border-white bg-transparent text-white hover:border-orange-500 px-8 py-3">
                    Browse Catalog
                  </Button>
                </Link>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src="/about-images/image-a.jpeg"
                    alt="Producer in studio"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src="/about-images/portrait-2.jpeg"
                    alt="Music equipment"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Column - Offset down */}
              <div className="space-y-4 mt-8">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src="/about-images/portrait-3.jpeg"
                    alt="Recording session"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src="/about-images/image-b.jpeg"
                    alt="Producer portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-orange-500 mb-2">{achievement.number}</div>
                <div className="text-gray-400 uppercase tracking-wider text-sm">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">OUR STORY</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Founded in 2014, Th3rdstream emerged from a passion for creating music that transcends traditional
                boundaries. What started as a bedroom studio has evolved into a full-scale production powerhouse.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-orange-500">The Beginning</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Our journey began with a simple belief: music should have no limits. We started experimenting with
                  different genres, blending electronic elements with organic instruments, and creating sounds that had
                  never been heard before.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  From our first viral beat that garnered millions of streams to collaborating with Grammy-nominated
                  artists, we've always stayed true to our core mission of innovation and excellence.
                </p>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-900">
                <img
                  src="/about-images/Hero-3.jpeg"
                  alt="Studio setup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-900 order-2 lg:order-1">
                <img
                  src="/about-images/image-c.jpeg"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold mb-4 text-orange-500">Today & Beyond</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Today, Th3rdstream is recognized as one of the most innovative production teams in the industry. We've
                  worked with artists across every genre, from underground hip-hop to mainstream pop, always bringing
                  our unique sonic signature.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  As we look to the future, we continue to push boundaries, explore new technologies, and create music
                  that moves people. Our beat store represents just one facet of our creative output.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">WHAT WE DO</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Beyond our beat store, we offer a full range of production services to help artists realize their vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="text-orange-500 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              READY TO CREATE
              <br />
              <span className="text-orange-500">SOMETHING AMAZING?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Whether you're looking for the perfect beat or want to collaborate on a custom project, we're here to help
              bring your musical vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="outline" className="border-gray-600 bg-transparent text-white hover:border-orange-500 px-8 py-3">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
