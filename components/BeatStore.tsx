"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, ShoppingCart, Search, Filter, Heart, Volume2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
    description: "A dark and atmospheric trap beat with melodic elements perfect for late-night sessions.",
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
  // Additional beats for pagination
  {
    id: "7",
    title: "Cosmic Journey",
    artist: "Th3rdstream",
    genre: "Ambient",
    bpm: 90,
    key: "E Minor",
    price: 27.99,
    image: "/Cover-images/image-1.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 300,
    tags: ["Space", "Atmospheric", "Cinematic"],
    isExclusive: false,
    description: "Expansive ambient track that takes listeners on a cosmic journey through space.",
    releaseDate: "2024-02-01",
  },
  {
    id: "8",
    title: "Urban Pulse",
    artist: "Th3rdstream",
    genre: "Hip Hop",
    bpm: 95,
    key: "F# Minor",
    price: 32.99,
    image: "/Cover-images/image-2.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 185,
    tags: ["Urban", "Modern", "Groove"],
    isExclusive: false,
    description: "Modern hip hop beat with urban influences and infectious groove.",
    releaseDate: "2024-02-05",
  },
]

const BEATS_PER_PAGE = 6

export default function BeatStore() {
  const [beats, setBeats] = useState(sampleBeats)
  const [filteredBeats, setFilteredBeats] = useState(sampleBeats)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentBeat, setCurrentBeat] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState([0.7])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [cart, setCart] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  // Calculate pagination
  const totalPages = Math.ceil(filteredBeats.length / BEATS_PER_PAGE)
  const startIndex = (currentPage - 1) * BEATS_PER_PAGE
  const endIndex = startIndex + BEATS_PER_PAGE
  const currentBeats = filteredBeats.slice(startIndex, endIndex)

  // Audio player effects
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
  }, [currentBeat])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0]
    }
  }, [volume])

  // Filter effects
  useEffect(() => {
    let filtered = beats

    if (searchTerm) {
      filtered = filtered.filter(
        (beat) =>
          beat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          beat.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedGenre !== "all") {
      filtered = filtered.filter((beat) => beat.genre === selectedGenre)
    }

    setFilteredBeats(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [searchTerm, selectedGenre, beats])

  const playBeat = (beatId: string) => {
    const audio = audioRef.current
    if (!audio) return

    if (currentBeat === beatId && isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      if (currentBeat !== beatId) {
        setCurrentBeat(beatId)
        setCurrentTime(0)
      }
      audio.play()
      setIsPlaying(true)
    }
  }

  const addToCart = (beatId: string) => {
    if (!cart.includes(beatId)) {
      setCart([...cart, beatId])
    }
  }

  const toggleFavorite = (beatId: string) => {
    if (favorites.includes(beatId)) {
      setFavorites(favorites.filter((id) => id !== beatId))
    } else {
      setFavorites([...favorites, beatId])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentBeatData = beats.find((beat) => beat.id === currentBeat)
  const genres = ["all", ...Array.from(new Set(beats.map((beat) => beat.genre)))]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold">
                <span className="text-white">BB</span>
              </h1>
              <nav className="hidden md:flex gap-6">
                <a href="/" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Home
                </a>
                <a href="/store" className="text-orange-500">
                  Store
                </a>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Licenses
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="relative border-black text-black hover:border-orange-500">
                <Heart className="w-4 h-4 mr-2" />
                Favorites
                {favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
              <Button className="relative bg-orange-500 hover:bg-orange-600">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-white text-black text-xs">{cart.length}</Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search beats, tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                />
              </div>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-700">
                      {genre === "all" ? "All Genres" : genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-gray-400 text-sm">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredBeats.length)} of {filteredBeats.length} beats
            </div>
          </div>
        </div>
      </section>

      {/* Beat Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentBeats.map((beat) => (
              <div key={beat.id} className="group relative">
                {/* Main Card Container */}
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-900 border border-gray-800 hover:border-orange-500/50 transition-all duration-300">
                  {/* Background Image */}
                  <img
                    src={beat.image || "/placeholder.svg"}
                    alt={beat.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => playBeat(beat.id)}
                      className="w-16 h-16 bg-orange-500/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors shadow-lg"
                    >
                      {currentBeat === beat.id && isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {beat.isExclusive && (
                      <Badge className="bg-orange-500 text-white text-xs font-bold">EXCLUSIVE</Badge>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(beat.id)}
                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(beat.id) ? "fill-orange-500 text-orange-500" : "text-white"
                      }`}
                    />
                  </button>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Title */}
                    <Link href={`/store/beat/${beat.id}`}>
                      <h3 className="text-xl font-bold text-white mb-1 hover:text-orange-500 transition-colors cursor-pointer uppercase tracking-wide">
                        {beat.title}
                      </h3>
                    </Link>

                    {/* Artist */}
                    <p className="text-gray-300 text-sm mb-3 uppercase tracking-wider">{beat.artist}</p>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">${beat.price}</span>
                      <Button
                        onClick={() => addToCart(beat.id)}
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-medium"
                        disabled={cart.includes(beat.id)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {cart.includes(beat.id) ? "In Cart" : "Add to Cart"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredBeats.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No beats found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button
                variant="outline"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-black text-black disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => goToPage(page)}
                    className={
                      currentPage === page
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "border-gray-600 text-black hover:border-orange-500"
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-gray-600 text-black hover:border-black disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Audio Player */}
      {currentBeat && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-800 p-4 z-50">
          <div className="container mx-auto flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-white">BB</div>
              <div>
                <p className="text-white font-medium">{currentBeatData?.title}</p>
                <p className="text-gray-400 text-sm">{currentBeatData?.artist}</p>
              </div>
            </div>

            <div className="flex-1 flex items-center gap-4">
              <button
                onClick={() => currentBeat && playBeat(currentBeat)}
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
              </button>

              <div className="flex-1 flex items-center gap-2">
                <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>
                <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 transition-all duration-100"
                    style={{
                      width: currentBeatData ? `${(currentTime / currentBeatData.duration) * 100}%` : "0%",
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-10">
                  {currentBeatData ? formatTime(currentBeatData.duration) : "0:00"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-gray-400" />
              <div className="w-20">
                <Slider value={volume} onValueChange={setVolume} max={1} step={0.1} className="w-full" />
              </div>
            </div>
          </div>

          <audio ref={audioRef} src={currentBeatData?.audioUrl} />
        </div>
      )}
    </div>
  )
}
