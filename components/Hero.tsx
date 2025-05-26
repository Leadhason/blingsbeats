"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
//import { Badge } from "@/components/ui/badge"

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/Hero-5.jpeg" alt="Hero Background" fill className="object-cover grayscale" priority />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 lg:p-8">
        <div className="text-2xl font-bold">
          <span className="text-white">BB</span>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-orange-500 transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Full-screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute inset-y-0 right-0 w-full bg-black/90 backdrop-blur-md animate-in slide-in-from-right duration-500 ease-out">
            {/* Close Button */}
            <div className="absolute top-6 right-6 z-10">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-orange-500 transition-colors p-2"
              >
                <X size={32} />
              </button>
            </div>

            {/* Centered Menu Content */}
            <div className="flex items-center justify-center min-h-screen">
              <nav className="text-center space-y-8">
                {["About", "Store", "Contact"].map((item, index) => (
                  <div key={item} className="overflow-hidden">
                    <a
                      href={`${item.toLowerCase()}`}
                      className="block text-4xl lg:text-6xl font-bold text-white hover:text-orange-500 transition-all duration-300 transform hover:scale-105"
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: isMenuOpen ? "slideInUp 0.6s ease-out forwards" : "none",
                      }}
                    >
                      {item}
                    </a>
                  </div>
                ))}

                {/* Social Links */}
                <div className="flex justify-center gap-6 mt-12 pt-8 border-t border-gray-700">
                  {[
                    { icon: "IG", href: "#instagram" },
                    { icon: "SP", href: "#spotify" },
                    { icon: "TW", href: "#twitter" },
                    { icon: "YT", href: "#youtube" },
                  ].map((social, index) => (
                    <a
                      key={social.icon}
                      href={social.href}
                      className="w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center text-white hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
                      style={{
                        animationDelay: `${(index + 7) * 100}ms`,
                        animation: isMenuOpen ? "slideInUp 0.6s ease-out forwards" : "none",
                      }}
                    >
                      <span className="text-sm font-bold">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        <div className="text-center">
        {/*<Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30 mb-3">WELCOME!</Badge>*/}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-8">
            <span className="text-white">Blings</span>
            <span className="text-orange-500">B</span>
            <span className="text-white">eats</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Innovative music production that bends genres and creates truly eclectic sounds
          </p>
        </div>
      </div>
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
