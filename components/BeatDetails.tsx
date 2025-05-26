"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, ShoppingCart, Heart, Download, ArrowLeft, Volume2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { getBeatById, type Beat } from "@/lib/beats-data"

interface BeatDetailsProps {
  beatId: string
}

export default async function BeatDetails({ beatId }: BeatDetailsProps) {
  const [beat, setBeat] = useState<Beat | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState([0.7])
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Get the beat by ID from the centralized data
    const foundBeat = getBeatById(beatId)
    setBeat(foundBeat || null)
  }, [beatId])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [beat])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0]
    }
  }, [volume])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleAddToCart = () => {
    setIsInCart(true)
    // Add to cart logic here
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // Add to favorites logic here
  }

  if (!beat) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Beat not found</h1>
          <Link href="/store">
            <Button className="bg-orange-500 hover:bg-orange-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Store
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/store">
              <Button variant="link" className="text-white hover:orange-500">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Store
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image and Player */}
          <div className="space-y-6">
            {/* Beat Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900">
              <img src={beat.image || "/placeholder.svg"} alt={beat.title} className="w-full h-full object-cover" />
              {beat.isExclusive && (
                <Badge className="absolute top-6 left-6 bg-orange-500 text-white text-sm font-bold">EXCLUSIVE</Badge>
              )}
            </div>

            {/* Audio Player */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
                </button>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{beat.title}</h4>
                  <p className="text-gray-400">{beat.artist}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>
                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 transition-all duration-100"
                    style={{
                      width: `${(currentTime / beat.duration) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-10">{formatTime(beat.duration)}</span>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <Slider value={volume} onValueChange={setVolume} max={1} step={0.1} className="w-full" />
                </div>
              </div>

              <audio ref={audioRef} src={beat.audioUrl} />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {/* Title and Price */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2 uppercase tracking-wide">{beat.title}</h1>
              <p className="text-xl text-gray-400 mb-4 uppercase tracking-wider">by {beat.artist}</p>
              <div className="text-4xl font-bold text-orange-500">${beat.price}</div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">{beat.description}</p>
            </div>

            {/* Beat Details */}
            <div>
              <h3 className="text-xl font-bold mb-4">Beat Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                  <div className="text-2xl font-bold text-white">{beat.bpm}</div>
                  <div className="text-gray-400">BPM</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                  <div className="text-2xl font-bold text-white">{beat.key}</div>
                  <div className="text-gray-400">Key</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                  <div className="text-2xl font-bold text-white">{beat.genre}</div>
                  <div className="text-gray-400">Genre</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                  <div className="text-2xl font-bold text-white">{formatTime(beat.duration)}</div>
                  <div className="text-gray-400">Duration</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-xl font-bold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {beat.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-lg py-4"
                  disabled={isInCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isInCart ? "Added to Cart" : "Add to Cart"}
                </Button>
                    <div className="flex gap-3 justify-center">
                    <Button
                    onClick={toggleFavorite}
                    variant="outline"
                    className="border-gray-600 bg-transparent text-white hover:text-black py-4"
                    >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-orange-500 text-orange-500" : ""}`} />
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-white py-4 bg-transparent">
                    <Share2 className="w-4 h-4" />
                    </Button>
                </div>
              </div>
            </div>

            {/* License Info */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-3">License Information</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Commercial use allowed</li>
                <li>• Credit required: {beat.artist}</li>
                <li>• Unlimited streams and downloads</li>
                <li>• High-quality WAV + MP3 files included</li>
                <li>• Stems available for additional fee</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
