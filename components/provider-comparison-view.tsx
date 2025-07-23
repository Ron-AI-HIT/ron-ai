"use client"

import { motion } from "framer-motion"
import { X, MapPin, Phone, Star, Navigation, BrainCircuit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { ProviderSearchResult } from "@/lib/types"

interface ProviderComparisonViewProps {
  providers: ProviderSearchResult[]
  onStartDeepResearch: () => void
  onViewDetails: (provider: ProviderSearchResult) => void
}

export function ProviderComparisonView({ providers, onStartDeepResearch, onViewDetails }: ProviderComparisonViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Head-to-Head Comparison</h2>
          <p className="text-muted-foreground text-lg">
            Compare your selected providers side-by-side to make an informed decision.
          </p>
        </div>
        <Button
          onClick={onStartDeepResearch}
          className="bg-primary hover:bg-primary/90 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-200"
        >
          <BrainCircuit className="w-5 h-5 mr-2" />
          Start Deep Research
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {providers.map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-6 text-center relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>

                <div className="flex justify-center mb-4">
                  <img
                    src={provider.imageUrl || "/placeholder.svg"}
                    alt={provider.name}
                    className="w-24 h-24 rounded-2xl border-4 border-background shadow-md"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-xl leading-tight">{provider.name}</h3>
                  <p className="text-primary font-medium">{provider.specialty}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{provider.rating}</span>
                    <span className="text-muted-foreground text-sm">({provider.reviews})</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* AI Summary */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">AI Summary</h4>
                  <p className="text-sm leading-relaxed line-clamp-4">{provider.aiSummary}</p>
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Location</h4>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm">{provider.location}</p>
                      <Badge variant="outline" className="text-xs rounded-full">
                        {provider.distance}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Contact</h4>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">(801) 509-5722</span>
                  </div>
                </div>

                {/* Insurance */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Insurance</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.insurance.slice(0, 3).map((ins) => (
                      <Badge key={ins} variant="secondary" className="text-xs rounded-full">
                        {ins}
                      </Badge>
                    ))}
                    {provider.insurance.length > 3 && (
                      <Badge variant="secondary" className="text-xs rounded-full">
                        +{provider.insurance.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t border-border/50">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-xl border-border/50 hover:border-primary/50 hover:bg-primary/5 bg-transparent"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button
                    onClick={() => onViewDetails(provider)}
                    className="w-full bg-primary hover:bg-primary/90 rounded-xl"
                  >
                    View Full Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
