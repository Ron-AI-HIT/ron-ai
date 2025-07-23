"use client"

import { useState } from "react"
import type { UserProfile } from "@/lib/types"

export function useUserProfile() {
  const [userProfile] = useState<UserProfile>({
    name: "John Doe",
    age: 45,
    address: "New York, NY 10001",
    insurance: "Blue Cross Blue Shield",
    conditions: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Lisinopril 10mg", "Metformin 500mg"],
    allergies: ["Penicillin"],
    emergencyContact: {
      name: "Jane Doe",
      phone: "(555) 123-4567",
      relationship: "Spouse",
    },
    preferredPharmacy: {
      name: "CVS Pharmacy",
      address: "123 Main St, New York, NY 10001",
      phone: "(555) 987-6543",
    },
  })

  return { userProfile }
}
