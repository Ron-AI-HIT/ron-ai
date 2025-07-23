"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import type { UserProfile } from "@/lib/types"

interface ProviderSearchFormProps {
  userProfile: UserProfile
  onSearch: () => void
}

export function ProviderSearchForm({ userProfile, onSearch }: ProviderSearchFormProps) {
  const [formData, setFormData] = useState({
    specialty: "",
    location: userProfile.address || "",
    radius: [10],
    insurance: userProfile.insurance || "",
    gender: "",
    languages: [] as string[],
    availability: "",
    acceptingNewPatients: true,
    telehealth: false,
  })

  const handleSearch = () => {
    // Generate optimized prompt for provider search agent
    const prompt = generateSearchPrompt(formData, userProfile)
    console.log("Generated search prompt:", prompt)
    onSearch()
  }

  const generateSearchPrompt = (data: typeof formData, profile: UserProfile) => {
    return `Find healthcare providers with the following criteria:
    - Specialty: ${data.specialty || "Any"}
    - Location: ${data.location} within ${data.radius[0]} miles
    - Insurance: ${data.insurance}
    - Patient preferences: ${profile.conditions?.join(", ") || "None specified"}
    - Gender preference: ${data.gender || "No preference"}
    - Languages: ${data.languages.join(", ") || "English"}
    - Availability: ${data.availability || "Any"}
    - Accepting new patients: ${data.acceptingNewPatients ? "Yes" : "No"}
    - Telehealth options: ${data.telehealth ? "Required" : "Optional"}
    
    Patient context: ${profile.age} year old with conditions: ${profile.conditions?.join(", ") || "None"}
    Current medications: ${profile.medications?.join(", ") || "None"}
    
    Please prioritize providers based on patient needs and provide comprehensive information including ratings, availability, and insurance compatibility.`
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Provider Search Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Select
                value={formData.specialty}
                onValueChange={(value) => setFormData({ ...formData, specialty: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="endocrinology">Endocrinology</SelectItem>
                  <SelectItem value="family-medicine">Family Medicine</SelectItem>
                  <SelectItem value="internal-medicine">Internal Medicine</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="oncology">Oncology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter address or zip code"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Search Radius: {formData.radius[0]} miles</Label>
            <Slider
              value={formData.radius}
              onValueChange={(value) => setFormData({ ...formData, radius: value })}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insurance">Insurance</Label>
              <Input
                id="insurance"
                value={formData.insurance}
                onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                placeholder="Your insurance provider"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Provider Gender Preference</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="No preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="new-patients"
                checked={formData.acceptingNewPatients}
                onCheckedChange={(checked) => setFormData({ ...formData, acceptingNewPatients: !!checked })}
              />
              <Label htmlFor="new-patients">Accepting new patients</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="telehealth"
                checked={formData.telehealth}
                onCheckedChange={(checked) => setFormData({ ...formData, telehealth: !!checked })}
              />
              <Label htmlFor="telehealth">Telehealth available</Label>
            </div>
          </div>

          <Button onClick={handleSearch} className="w-full bg-primary hover:bg-primary/90">
            <Search className="w-4 h-4 mr-2" />
            Search Providers
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
