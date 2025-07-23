"use client"

import { motion } from "framer-motion"
import { Search, Pill, Calendar, Brain, CheckCircle, Loader2 } from "lucide-react"
import type { Agent, AgentStatus } from "@/lib/types"

interface AgentStatusIndicatorProps {
  currentAgent: Agent | null
  status: AgentStatus
}

export function AgentStatusIndicator({ currentAgent, status }: AgentStatusIndicatorProps) {
  if (!currentAgent) return null

  const getAgentIcon = () => {
    switch (currentAgent.type) {
      case "provider-search":
        return <Search className="w-5 h-5" />
      case "medication":
        return <Pill className="w-5 h-5" />
      case "appointment":
        return <Calendar className="w-5 h-5" />
      default:
        return <Brain className="w-5 h-5" />
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Loader2 className="w-4 h-4 animate-spin text-primary" />
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case "analyzing":
        return "Analyzing your request..."
      case "connecting":
        return `Connecting to ${currentAgent.name}...`
      case "searching":
        return "Searching for providers..."
      case "processing":
        return "Processing medication data..."
      case "scheduling":
        return "Checking appointment availability..."
      case "researching":
        return "Researching health information..."
      case "completed":
        return "Task completed successfully"
      default:
        return "Processing..."
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-4 p-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {getAgentIcon()}
        </div>
        <div>
          <h3 className="font-semibold text-sm">{currentAgent.name}</h3>
          <p className="text-xs text-muted-foreground">{currentAgent.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {getStatusIcon()}
        <span className="text-sm text-muted-foreground">{getStatusMessage()}</span>
      </div>
    </motion.div>
  )
}
