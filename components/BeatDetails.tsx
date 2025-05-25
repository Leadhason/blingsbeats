"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, ShoppingCart, Heart, Download, ArrowLeft, Volume2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface Beat {
  id: string
  title: string
  artist: string
  genre: string
  bpm: number
  key: string
  price: number
  image: string
  audioUrl: string
  duration: number
  tags: string[]
  isExclusive: boolean
  description?: string
  releaseDate?: string
}

// This would normally come from your API/database
const sampleBeats: Beat[] = [
  {
    id: "1",
    title: "Midnight Vibes",
    artist: "Th3rdstream",
    genre: "Hip Hop",
    bpm: 140,
    key: "C Minor",
    price: 29.99,
    image: "/Cover-images/image-4.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 180,
    tags: ["Dark", "Trap", "Melodic"],
    isExclusive: false,
    description:
      "A dark and atmospheric trap beat with melodic elements perfect for late-night sessions. This track features haunting melodies layered over hard-hitting 808s and crisp hi-hats. The composition builds tension throughout, making it ideal for introspective rap verses or moody vocal performances.",
    releaseDate: "2024-01-15",
  },
  {
    id: "2",
    title: "Neon Dreams",
    artist: "Th3rdstream",
    genre: "Electronic",
    bpm: 128,
    key: "F Major",
    price: 39.99,
    image: "/Cover-images/image-5.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 210,
    tags: ["Synth", "Ambient", "Chill"],
    isExclusive: true,
    description: "Ethereal electronic soundscape with lush synths and ambient textures.",
    releaseDate: "2024-01-20",
  },
  {
    id: "3",
    title: "Street Symphony",
    artist: "Th3rdstream",
    genre: "Hip Hop",
    bpm: 85,
    key: "G Minor",
    price: 24.99,
    image: "/Cover-images/image-6.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 195,
    tags: ["Boom Bap", "Classic", "Vinyl"],
    isExclusive: false,
    description: "Classic boom bap beat with vinyl crackle and old-school hip hop vibes.",
    releaseDate: "2024-01-10",
  },
  {
    id: "4",
    title: "Future Bass Drop",
    artist: "Th3rdstream",
    genre: "EDM",
    bpm: 150,
    key: "D Major",
    price: 34.99,
    image: "/Cover-images/image-7.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 220,
    tags: ["Future Bass", "Drop", "Energy"],
    isExclusive: false,
    description: "High-energy future bass track with massive drops and euphoric melodies.",
    releaseDate: "2024-01-25",
  },
  {
    id: "5",
    title: "Lo-Fi Study",
    artist: "Th3rdstream",
    genre: "Lo-Fi",
    bpm: 70,
    key: "A Minor",
    price: 19.99,
    image: "/Cover-images/image-8.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 240,
    tags: ["Chill", "Study", "Relaxing"],
    isExclusive: false,
    description: "Relaxing lo-fi beat perfect for studying, working, or chilling out.",
    releaseDate: "2024-01-05",
  },
  {
    id: "6",
    title: "Trap Anthem",
    artist: "Th3rdstream",
    genre: "Trap",
    bpm: 145,
    key: "B Minor",
    price: 44.99,
    image: "/Cover-images/image-9.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 200,
    tags: ["Hard", "808", "Anthem"],
    isExclusive: true,
    description: "Hard-hitting trap anthem with thunderous 808s and aggressive energy.",
    releaseDate: "2024-01-30",
  },
]

interface BeatDetailsProps {
  beatId: string
}

export default function BeatDetails({ beatId }: BeatDetailsProps) {
  const [beat, setBeat] = useState<Beat | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState([0.7])
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Find the beat by ID (in a real app, this would be an API call)
    const foundBeat = sampleBeats.find((b) => b.id === beatId)
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
              <Button variant="outline" className="border-gray-600 text-white hover:border-orange-500">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Store
              </Button>
            </Link>
            <div className="text-2xl font-bold">
              <span className="text-white">BB</span>
            </div>
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
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
                  disabled={isInCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isInCart ? "Added to Cart" : "Add to Cart"}
                </Button>
                <Button
                  onClick={toggleFavorite}
                  variant="outline"
                  className="border-gray-600 text-white hover:border-orange-500 py-6"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-orange-500 text-orange-500" : "text-white"}`} />
                </Button>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 border-gray-600 text-white hover:border-orange-500">
                  <Download className="w-4 h-4 mr-2" />
                  Download Preview
                </Button>
                <Button variant="outline" className="border-gray-600 text-white hover:border-orange-500">
                  <Share2 className="w-4 h-4" />
                </Button>
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
