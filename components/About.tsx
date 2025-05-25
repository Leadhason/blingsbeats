import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function About() {
  return (
    <section className="bg-black text-white py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-orange-500 text-sm tracking-wider mb-4">ABOUT THE PRODUCER</p>
            <h2 className="text-6xl lg:text-8xl font-bold mb-8">
              COLLINS
              <br />
              GYAMFI
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Collins Gyamfi is a music producer known for creating innovative and genre-bending sounds. Our unique
              approach to production combines elements of various musical styles, including electronic, hip-hop, and
              pop, to create a truly eclectic sound.
            </p>
            <Button
              variant="outline"
              className="border-white bg-black rounded-full text-white hover:bg-orange-500 hover:border-orange-500 px-8 py-3"
            >
              ABOUT BLINGSBEATS
            </Button>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4 max-w-lg p-12">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src="/Portrait.jpeg"
                    alt="Producer in urban setting"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src="/portrait-2.jpeg"
                    alt="Producer with colorful background"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Column - Offset down */}
              <div className="space-y-4 mt-8">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src="/portrait-3.jpeg"
                    alt="Producer at night"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src="/portrait-4.jpeg"
                    alt="Producer portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
