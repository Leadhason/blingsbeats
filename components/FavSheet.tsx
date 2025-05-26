"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Heart, ShoppingCart, Trash2, Play } from "lucide-react"
import Link from "next/link"
import { getBeatById, type Beat } from "@/lib/beats-data"

interface FavoritesSheetProps {
  isOpen: boolean
  onClose: () => void
}

export default function FavoritesSheet({ isOpen, onClose }: FavoritesSheetProps) {
  const [favoriteBeats, setFavoriteBeats] = useState<Beat[]>([])
  const [cart, setCart] = useState<string[]>([])

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites)
      const beats = favoriteIds.map((id: string) => getBeatById(id)).filter(Boolean)
      setFavoriteBeats(beats)
    }

    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      const cartData = JSON.parse(savedCart)
      setCart(cartData.map((item: any) => item.beatId))
    }
  }, [isOpen])

  const removeFromFavorites = (beatId: string) => {
    const updatedBeats = favoriteBeats.filter((beat) => beat.id !== beatId)
    setFavoriteBeats(updatedBeats)

    // Update localStorage
    const favoriteIds = updatedBeats.map((beat) => beat.id)
    localStorage.setItem("favorites", JSON.stringify(favoriteIds))
  }

  const addToCart = (beatId: string) => {
    const savedCart = localStorage.getItem("cart")
    const cartItems = savedCart ? JSON.parse(savedCart) : []

    // Check if item already exists
    const existingItem = cartItems.find((item: any) => item.beatId === beatId)
    if (!existingItem) {
      cartItems.push({
        beatId,
        quantity: 1,
        licenseType: "basic",
      })
      localStorage.setItem("cart", JSON.stringify(cartItems))
      setCart([...cart, beatId])
    }
  }

  const addAllToCart = () => {
    const savedCart = localStorage.getItem("cart")
    const cartItems = savedCart ? JSON.parse(savedCart) : []

    favoriteBeats.forEach((beat) => {
      const existingItem = cartItems.find((item: any) => item.beatId === beat.id)
      if (!existingItem) {
        cartItems.push({
          beatId: beat.id,
          quantity: 1,
          licenseType: "basic",
        })
      }
    })

    localStorage.setItem("cart", JSON.stringify(cartItems))
    setCart(cartItems.map((item: any) => item.beatId))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Favorites Panel */}
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-black border-l border-gray-800 shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">Favorites</h2>
            {favoriteBeats.length > 0 && <Badge className="bg-orange-500 text-white">{favoriteBeats.length}</Badge>}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Favorites Content */}
        <div className="flex flex-col h-full">
          {favoriteBeats.length === 0 ? (
            /* Empty Favorites */
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No favorites yet</h3>
                <p className="text-gray-400 text-sm mb-4">Save beats you love by clicking the heart icon!</p>
                <Button onClick={onClose} className="bg-orange-500 hover:bg-orange-600">
                  Browse Beats
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Add All to Cart Button */}
              <div className="p-6 border-b border-gray-800">
                <Button onClick={addAllToCart} className="w-full bg-orange-500 hover:bg-orange-600">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add All to Cart
                </Button>
              </div>

              {/* Favorites List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {favoriteBeats.map((beat) => (
                  <div key={beat.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                    <div className="flex gap-3">
                      {/* Beat Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 relative group">
                        <img
                          src={beat.image || "/placeholder.svg"}
                          alt={beat.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Beat Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="min-w-0">
                            <Link href={`/store/beat/${beat.id}`} onClick={onClose}>
                              <h4 className="font-semibold text-white text-sm truncate hover:text-orange-500 transition-colors cursor-pointer">
                                {beat.title}
                              </h4>
                            </Link>
                            <p className="text-gray-400 text-xs">{beat.artist}</p>
                          </div>
                          <button
                            onClick={() => removeFromFavorites(beat.id)}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Beat Info */}
                        <div className="flex gap-2 mb-3">
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs px-2 py-0">
                            {beat.bpm} BPM
                          </Badge>
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs px-2 py-0">
                            {beat.key}
                          </Badge>
                          {beat.isExclusive && (
                            <Badge className="bg-orange-500 text-white text-xs px-2 py-0">EXCLUSIVE</Badge>
                          )}
                        </div>

                        {/* Price and Actions */}
                        <div className="flex justify-between items-center">
                          <span className="text-orange-500 font-semibold text-sm">${beat.price}</span>
                          <div className="flex gap-2">
                            <Link href={`/store/beat/${beat.id}`} onClick={onClose}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-600 text-black hover:border-orange-500 text-xs px-2 py-1"
                              >
                                View
                              </Button>
                            </Link>
                            <Button
                              onClick={() => addToCart(beat.id)}
                              size="sm"
                              className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1"
                              disabled={cart.includes(beat.id)}
                            >
                              {cart.includes(beat.id) ? "In Cart" : "Add"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
