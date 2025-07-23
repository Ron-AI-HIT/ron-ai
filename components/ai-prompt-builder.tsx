"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BrainCircuit,
  Wand2,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Search,
  X,
  ChevronDown,
  Plus,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import type { UserProfile } from "@/lib/types"

interface AIPromptBuilderProps {
  userProfile: UserProfile
  onPromptGenerated: (prompt: string) => void
}

interface PatientInfo {
  name: string
  age: string
  location: string
  conditions: string[]
  medications: string[]
  insurance: string
  searchType: string
  specialty: string
  urgency: string
  preferences: string[]
  additionalContext: string
}

const PRESET_ATTRIBUTES = [
  "Holistic approach to care",
  "LGBTQIA+ affirming practice",
  "Minimal wait times",
  "Weekend/evening availability",
  "Telehealth options available",
  "Accepts new patients",
  "Multilingual staff",
  "Integrative medicine focus",
  "Patient-centered communication",
  "Evidence-based treatment",
  "Chronic pain management expertise",
  "Preventive care emphasis",
  "Collaborative care approach",
  "Cultural sensitivity",
  "Extended consultation time",
]

export function AIPromptBuilder({ userProfile, onPromptGenerated }: AIPromptBuilderProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: "",
    age: "",
    location: "",
    conditions: [],
    medications: [],
    insurance: "",
    searchType: "",
    specialty: "",
    urgency: "",
    preferences: [],
    additionalContext: "",
  })
  const [newCondition, setNewCondition] = useState("")
  const [newMedication, setNewMedication] = useState("")
  const [generatedPrompt, setGeneratedPrompt] = useState("")

  const handleGeneratePrompt = async () => {
    setIsLoading(true)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const prompt = generatePersonalizedPrompt(patientInfo)
    setGeneratedPrompt(prompt)
    setIsLoading(false)
    setStep(2)
  }

  const generatePersonalizedPrompt = (info: PatientInfo) => {
    return `I'm ${info.name}, a ${info.age}-year-old patient living in ${info.location}. I'm currently managing ${info.conditions.join(", ")} and taking ${info.medications.join(", ")}. I have ${info.insurance} insurance and I'm looking for a ${info.specialty} specialist.

My search is ${info.urgency} and I'm specifically looking for a provider who offers ${info.preferences.join(", ")}. 

${info.additionalContext}

Please help me find the most suitable healthcare provider based on my specific needs and circumstances.`
  }

  const addCondition = () => {
    if (newCondition && !patientInfo.conditions.includes(newCondition)) {
      setPatientInfo((prev) => ({
        ...prev,
        conditions: [...prev.conditions, newCondition],
      }))
      setNewCondition("")
    }
  }

  const addMedication = () => {
    if (newMedication && !patientInfo.medications.includes(newMedication)) {
      setPatientInfo((prev) => ({
        ...prev,
        medications: [...prev.medications, newMedication],
      }))
      setNewMedication("")
    }
  }

  const removeCondition = (condition: string) => {
    setPatientInfo((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((c) => c !== condition),
    }))
  }

  const removeMedication = (medication: string) => {
    setPatientInfo((prev) => ({
      ...prev,
      medications: prev.medications.filter((m) => m !== medication),
    }))
  }

  const addPreference = (preference: string) => {
    if (patientInfo.preferences.length < 5 && !patientInfo.preferences.includes(preference)) {
      setPatientInfo((prev) => ({
        ...prev,
        preferences: [...prev.preferences, preference],
      }))
    }
  }

  const removePreference = (preference: string) => {
    setPatientInfo((prev) => ({
      ...prev,
      preferences: prev.preferences.filter((p) => p !== preference),
    }))
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 px-8"
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <div
            className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-r-accent animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center space-y-2"
        >
          <h3 className="text-xl font-semibold">Crafting Your Personalized Prompt</h3>
          <p className="text-muted-foreground">
            Our AI is analyzing your information to create the perfect healthcare search...
          </p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="bg-card/95 backdrop-blur-2xl border border-border/30 rounded-3xl shadow-2xl shadow-primary/5 max-w-6xl mx-auto overflow-hidden"
    >
      <div className="relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

        <div className="relative p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm flex items-center justify-center border border-primary/20">
                <BrainCircuit className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  AI Prompt Builder
                </h2>
                <p className="text-muted-foreground mt-1">
                  Tell us about yourself to get personalized healthcare recommendations
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {step === 1 ? (
            <div className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Personal Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={patientInfo.name}
                          onChange={(e) => setPatientInfo((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your full name"
                          className="mt-2 h-12 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary/50"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="age" className="text-sm font-medium">
                            Age
                          </Label>
                          <Input
                            id="age"
                            value={patientInfo.age}
                            onChange={(e) => setPatientInfo((prev) => ({ ...prev, age: e.target.value }))}
                            placeholder="Your age"
                            className="mt-2 h-12 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location" className="text-sm font-medium">
                            Location
                          </Label>
                          <Input
                            id="location"
                            value={patientInfo.location}
                            onChange={(e) => setPatientInfo((prev) => ({ ...prev, location: e.target.value }))}
                            placeholder="City, State"
                            className="mt-2 h-12 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary/50"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="insurance" className="text-sm font-medium">
                          Insurance Provider
                        </Label>
                        <Input
                          id="insurance"
                          value={patientInfo.insurance}
                          onChange={(e) => setPatientInfo((prev) => ({ ...prev, insurance: e.target.value }))}
                          placeholder="e.g., Blue Cross Blue Shield"
                          className="mt-2 h-12 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Search Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Search Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">What are you looking for?</Label>
                        <Select
                          value={patientInfo.searchType}
                          onValueChange={(value) => setPatientInfo((prev) => ({ ...prev, searchType: value }))}
                        >
                          <SelectTrigger className="mt-2 h-12 rounded-xl border-border/50 bg-background/30 backdrop-blur-xl hover:border-primary/50 transition-colors">
                            <SelectValue placeholder="Select search type" />
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-border/30 bg-card/95 backdrop-blur-2xl shadow-2xl">
                            <div className="p-2">
                              <SelectItem
                                value="provider"
                                className="rounded-lg hover:bg-primary/10 focus:bg-primary/10"
                              >
                                Healthcare Provider
                              </SelectItem>
                              <SelectItem
                                value="facility"
                                className="rounded-lg hover:bg-primary/10 focus:bg-primary/10"
                              >
                                Medical Facility
                              </SelectItem>
                              <SelectItem
                                value="specialist"
                                className="rounded-lg hover:bg-primary/10 focus:bg-primary/10"
                              >
                                Specialist
                              </SelectItem>
                            </div>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Specialty Needed</Label>
                        <Select
                          value={patientInfo.specialty}
                          onValueChange={(value) => setPatientInfo((prev) => ({ ...prev, specialty: value }))}
                        >
                          <SelectTrigger className="mt-2 h-12 rounded-xl border-border/50 bg-background/30 backdrop-blur-xl hover:border-primary/50 transition-colors">
                            <SelectValue placeholder="Select specialty" />
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-border/30 bg-card/95 backdrop-blur-2xl shadow-2xl">
                            <div className="p-2">
                              <SelectItem
                                value="rheumatology"
                                className="rounded-lg hover:bg-primary/10 focus:bg-primary/10"
                              >
                                Rheumatology
                              </SelectItem>
                              <SelectItem
                                value="cardiology"
                                className="rounded-lg hover:bg-primary/10 focus:bg-primary/10"
                              >
                                Cardiology
                              </SelectItem>
                              <SelectItem
                                value="dermatology"
                                className="rounded-lg hover:bg-primary/10 focus:bg-primary/10"
                              >
                                Dermatology
                              </SelectItem>
                              <SelectItem
                                value="endocrinology"
                                className="rounded-lg hover:bg-primary/10 focus:bg-primary/10"
                              >
                                Endocrinology
                              </SelectItem>
                              <SelectItem
                                value="neurology"
                                className="rounded-lg hover:bg-primary/10 focus:bg-primary/10"
                              >
                                Neurology
                              </SelectItem>
                            </div>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Urgency Level</Label>
                        <Select
                          value={patientInfo.urgency}
                          onValueChange={(value) => setPatientInfo((prev) => ({ ...prev, urgency: value }))}
                        >
                          <SelectTrigger className="mt-2 h-12 rounded-xl border-border/50 bg-background/30 backdrop-blur-xl hover:border-primary/50 transition-colors">
                            <SelectValue placeholder="How urgent is this?" />
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-border/30 bg-card/95 backdrop-blur-2xl shadow-2xl">
                            <div className="p-2">
                              <SelectItem
                                value="routine"
                                className="rounded-lg hover:bg-primary/10 focus:bg-primary/10"
                              >
                                Routine - No rush
                              </SelectItem>
                              <SelectItem
                                value="moderate"
                                className="rounded-lg hover:bg-primary/10 focus:bg-primary/10"
                              >
                                Moderate - Within a few weeks
                              </SelectItem>
                              <SelectItem value="urgent" className="rounded-lg hover:bg-primary/10 focus:bg-primary/10">
                                Urgent - ASAP
                              </SelectItem>
                            </div>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Medical History */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Medical History</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Current Conditions</Label>
                        <div className="mt-2 p-4 border border-dashed border-border/50 rounded-xl min-h-[100px] bg-background/20 backdrop-blur-sm">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {patientInfo.conditions.map((condition) => (
                              <Badge
                                key={condition}
                                variant="secondary"
                                className="text-sm py-2 px-3 rounded-lg bg-primary/10 text-primary border-primary/20"
                              >
                                {condition}
                                <button
                                  onClick={() => removeCondition(condition)}
                                  className="ml-2 hover:text-destructive transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              value={newCondition}
                              onChange={(e) => setNewCondition(e.target.value)}
                              placeholder="Add a condition..."
                              className="rounded-lg border-border/50 bg-background/50"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault()
                                  addCondition()
                                }
                              }}
                            />
                            <Button
                              variant="outline"
                              onClick={addCondition}
                              className="rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/5 bg-transparent"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Current Medications</Label>
                        <div className="mt-2 p-4 border border-dashed border-border/50 rounded-xl min-h-[100px] bg-background/20 backdrop-blur-sm">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {patientInfo.medications.map((medication) => (
                              <Badge
                                key={medication}
                                variant="secondary"
                                className="text-sm py-2 px-3 rounded-lg bg-accent/10 text-accent border-accent/20"
                              >
                                {medication}
                                <button
                                  onClick={() => removeMedication(medication)}
                                  className="ml-2 hover:text-destructive transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              value={newMedication}
                              onChange={(e) => setNewMedication(e.target.value)}
                              placeholder="Add a medication..."
                              className="rounded-lg border-border/50 bg-background/50"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault()
                                  addMedication()
                                }
                              }}
                            />
                            <Button
                              variant="outline"
                              onClick={addMedication}
                              className="rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/5 bg-transparent"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Care Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Care Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Important Attributes (Select up to 5)</Label>
                        <Select onValueChange={addPreference}>
                          <SelectTrigger className="mt-2 h-12 rounded-xl border-border/50 bg-background/30 backdrop-blur-xl hover:border-primary/50 transition-colors">
                            <SelectValue placeholder="Choose what matters most to you..." />
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-border/30 bg-card/95 backdrop-blur-2xl shadow-2xl max-h-60">
                            <div className="p-2">
                              {PRESET_ATTRIBUTES.filter((attr) => !patientInfo.preferences.includes(attr)).map(
                                (attribute) => (
                                  <SelectItem
                                    key={attribute}
                                    value={attribute}
                                    className="rounded-lg hover:bg-primary/10 focus:bg-primary/10"
                                    disabled={patientInfo.preferences.length >= 5}
                                  >
                                    {attribute}
                                  </SelectItem>
                                ),
                              )}
                            </div>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {patientInfo.preferences.map((preference) => (
                          <Badge
                            key={preference}
                            variant="secondary"
                            className="text-sm py-2 px-3 rounded-lg bg-green-500/10 text-green-600 border-green-500/20"
                          >
                            {preference}
                            <button
                              onClick={() => removePreference(preference)}
                              className="ml-2 hover:text-destructive transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>

                      <div>
                        <Label htmlFor="context" className="text-sm font-medium">
                          Additional Context
                        </Label>
                        <Textarea
                          id="context"
                          value={patientInfo.additionalContext}
                          onChange={(e) => setPatientInfo((prev) => ({ ...prev, additionalContext: e.target.value }))}
                          placeholder="Any additional information that might help us find the right provider for you..."
                          className="mt-2 min-h-[100px] rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary/50 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-8 border-t border-border/30">
                <Button
                  onClick={handleGeneratePrompt}
                  disabled={!patientInfo.name || !patientInfo.age || !patientInfo.searchType}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-200"
                >
                  <Wand2 className="w-5 h-5 mr-2" />
                  Generate My Personalized Prompt
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-background/50 backdrop-blur-sm p-8 rounded-2xl border border-border/30">
                <h3 className="font-semibold mb-6 text-xl flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Your Personalized AI Prompt
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">{generatedPrompt}</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-border/30">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Was this helpful?</span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-green-500/10 hover:text-green-600"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-500/10 hover:text-red-600">
                      <ThumbsDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="rounded-xl border-border/50 hover:border-primary/50 hover:bg-primary/5"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Edit Information
                  </Button>
                  <Button
                    onClick={() => onPromptGenerated(generatedPrompt)}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-200"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Start My Search
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
