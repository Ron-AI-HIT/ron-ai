"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Loader2 } from "lucide-react"
import type { ProviderSearchResult } from "@/lib/types"

interface DeepResearchViewProps {
  providers: ProviderSearchResult[]
}

const researchSteps = [
  "Initializing Deep Research Agent...",
  "Analyzing medical education and training background...",
  "Verifying board certifications and licenses...",
  "Researching hospital affiliations and privileges...",
  "Scanning published research and publications...",
  "Checking committee memberships and leadership roles...",
  "Investigating volunteer work and community involvement...",
  "Analyzing previous employment and career progression...",
  "Cross-referencing peer reviews and professional ratings...",
  "Dispatching browser agent: Scanning Doximity, Healthgrades, and medical databases...",
  "Analyzing patient forums for sentiment and experience reports...",
  "Dispatching VAPI agent: Calling office to verify credentials and availability...",
  "Compiling malpractice history and disciplinary actions...",
  "Synthesizing comprehensive professional profile...",
  "Cross-referencing findings with user's personal healthcare needs...",
  "Generating detailed recommendation report with citations...",
]

export function DeepResearchView({ providers }: DeepResearchViewProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedSteps((prev) => {
        if (prev.length < researchSteps.length) {
          return [...prev, prev.length]
        }
        clearInterval(interval)
        return prev
      })
    }, 700)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center flex flex-col items-center justify-center p-8"
    >
      <h2 className="text-3xl font-bold mb-4">Conducting Head-to-Head Deep Research</h2>
      <p className="text-muted-foreground mb-8">
        Our AI is analyzing your selected providers to find the best match for you.
      </p>

      <div className="w-full max-w-3xl bg-card border border-border rounded-2xl p-8 space-y-4">
        {researchSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 text-lg"
          >
            {completedSteps.includes(index) ? (
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            ) : (
              <Loader2 className="w-6 h-6 text-primary animate-spin flex-shrink-0" />
            )}
            <span className={completedSteps.includes(index) ? "text-muted-foreground" : "text-foreground"}>{step}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
