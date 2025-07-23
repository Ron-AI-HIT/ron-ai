"use client"

import type React from "react"
import Image from "next/image"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Star, MapPin, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Provider } from "@/lib/types"

interface ProviderDetailsSheetProps {
  provider: Provider
  children: React.ReactNode
}

export function ProviderDetailsSheet({ provider, children }: ProviderDetailsSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-card border-border overflow-y-auto dark:shadow-2xl dark:shadow-primary/5">
        <SheetHeader className="text-left space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Image
                src={provider.imageUrl || "/placeholder.svg"}
                alt={provider.name}
                width={80}
                height={80}
                className="rounded-full border-2 border-primary/20"
              />
              <div className="absolute inset-0 rounded-full bg-primary/10 dark:bg-primary/20" />
            </div>
            <div className="space-y-2">
              <SheetTitle className="text-3xl font-bold text-glow">{provider.name}</SheetTitle>
              <SheetDescription className="text-lg font-medium">{provider.specialty}</SheetDescription>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-foreground text-lg">{provider.rating}</span>
              <span className="text-muted-foreground">({provider.reviews})</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5" />
              <span>{provider.location}</span>
            </div>
          </div>
        </SheetHeader>

        <div className="py-8 space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              About Dr. {provider.name.split(" ").pop()}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-base">{provider.bio}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Schedule Consultation
            </h3>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base font-medium">
              Book Appointment
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
