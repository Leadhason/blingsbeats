"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag } from "lucide-react"
import { getBeatById, type Beat } from "@/lib/beats-data"

interface CartItem {
  beatId: string
  quantity: number
  licenseType: "basic" | "premium" | "exclusive"
}

interface CartSheetProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSheet({ isOpen, onClose }: CartSheetProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [beats, setBeats] = useState<Beat[]>([])

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      setCartItems(parsedCart)

      // Get beat details for cart items
      const beatDetails = parsedCart.map((item: CartItem) => getBeatById(item.beatId)).filter(Boolean)
      setBeats(beatDetails)
    }
  }, [isOpen])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const removeFromCart = (beatId: string) => {
    setCartItems(cartItems.filter((item) => item.beatId !== beatId))
    setBeats(beats.filter((beat) => beat.id !== beatId))
  }

  const updateQuantity = (beatId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(beatId)
      return
    }
    setCartItems(cartItems.map((item) => (item.beatId === beatId ? { ...item, quantity: newQuantity } : item)))
  }

  const updateLicenseType = (beatId: string, licenseType: "basic" | "premium" | "exclusive") => {
    setCartItems(cartItems.map((item) => (item.beatId === beatId ? { ...item, licenseType } : item)))
  }

  const getLicensePrice = (basePrice: number, licenseType: string) => {
    switch (licenseType) {
      case "basic":
        return basePrice
      case "premium":
        return basePrice * 2
      case "exclusive":
        return basePrice * 5
      default:
        return basePrice
    }
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const beat = beats.find((b) => b.id === item.beatId)
      if (!beat) return total
      const licensePrice = getLicensePrice(beat.price, item.licenseType)
      return total + licensePrice * item.quantity
    }, 0)
  }

  const getTax = () => {
    return getSubtotal() * 0.08 // 8% tax
  }

  const getTotal = () => {
    return getSubtotal() + getTax()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Cart Panel */}
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-black border-l border-gray-800 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
            {cartItems.length > 0 && (
              <Badge className="bg-orange-500 text-white">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </Badge>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full max-h-screen">
          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Your cart is empty</h3>
                <p className="text-gray-400 text-sm mb-4">Add some beats to get started!</p>
                <Button onClick={onClose} className="bg-orange-500 hover:bg-orange-600">
                  Browse Beats
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
                {cartItems.map((item) => {
                  const beat = beats.find((b) => b.id === item.beatId)
                  if (!beat) return null

                  const licensePrice = getLicensePrice(beat.price, item.licenseType)

                  return (
                    <div key={item.beatId} className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                      <div className="flex gap-3">
                        {/* Beat Image */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                          <img
                            src={beat.image || "/placeholder.svg"}
                            alt={beat.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Beat Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="min-w-0">
                              <h4 className="font-semibold text-white text-sm truncate">{beat.title}</h4>
                              <p className="text-gray-400 text-xs">{beat.artist}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.beatId)}
                              className="p-1 text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* License Type */}
                          <div className="mb-2">
                            <div className="flex gap-1">
                              {["basic", "premium", "exclusive"].map((license) => (
                                <button
                                  key={license}
                                  onClick={() => updateLicenseType(item.beatId, license as any)}
                                  className={`px-2 py-1 text-xs rounded transition-colors ${
                                    item.licenseType === license
                                      ? "bg-orange-500 text-white"
                                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                  }`}
                                >
                                  {license}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Quantity and Price */}
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.beatId, item.quantity - 1)}
                                className="w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-3 h-3 text-white" />
                              </button>
                              <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.beatId, item.quantity + 1)}
                                className="w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-3 h-3 text-white" />
                              </button>
                            </div>
                            <div className="text-right">
                              <div className="text-orange-500 font-semibold text-sm">
                                ${(licensePrice * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-800 p-6 bg-gray-900/30 flex-shrink-0">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax</span>
                    <span className="text-white">${getTax().toFixed(2)}</span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-orange-500">${getTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
