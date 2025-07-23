"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Star, MapPin, Clock, Shield, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCareTeam } from "@/hooks/use-care-team"
import type { ProviderSearchResult } from "@/lib/types"

interface ProviderSearchResultsProps {
  results: ProviderSearchResult[]
}

export function ProviderSearchResults({ results }: ProviderSearchResultsProps) {
  const { addToCareTeam } = useCareTeam()

  if (results.length === 0) return null

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h3 className="text-2xl font-bold text-glow">Provider Search Results</h3>

      <div className="grid gap-4">
        {results.map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:border-primary/50 transition-colors duration-200">
              <CardHeader className="flex flex-row items-center gap-4 p-6">
                <Image
                  src={provider.imageUrl || "/placeholder.svg"}
                  alt={provider.name}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-border"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold">{provider.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{provider.rating}</span>
                      <span className="text-muted-foreground text-sm">({provider.reviews})</span>
                    </div>
                  </div>
                  <p className="text-primary font-medium">{provider.specialty}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {provider.location} • {provider.distance}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{provider.availability}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <div className="flex gap-1">
                      {provider.insurance.slice(0, 3).map((ins) => (
                        <Badge key={ins} variant="secondary" className="text-xs">
                          {ins}
                        </Badge>
                      ))}
                      {provider.insurance.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{provider.insurance.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToCareTeam(provider)}
                      className="hover:border-primary hover:text-primary"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add to Care Team
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Schedule Appointment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
