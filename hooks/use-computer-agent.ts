"use client"

import { useState } from "react"

interface ComputerAgentState {
  isActive: boolean
  currentTask: string | null
  liveUrl: string | null
  sessionId: string | null
}

export function useComputerAgent() {
  const [agentState, setAgentState] = useState<ComputerAgentState>({
    isActive: false,
    currentTask: null,
    liveUrl: null,
    sessionId: null,
  })

  const startAgent = (task: string, url?: string) => {
    const sessionId = `cua_${Date.now()}`
    setAgentState({
      isActive: true,
      currentTask: task,
      liveUrl: url || "https://example.com",
      sessionId,
    })
  }

  const stopAgent = () => {
    setAgentState({
      isActive: false,
      currentTask: null,
      liveUrl: null,
      sessionId: null,
    })
  }

  const updateTask = (task: string) => {
    setAgentState((prev) => ({
      ...prev,
      currentTask: task,
    }))
  }

  const updateUrl = (url: string) => {
    setAgentState((prev) => ({
      ...prev,
      liveUrl: url,
    }))
  }

  return {
    agentState,
    startAgent,
    stopAgent,
    updateTask,
    updateUrl,
  }
}
