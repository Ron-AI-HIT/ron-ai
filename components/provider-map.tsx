"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Navigation, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ProviderSearchResult } from "@/lib/types"

interface ProviderMapProps {
  providers: ProviderSearchResult[]
  onProviderSelect: (provider: ProviderSearchResult) => void
}

export function ProviderMap({ providers, onProviderSelect }: ProviderMapProps) {
  const [selectedProvider, setSelectedProvider] = useState<ProviderSearchResult | null>(null)

  // Mock map implementation - in real app, integrate with Google Maps or similar
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="relative">
        {/* Mock Map Container */}
        <div className="w-full h-96 bg-muted rounded-lg border border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button size="sm" variant="outline" className="bg-background/80 backdrop-blur-sm">
              <Navigation className="w-4 h-4" />
            </Button>
          </div>

          {/* Provider Markers */}
          {providers.slice(0, 10).map((provider, index) => (
            <div
              key={provider.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + (index % 5) * 15}%`,
                top: `${30 + Math.floor(index / 5) * 25}%`,
              }}
              onClick={() => setSelectedProvider(provider)}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                {selectedProvider?.id === provider.id && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
                    <Card className="w-64 shadow-xl">
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{provider.name}</h4>
                        <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm">{provider.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{provider.distance}</span>
                        </div>
                        <Button size="sm" className="w-full mt-3" onClick={() => onProviderSelect(provider)}>
                          Select Provider
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>
                Showing {Math.min(providers.length, 10)} of {providers.length} providers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Provider List Below Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {providers.slice(0, 10).map((provider, index) => (
          <Card
            key={provider.id}
            className={`cursor-pointer transition-colors ${
              selectedProvider?.id === provider.id ? "border-primary bg-primary/5" : ""
            }`}
            onClick={() => setSelectedProvider(provider)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{provider.name}</h4>
                  <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs">{provider.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{provider.distance}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
