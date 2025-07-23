"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, MapPin, Calendar, Phone, MessageCircle, Award, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ProviderSearchResult } from "@/lib/types"

interface ProviderProfileViewProps {
  providers: ProviderSearchResult[]
  onProviderSelect: (provider: ProviderSearchResult) => void
  selectedProviders: ProviderSearchResult[]
}

export function ProviderProfileView({ providers, onProviderSelect, selectedProviders }: ProviderProfileViewProps) {
  const [activeProvider, setActiveProvider] = useState(providers[0]?.id)

  const activeProviderData = providers.find((p) => p.id === activeProvider)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-glow mb-2">Top 3 Recommended Providers</h3>
        <p className="text-muted-foreground">AI-curated selection based on your preferences and needs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Provider Selection Cards */}
        <div className="space-y-4">
          {providers.map((provider, index) => (
            <Card
              key={provider.id}
              className={`cursor-pointer transition-all duration-200 ${
                activeProvider === provider.id ? "border-primary bg-primary/5" : ""
              } ${selectedProviders.some((p) => p.id === provider.id) ? "ring-2 ring-primary" : ""}`}
              onClick={() => setActiveProvider(provider.id)}
            >
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold">{provider.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{provider.distance}</span>
                  <Button
                    size="sm"
                    variant={selectedProviders.some((p) => p.id === provider.id) ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation()
                      onProviderSelect(provider)
                    }}
                  >
                    {selectedProviders.some((p) => p.id === provider.id) ? "Selected" : "Select"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Provider Profile */}
        {activeProviderData && (
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{activeProviderData.name}</CardTitle>
                    <p className="text-lg text-primary font-medium">{activeProviderData.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xl font-bold">{activeProviderData.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activeProviderData.reviews} reviews</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                    <TabsTrigger value="insurance">Insurance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{activeProviderData.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{activeProviderData.distance}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">About</h4>
                      <p className="text-sm text-muted-foreground">
                        Dr. {activeProviderData.name.split(" ").pop()} is a highly rated{" "}
                        {activeProviderData.specialty.toLowerCase()}
                        specialist with extensive experience in patient care. Known for their compassionate approach and
                        commitment to using the latest medical technologies.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Appointment
                      </Button>
                      <Button variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="font-semibold">Board Certified</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="font-semibold">15+ Years Experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="font-semibold">Hospital Affiliations</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="availability" className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Next Available</h4>
                      <p className="text-sm">{activeProviderData.availability}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Office Hours</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span>8:00 AM - 5:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span>9:00 AM - 1:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="insurance" className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        Accepted Insurance
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProviderData.insurance.map((ins) => (
                          <Badge key={ins} variant="secondary">
                            {ins}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </motion.div>
  )
}
