"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Music, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Newsletter signup:", { name, email })
    setName("")
    setEmail("")
  }

  return (
    <footer className="bg-black text-white py-16 lg:py-12">
      <div className="container mx-auto px-6">
        {/* Newsletter Signup */}
        <div className="text-center mb-8">
          <h3 className="text-2xl lg:text-3xl font-bold tracking-wider mb-4">NEWSLETTER</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Sign-up for the BlingsBeats mailing list to be notified of new releases and updates.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border-gray-600 P-5 text-white placeholder-gray-400 focus:border-orange-500"
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border-gray-600 P-5 text-white placeholder-gray-400 focus:border-orange-500"
              required
            />
            <Button type="submit" className="bg-gray-600 hover:bg-orange-500 text-white px-8 py-2 whitespace-nowrap">
              SIGN-UP
            </Button>
          </form>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 lg:gap-8 mb-8">
          {["About","Shop", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-orange-500 transition-colors text-lg"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="#"
            className="w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors"
          >
            <Music className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors"
          >
            <Youtube className="w-5 h-5" />
          </a>
        </div>

        {/* Logo */}
        <div className="text-center">
          <div className="text-4xl font-bold text-white">BB</div>
        </div>
      </div>
    </footer>
  )
}
