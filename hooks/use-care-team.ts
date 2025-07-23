"use client"

import { useState } from "react"
import type { ProviderSearchResult } from "@/lib/types"

export function useCareTeam() {
  const [careTeam, setCareTeam] = useState<ProviderSearchResult[]>([])

  const addToCareTeam = (provider: ProviderSearchResult) => {
    setCareTeam((prev) => {
      if (prev.find((p) => p.id === provider.id)) {
        return prev // Already in care team
      }
      return [...prev, provider]
    })
  }

  const removeFromCareTeam = (providerId: string) => {
    setCareTeam((prev) => prev.filter((p) => p.id !== providerId))
  }

  return {
    careTeam,
    addToCareTeam,
    removeFromCareTeam,
  }
}
