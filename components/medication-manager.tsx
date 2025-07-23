"use client"

import { motion } from "framer-motion"
import { Pill, Clock, DollarSign, AlertTriangle, Scan, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { MedicationData } from "@/lib/types"

interface MedicationManagerProps {
  data: MedicationData | null
}

export function MedicationManager({ data }: MedicationManagerProps) {
  if (!data) return null

  const handleScanMedication = () => {
    // Implement medication scanning logic
    console.log("Opening camera for medication scan...")
  }

  const handleLogIntake = (medicationId: string) => {
    // Implement medication intake logging
    console.log("Logging medication intake for:", medicationId)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h3 className="text-2xl font-bold text-glow">Medication Management</h3>

      {/* Active Reminders */}
      {data.reminders.length > 0 && (
        <Alert className="border-primary/50 bg-primary/5">
          <Bell className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">
            You have {data.reminders.length} medication reminder(s) due soon.
          </AlertDescription>
        </Alert>
      )}

      {/* Current Medications */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Current Medications</h4>

        {data.currentMedications.map((medication, index) => (
          <motion.div
            key={medication.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`${medication.needsRefill ? "border-orange-500/50" : ""}`}>
              <CardHeader className="flex flex-row items-center gap-4 p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Pill className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{medication.name}</CardTitle>
                  <p className="text-muted-foreground">{medication.dosage}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Next due: {medication.nextDue.toLocaleTimeString()}</span>
                    </div>
                    <Badge variant={medication.needsRefill ? "destructive" : "secondary"}>
                      {medication.refillsRemaining} refills remaining
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                {/* Cost Saving Opportunity */}
                {medication.costSavingOpportunity && (
                  <Alert className="mb-4 border-green-500/50 bg-green-500/5">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700 dark:text-green-400">
                      Save ${medication.costSavingOpportunity.potentialSavings} -{" "}
                      {medication.costSavingOpportunity.suggestion}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Refill Warning */}
                {medication.needsRefill && (
                  <Alert className="mb-4 border-orange-500/50 bg-orange-500/5">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-700 dark:text-orange-400">
                      Refill needed - Contact your pharmacy or prescriber
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleScanMedication()}
                    className="hover:border-primary hover:text-primary"
                  >
                    <Scan className="w-4 h-4 mr-1" />
                    Scan Label
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleLogIntake(medication.id)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Log Intake
                  </Button>
                  {medication.needsRefill && (
                    <Button variant="outline" size="sm" className="text-orange-600 border-orange-500/50 bg-transparent">
                      Request Refill
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
