"use client"

import { useState } from "react"
import type { Agent, AgentStatus, ProviderSearchData, MedicationData, AppointmentData, Message } from "@/lib/types"

interface AgentData {
  providerSearch: ProviderSearchData | null
  medication: MedicationData | null
  appointment: AppointmentData | null
}

export function useAgentRouter() {
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null)
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle")
  const [agentData, setAgentData] = useState<AgentData>({
    providerSearch: null,
    medication: null,
    appointment: null,
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const routeRequest = async (request: string, deepResearch = false): Promise<Message | null> => {
    setIsProcessing(true)
    setAgentStatus("analyzing")

    // Simulate agent selection delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Determine which agent to use based on request content
    const agent = determineAgent(request)
    setCurrentAgent(agent)
    setAgentStatus("connecting")

    await new Promise((resolve) => setTimeout(resolve, 800))

    let assistantMessage: Message | null = null

    // Execute agent-specific logic
    switch (agent.type) {
      case "provider-search":
        await handleProviderSearch(request, deepResearch)
        break
      case "medication":
        assistantMessage = await handleMedicationRequest(request)
        break
      case "appointment":
        await handleAppointmentRequest(request)
        break
      case "general":
        await handleGeneralRequest(request)
        break
    }

    setAgentStatus("completed")
    setIsProcessing(false)
    return assistantMessage
  }

  const determineAgent = (request: string): Agent => {
    const lowerRequest = request.toLowerCase()

    if (
      (lowerRequest.includes("find") &&
        (lowerRequest.includes("doctor") ||
          lowerRequest.includes("provider") ||
          lowerRequest.includes("specialist") ||
          lowerRequest.includes("physician") ||
          lowerRequest.includes("rheumatologist") ||
          lowerRequest.includes("cardiologist") ||
          lowerRequest.includes("dermatologist"))) ||
      lowerRequest.includes("provider") ||
      lowerRequest.includes("doctor") ||
      lowerRequest.includes("specialist") ||
      lowerRequest.includes("research") ||
      lowerRequest.includes("look up")
    ) {
      return { type: "provider-search", name: "Provider Search Agent", description: "Finding healthcare providers" }
    }

    if (
      lowerRequest.includes("medication") ||
      lowerRequest.includes("prescription") ||
      lowerRequest.includes("drug") ||
      lowerRequest.includes("pill") ||
      lowerRequest.includes("humira")
    ) {
      return {
        type: "medication",
        name: "Medication Management Agent",
        description: "Managing medications and prescriptions",
      }
    }

    if (lowerRequest.includes("appointment") || lowerRequest.includes("schedule") || lowerRequest.includes("book")) {
      return { type: "appointment", name: "Appointment Scheduling Agent", description: "Scheduling appointments" }
    }

    return { type: "general", name: "General Health Agent", description: "Providing general health information" }
  }

  const handleProviderSearch = async (request: string, deepResearch: boolean) => {
    setAgentStatus("searching")
    await new Promise((resolve) => setTimeout(resolve, deepResearch ? 3000 : 2000))

    // Enhanced mock provider search results with AI summaries
    const mockResults = [
      {
        id: "1",
        name: "Dr. Seung Yoon Celine Lee, MD",
        specialty: "Rheumatology",
        rating: 4.8,
        reviews: 8,
        location: "Lotus Rheumatology and Wellness Clinic, 166 E 5900 S B111, Murray, UT 84107",
        distance: "7.2 miles",
        availability: "Next available: Tomorrow 2:00 PM",
        insurance: ["Blue Cross", "Aetna", "Cigna", "United Healthcare"],
        imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profile-EXaOVHN2gGQjlkNlQTJcrfGzoWMuSU.png",
        aiSummary:
          "Dr. Seung Yoon Celine Lee is a board-certified rheumatologist with over 23 years of experience, specializing in integrative and lifestyle medicine. She operates a direct-pay concierge practice known for its holistic approach, combining Western and Eastern medical traditions, including medical acupuncture, to identify the root causes of autoimmune disorders. Patient reviews consistently praise her for providing thorough, personalized care during extended 75-minute consultations, making them feel heard and valued. While her concierge model is noted as an investment, patients report that her focus on lifestyle factors and integrative treatments provides exceptional and effective results.",
      },
      {
        id: "2",
        name: "Dr. Jane Alexandra Nguyen, MD",
        specialty: "Rheumatology",
        rating: 4.9,
        reviews: 8,
        location: "389 S 900 E, Salt Lake City, UT 84102",
        distance: "12.8 miles",
        availability: "Next available: Friday 10:00 AM",
        insurance: ["United Healthcare", "Blue Cross", "Medicare"],
        imageUrl: "/placeholder.svg?height=60&width=60",
        aiSummary:
          "Dr. Jane Alexandra Nguyen is a highly-rated rheumatologist from Salt Lake City, specializing in ultrasound-guided procedures and lupus research. Patient reviews consistently praise her extensive knowledge, excellent bedside manner, and precise, effective injections. Patients feel respected and comfortable in her LGBTQIA+ friendly practice and credit her with early and accurate diagnoses.",
      },
      {
        id: "3",
        name: "Dr. Richard Albert Gremillion, MD",
        specialty: "Rheumatology",
        rating: 4.3,
        reviews: 8,
        location: "800 E 9400 S, Sandy, UT 84094",
        distance: "4.5 miles",
        availability: "Next available: Monday 9:00 AM",
        insurance: ["Aetna", "Cigna", "Medicaid"],
        imageUrl: "/placeholder.svg?height=60&width=60",
        aiSummary:
          "Dr. Richard Albert Gremillion is a Salt Lake Valley-based rheumatologist affiliated with Lone Peak Hospital who also volunteers at local medical clinics. He specializes in rheumatology and joint replacement interfaces, has published research on precision joint replacement, and leads community-based screening programs for early rheumatoid arthritis detection. Patient reviews frequently highlight his approachable and respectful demeanor, kindness, and patience, particularly with elderly patients. He is praised for taking the time to explain treatment options and for his community-focused approach, though some patients note that appointments can be difficult to schedule.",
      },
      {
        id: "4",
        name: "Dr. David Jonathan Smith, MD",
        specialty: "Rheumatology",
        rating: 3.0,
        reviews: 8,
        location: "1121 E 3900 S Ste 125, Salt Lake City, UT 84124",
        distance: "8.2 miles",
        availability: "Next available: Next week",
        insurance: ["Blue Cross", "Aetna"],
        imageUrl: "/placeholder.svg?height=60&width=60",
        aiSummary:
          "Dr. David Jonathan Smith is a rheumatologist practicing in Salt Lake City with a focus on traditional treatment approaches. While experienced in standard rheumatological care, patient feedback indicates mixed experiences with communication style and appointment availability.",
      },
    ]

    setAgentData((prev) => ({
      ...prev,
      providerSearch: { results: mockResults, searchQuery: request },
    }))
  }

  const handleMedicationRequest = async (request: string): Promise<Message | null> => {
    setAgentStatus("processing")
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Specific demo response for Humira
    if (request.toLowerCase().includes("humira")) {
      return {
        role: "assistant",
        content:
          "I understand how frustrating and stressful that must be. High medication costs are a huge burden. Please know that you're not alone in this, and I'm here to help. Let's look at some options together. I'm pulling up some research on manufacturer discounts and patient assistance programs right now.",
        timestamp: new Date(),
      }
    }

    // Mock medication data for other requests
    const mockMedicationData = {
      currentMedications: [
        {
          id: "1",
          name: "Lisinopril 10mg",
          dosage: "Once daily",
          nextDue: new Date(Date.now() + 2 * 60 * 60 * 1000),
          refillsRemaining: 2,
          costSavingOpportunity: {
            currentCost: 45.99,
            potentialSavings: 23.5,
            suggestion: "Generic alternative available",
          },
        },
        {
          id: "2",
          name: "Metformin 500mg",
          dosage: "Twice daily with meals",
          nextDue: new Date(Date.now() + 30 * 60 * 1000),
          refillsRemaining: 0,
          needsRefill: true,
        },
      ],
      reminders: [
        {
          id: "1",
          medicationId: "2",
          time: new Date(Date.now() + 30 * 60 * 1000),
          message: "Time to take Metformin 500mg",
        },
      ],
    }

    setAgentData((prev) => ({
      ...prev,
      medication: mockMedicationData,
    }))

    return null
  }

  const handleAppointmentRequest = async (request: string) => {
    setAgentStatus("scheduling")
    await new Promise((resolve) => setTimeout(resolve, 1800))

    setAgentData((prev) => ({
      ...prev,
      appointment: { availableSlots: [], selectedProvider: null },
    }))
  }

  const handleGeneralRequest = async (request: string) => {
    setAgentStatus("researching")
    await new Promise((resolve) => setTimeout(resolve, 1200))
    // Handle general health queries
  }

  return {
    currentAgent,
    agentStatus,
    routeRequest,
    agentData,
    isProcessing,
  }
}
