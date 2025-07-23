"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { List, MapPin, Heart, Check, Star, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ProviderMap } from "@/components/provider-map"
import type { ProviderSearchResult } from "@/lib/types"

interface ProviderResultsViewProps {
  results: ProviderSearchResult[]
  onCompare: (providers: ProviderSearchResult[]) => void
  onViewDetails: (provider: ProviderSearchResult) => void
}

export function ProviderResultsView({ results, onCompare, onViewDetails }: ProviderResultsViewProps) {
  const [selectedProviders, setSelectedProviders] = useState<ProviderSearchResult[]>([])

  const handleSelectProvider = (provider: ProviderSearchResult) => {
    setSelectedProviders((prev) => {
      const isSelected = prev.some((p) => p.id === provider.id)
      if (isSelected) {
        return prev.filter((p) => p.id !== provider.id)
      }
      return [...prev, provider]
    })
  }

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
          <Filter className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No providers found yet</h3>
        <p className="text-muted-foreground">Please use the prompt builder to search for providers.</p>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Provider Search Results</h2>
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            {results.length} providers found
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-border/50 hover:border-primary/50 bg-transparent"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button
            onClick={() => onCompare(selectedProviders)}
            disabled={selectedProviders.length < 2}
            className="bg-primary hover:bg-primary/90 rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-200"
          >
            Compare {selectedProviders.length > 0 ? selectedProviders.length : ""} Provider
            {selectedProviders.length !== 1 ? "s" : ""}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-fit grid-cols-2 rounded-xl bg-muted/50 p-1">
          <TabsTrigger
            value="list"
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <List className="w-4 h-4 mr-2" />
            List View
          </TabsTrigger>
          <TabsTrigger
            value="map"
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Map View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {results.map((provider, index) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                isSelected={selectedProviders.some((p) => p.id === provider.id)}
                onSelect={handleSelectProvider}
                onViewDetails={onViewDetails}
                index={index}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map" className="mt-8">
          <div className="h-[600px] rounded-2xl overflow-hidden border border-border/50 shadow-lg">
            <ProviderMap providers={results} onProviderSelect={() => {}} />
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

function ProviderCard({
  provider,
  isSelected,
  onSelect,
  onViewDetails,
  index,
}: {
  provider: ProviderSearchResult
  isSelected: boolean
  onSelect: (provider: ProviderSearchResult) => void
  onViewDetails: (provider: ProviderSearchResult) => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      <Card
        className={`group relative bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 ${
          isSelected ? "ring-2 ring-primary/50 border-primary/50" : "hover:border-primary/30"
        }`}
      >
        <div className="relative p-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src={provider.imageUrl || "/placeholder.svg"}
                alt={provider.name}
                className="w-20 h-20 rounded-2xl border-4 border-background shadow-md group-hover:shadow-lg transition-shadow duration-300"
              />
              <div className="absolute -top-1 -right-1 flex gap-1">
                <button
                  onClick={() => onSelect(provider)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "bg-background/80 backdrop-blur-sm hover:bg-primary/10 hover:text-primary border border-border/50"
                  }`}
                >
                  <Check className="w-4 h-4" />
                </button>
                <button className="w-7 h-7 rounded-full bg-background/80 backdrop-blur-sm hover:bg-red-50 hover:text-red-500 border border-border/50 flex items-center justify-center transition-all duration-200">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-center space-y-3">
            <div>
              <h3 className="font-bold text-lg leading-tight line-clamp-2">{provider.name}</h3>
              <p className="text-primary text-sm font-medium">{provider.specialty}</p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{provider.rating}</span>
              <span className="text-muted-foreground text-sm">({provider.reviews})</span>
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground text-xs line-clamp-2">{provider.location}</p>
              <Badge variant="outline" className="text-xs rounded-full">
                {provider.distance}
              </Badge>
            </div>
          </div>
        </div>

        <CardContent className="p-6 pt-0">
          <Button
            variant="ghost"
            className="w-full rounded-xl hover:bg-primary/5 hover:text-primary transition-colors duration-200"
            onClick={() => onViewDetails(provider)}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
