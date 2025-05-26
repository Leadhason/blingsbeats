export interface Beat {
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

export const sampleBeats: Beat[] = [
  {
    id: "1",
    title: "Midnight Vibes",
    artist: "BlingsBeats",
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
    artist: "BilingsBeats",
    genre: "Electronic",
    bpm: 128,
    key: "F Major",
    price: 39.99,
    image: "/Cover-images/image-5.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 210,
    tags: ["Synth", "Ambient", "Chill"],
    isExclusive: true,
    description:
      "Ethereal electronic soundscape with lush synths and ambient textures. Perfect for creating dreamy, atmospheric tracks with a modern electronic edge.",
    releaseDate: "2024-01-20",
  },
  {
    id: "3",
    title: "Street Symphony",
    artist: "BlingsBeats",
    genre: "Hip Hop",
    bpm: 85,
    key: "G Minor",
    price: 24.99,
    image: "/Cover-images/image-6.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 195,
    tags: ["Boom Bap", "Classic", "Vinyl"],
    isExclusive: false,
    description:
      "Classic boom bap beat with vinyl crackle and old-school hip hop vibes. Features authentic drum breaks and nostalgic samples that transport you back to the golden era of hip hop.",
    releaseDate: "2024-01-10",
  },
  {
    id: "4",
    title: "Future Bass Drop",
    artist: "BlingsBeats",
    genre: "EDM",
    bpm: 150,
    key: "D Major",
    price: 34.99,
    image: "/Cover-images/image-7.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 220,
    tags: ["Future Bass", "Drop", "Energy"],
    isExclusive: false,
    description:
      "High-energy future bass track with massive drops and euphoric melodies. Built for festival crowds and dance floors with soaring synths and crushing bass.",
    releaseDate: "2024-01-25",
  },
  {
    id: "5",
    title: "Lo-Fi Study",
    artist: "BlingsBeats",
    genre: "Lo-Fi",
    bpm: 70,
    key: "A Minor",
    price: 19.99,
    image: "/Cover-images/image-8.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 240,
    tags: ["Chill", "Study", "Relaxing"],
    isExclusive: false,
    description:
      "Relaxing lo-fi beat perfect for studying, working, or chilling out. Features warm analog textures, gentle percussion, and soothing melodies that create the perfect ambient backdrop.",
    releaseDate: "2024-01-05",
  },
  {
    id: "6",
    title: "Trap Anthem",
    artist: "BlingsBeats",
    genre: "Trap",
    bpm: 145,
    key: "B Minor",
    price: 44.99,
    image: "/Cover-images/image-9.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 200,
    tags: ["Hard", "808", "Anthem"],
    isExclusive: true,
    description:
      "Hard-hitting trap anthem with thunderous 808s and aggressive energy. Designed for high-impact performances with crushing low-end and razor-sharp hi-hats.",
    releaseDate: "2024-01-30",
  },
  // Additional beats for pagination
  {
    id: "7",
    title: "Cosmic Journey",
    artist: "BlingsBeats",
    genre: "Ambient",
    bpm: 90,
    key: "E Minor",
    price: 27.99,
    image: "/Cover-images/image-4.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 300,
    tags: ["Space", "Atmospheric", "Cinematic"],
    isExclusive: false,
    description:
      "Expansive ambient track that takes listeners on a cosmic journey through space. Features ethereal pads, distant textures, and evolving soundscapes perfect for meditation or film scoring.",
    releaseDate: "2024-02-01",
  },
  {
    id: "8",
    title: "Urban Pulse",
    artist: "BlingsBeats",
    genre: "Hip Hop",
    bpm: 95,
    key: "F# Minor",
    price: 32.99,
    image: "/Cover-images/image-5.jpeg",
    audioUrl: "/placeholder-audio.mp3",
    duration: 185,
    tags: ["Urban", "Modern", "Groove"],
    isExclusive: true,
    description:
      "Modern hip hop beat with urban influences and infectious groove. Combines contemporary production techniques with classic hip hop elements for a fresh, street-ready sound.",
    releaseDate: "2024-02-05",
  },
]

// Function to get a beat by ID
export function getBeatById(id: string): Beat | undefined {
  return sampleBeats.find((beat) => beat.id === id)
}

// Function to get all beats
export function getAllBeats(): Beat[] {
  return sampleBeats
}
