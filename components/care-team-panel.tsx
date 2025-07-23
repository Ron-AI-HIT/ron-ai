"use client"

import { motion } from "framer-motion"
import { X, Calendar, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCareTeam } from "@/hooks/use-care-team"

interface CareTeamPanelProps {
  onClose: () => void
}

export function CareTeamPanel({ onClose }: CareTeamPanelProps) {
  const { careTeam, removeFromCareTeam } = useCareTeam()

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="fixed right-0 top-0 h-full w-96 bg-card border-l border-border shadow-2xl z-20 overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-glow">Care Team</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {careTeam.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No providers in your care team yet. Search for providers to add them.
          </p>
        ) : (
          <div className="space-y-4">
            {careTeam.map((provider) => (
              <Card key={provider.id}>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{provider.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Calendar className="w-4 h-4 mr-1" />
                      Schedule
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCareTeam(provider.id)}
                    className="mt-2 text-destructive hover:text-destructive"
                  >
                    Remove from team
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
