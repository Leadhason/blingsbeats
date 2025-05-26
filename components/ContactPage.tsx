"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Instagram, Twitter, Youtube, Music } from "lucide-react"
import Link from "next/link"
import { Play} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    projectType: "",
    budget: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      projectType: "",
      budget: "",
      message: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["hello@th3rdstream.com", "business@th3rdstream.com"],
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Studio Location",
      details: ["Los Angeles, CA", "Available for remote work"],
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Mon - Fri: 9AM - 8PM PST", "Weekends: By appointment"],
    },
  ]

  const socialLinks = [
    { icon: <Instagram className="w-6 h-6" />, name: "Instagram", handle: "@th3rdstream" },
    { icon: <Twitter className="w-6 h-6" />, name: "Twitter", handle: "@th3rdstream" },
    { icon: <Youtube className="w-6 h-6" />, name: "YouTube", handle: "Th3rdstream" },
    { icon: <Music className="w-6 h-6" />, name: "Spotify", handle: "Th3rdstream" },
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
                <Link href="/about" className="text-gray-300 hover:text-orange-500 transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-orange-500">
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
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30 mb-6">GET IN TOUCH</Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              LET'S CREATE
              <br />
              <span className="text-orange-500">TOGETHER</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Ready to take your music to the next level? Whether you need a custom beat, want to collaborate, or have
              questions about our services, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white focus:border-orange-500"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white focus:border-orange-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <Input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white focus:border-orange-500"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Type</label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => handleInputChange("projectType", value)}
                    >
                      <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="beat-purchase">Beat Purchase</SelectItem>
                        <SelectItem value="custom-beat">Custom Beat</SelectItem>
                        <SelectItem value="mixing-mastering">Mixing & Mastering</SelectItem>
                        <SelectItem value="collaboration">Collaboration</SelectItem>
                        <SelectItem value="licensing">Licensing Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="under-500">Under $500</SelectItem>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                        <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                        <SelectItem value="5000-plus">$5,000+</SelectItem>
                        <SelectItem value="discuss">Let's discuss</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white focus:border-orange-500 min-h-[120px]"
                    placeholder="Tell us about your project, vision, or any questions you have..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-orange-500 mt-1">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-300">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Follow Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-orange-500/50 transition-all duration-300"
                    >
                      <div className="text-orange-500">{social.icon}</div>
                      <div>
                        <div className="font-medium">{social.name}</div>
                        <div className="text-sm text-gray-400">{social.handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-12 p-6 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                <h3 className="font-bold text-orange-500 mb-2">Quick Response Guarantee</h3>
                <p className="text-gray-300">
                  We typically respond to all inquiries within 24 hours during business days. For urgent matters, feel
                  free to call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Quick answers to common questions</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-orange-500 mb-2">How long does a custom beat take?</h3>
                <p className="text-gray-300">
                  Custom beats typically take 3-7 business days, depending on complexity and our current workload.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-orange-500 mb-2">Do you offer revisions?</h3>
                <p className="text-gray-300">
                  Yes! We include up to 3 revisions with every custom beat to ensure you're completely satisfied.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-orange-500 mb-2">What file formats do you provide?</h3>
                <p className="text-gray-300">
                  We provide high-quality WAV files (24-bit/44.1kHz) and MP3s. Stems are available for an additional
                  fee.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-orange-500 mb-2">Can I use your beats commercially?</h3>
                <p className="text-gray-300">
                  Yes! All our beats come with commercial licenses. Exclusive rights are available for premium beats.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-orange-500 mb-2">Do you work with new artists?</h3>
                <p className="text-gray-300">
                  We love working with artists at all levels and offer flexible pricing for emerging talent.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-orange-500 mb-2">What's your refund policy?</h3>
                <p className="text-gray-300">
                  We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, we'll make it right.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
