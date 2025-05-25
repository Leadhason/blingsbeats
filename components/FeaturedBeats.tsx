"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"

interface Beat {
  id: string
  title: string
  image: string
  audioUrl: string
  duration: number
}

const featuredBeats: Beat[] = [
  {
    id: "1",
    title: "LOVE & BLOOD",
    image: "/Cover-images/image-1.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 180,
  },
  {
    id: "2",
    title: "SHERWOOD OST",
    image: "/Cover-images/image-2.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 210,
  },
  {
    id: "3",
    title: "LEBRON JAMES: BEST SHOT",
    image: "/Cover-images/image-3.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 195,
  },
]

export default function FeaturedBeats() {
  const [currentBeat, setCurrentBeat] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState([0.7])
  const audioRef = useRef<HTMLAudioElement>(null)

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const currentBeatData = featuredBeats.find((beat) => beat.id === currentBeat)

  return (
    <section className="bg-black text-white py-16 lg:py-24">
      <div className="container mx-auto px-6 p-6 grid grid-cols-[1fr_2fr] gap-4">
        <div className="mb-8 flex justify-center">
          <div className="text-left">
            <p className="text-orange-500 text-sm tracking-wider mb-3">FEATURED TRACKS</p>
            <h2 className="text-6xl lg:text-8xl font-bold mb-8">MUSIC</h2>
            <p className="text-gray-300 text-lg max-w-md mb-8">
              Hear the latest music releases from BLINGSBEATS, including our latest album, Love & Blood.
            </p>
            <Button
              variant="outline"
              className="border-white  text-white bg-black hover:bg-orange-500 hover:border-orange-500 px-8 py-3 justify-center"
            >
              ALL MUSIC
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBeats.map((beat) => (
            <div key={beat.id} className="group cursor-pointer" onClick={() => playBeat(beat.id)}>
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <Image
                  src={beat.image || "/placeholder.svg"}
                  alt={beat.title}
                  width={300}
                  height={300}
                  className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                    {currentBeat === beat.id && isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold tracking-wider">{beat.title}</h3>
            </div>
          ))}
        </div>

        {/* Audio Player */}
        {currentBeat && (
          <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-800 p-4">
            <div className="container mx-auto flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-white">3S</div>
                <div>
                  <p className="text-white font-medium">{currentBeatData?.title}</p>
                  <p className="text-gray-400 text-sm">Th3rdstream</p>
                </div>
              </div>

              <div className="flex-1 flex items-center gap-4">
                <button
                  onClick={() => currentBeat && playBeat(currentBeat)}
                  className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  )}
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
    </section>
  )
}
