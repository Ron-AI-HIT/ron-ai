"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Pill } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { UserProfile } from "@/lib/types"

interface MedicationFormProps {
  userProfile: UserProfile
  onSubmit: () => void
}

export function MedicationForm({ userProfile, onSubmit }: MedicationFormProps) {
  const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    frequency: "",
    prescribingDoctor: "",
    pharmacy: userProfile.preferredPharmacy?.name || "",
    insuranceInfo: userProfile.insurance || "",
    currentCost: "",
    refillDate: "",
    concerns: "",
  })

  const handleSubmit = () => {
    // Generate optimized prompt for medication agent
    const prompt = generateMedicationPrompt(formData, userProfile)
    console.log("Generated medication prompt:", prompt)
    onSubmit()
  }

  const generateMedicationPrompt = (data: typeof formData, profile: UserProfile) => {
    return `Medication management request for ${profile.name}:
    
    Patient Information:
    - Age: ${profile.age}
    - Current conditions: ${profile.conditions?.join(", ") || "None"}
    - Current medications: ${profile.medications?.join(", ") || "None"}
    - Allergies: ${profile.allergies?.join(", ") || "None"}
    - Insurance: ${profile.insurance}
    
    Medication Details:
    - Name: ${data.medicationName}
    - Dosage: ${data.dosage}
    - Frequency: ${data.frequency}
    - Prescribing Doctor: ${data.prescribingDoctor}
    - Current Cost: $${data.currentCost}
    - Next Refill: ${data.refillDate}
    
    Pharmacy Information:
    - Preferred Pharmacy: ${data.pharmacy}
    - Location: ${profile.preferredPharmacy?.address || "Not specified"}
    
    Patient Concerns: ${data.concerns}
    
    Please analyze cost-saving opportunities, check for drug interactions with current medications, verify dosage appropriateness for patient age and conditions, and provide refill management recommendations.`
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            Medication Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medication-name">Medication Name</Label>
              <Input
                id="medication-name"
                value={formData.medicationName}
                onChange={(e) => setFormData({ ...formData, medicationName: e.target.value })}
                placeholder="e.g., Lisinopril"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                placeholder="e.g., 10mg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData({ ...formData, frequency: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="How often?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once-daily">Once daily</SelectItem>
                  <SelectItem value="twice-daily">Twice daily</SelectItem>
                  <SelectItem value="three-times-daily">Three times daily</SelectItem>
                  <SelectItem value="as-needed">As needed</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prescribing-doctor">Prescribing Doctor</Label>
              <Input
                id="prescribing-doctor"
                value={formData.prescribingDoctor}
                onChange={(e) => setFormData({ ...formData, prescribingDoctor: e.target.value })}
                placeholder="Dr. Smith"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pharmacy">Preferred Pharmacy</Label>
              <Input
                id="pharmacy"
                value={formData.pharmacy}
                onChange={(e) => setFormData({ ...formData, pharmacy: e.target.value })}
                placeholder="CVS, Walgreens, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-cost">Current Monthly Cost</Label>
              <Input
                id="current-cost"
                type="number"
                value={formData.currentCost}
                onChange={(e) => setFormData({ ...formData, currentCost: e.target.value })}
                placeholder="45.99"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="concerns">Concerns or Questions</Label>
            <Textarea
              id="concerns"
              value={formData.concerns}
              onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
              placeholder="Any side effects, cost concerns, or questions about this medication..."
              className="min-h-[100px]"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary/90">
            <Pill className="w-4 h-4 mr-2" />
            Analyze Medication
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
