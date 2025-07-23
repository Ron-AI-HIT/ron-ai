// This component is no longer used in app/page.tsx, but kept for potential future use or if other parts of the app still reference it.
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Star, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ProviderDetailsSheet } from "@/components/provider-details-sheet"
import type { Provider } from "@/lib/types"

interface ProviderCardProps {
  provider: Provider
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02, transition: { duration: 0.2 } }} className="relative group cursor-pointer">
      <Card className="h-full overflow-hidden transition-all duration-300 bg-card border-border group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10">
        <div className="absolute inset-0 transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10" />

        <CardHeader className="flex flex-row items-center gap-6 p-8">
          <div className="relative">
            <Image
              src={provider.imageUrl || "/placeholder.svg"}
              alt={provider.name}
              width={64}
              height={64}
              className="rounded-full border-2 border-border group-hover:border-primary/50 dark:group-hover:border-primary/70 transition-colors duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-primary/10 dark:bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {provider.name}
            </h3>
            <p className="text-base text-muted-foreground font-medium">{provider.specialty}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{provider.location}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-foreground text-lg">{provider.rating}</span>
              <span className="text-muted-foreground">({provider.reviews} reviews)</span>
            </div>
            <ProviderDetailsSheet provider={provider}>
              <span className="text-primary font-semibold hover:text-primary/80 transition-colors duration-200 cursor-pointer">
                View Details →
              </span>
            </ProviderDetailsSheet>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
