"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUp, Bot, BrainCircuit, User, Paperclip, Mic, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/theme-toggle"
import { PromptBuilderDialog } from "@/components/prompt-builder-dialog"
import { AgentStatusIndicator } from "@/components/agent-status-indicator"
import { ProviderSearchInterface } from "@/components/provider-search-interface"
import { MedicationManagerInterface } from "@/components/medication-manager-interface"
import { CareTeamPanel } from "@/components/care-team-panel"
import { ComputerUseAgent } from "@/components/computer-use-agent"
import { TypewriterText } from "@/components/typewriter-text"
import { useAgentRouter } from "@/hooks/use-agent-router"
import { useUserProfile } from "@/hooks/use-user-profile"
import { useComputerAgent } from "@/hooks/use-computer-agent"
import type { Message } from "@/lib/types"

export default function HealthCopilot() {
  const [isDeepResearch, setIsDeepResearch] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [showCareTeam, setShowCareTeam] = useState(false)
  const [hasRunDemo, setHasRunDemo] = useState(false)
  const [showHeroText, setShowHeroText] = useState(true)
  const [isTypingInput, setIsTypingInput] = useState(false)
  const [sendButtonClicked, setSendButtonClicked] = useState(false)

  const { currentAgent, agentStatus, routeRequest, agentData, isProcessing } = useAgentRouter()
  const { userProfile } = useUserProfile()
  const { agentState, startAgent, stopAgent, updateTask, updateUrl } = useComputerAgent()

  useEffect(() => {
    const runDemoSequence = async () => {
      if (hasRunDemo) return
      setHasRunDemo(true)

      // Wait 2 seconds then start the demo
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Step 1: Hide hero text
      setShowHeroText(false)
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Step 2: Start typing in the input field
      setIsTypingInput(true)
      const userMessageContent =
        "Hi Ron, I was prescribed Humira, and even with insurance, there's no way I can afford it. Can you help me out?"

      // Type the message character by character
      for (let i = 0; i <= userMessageContent.length; i++) {
        setInputValue(userMessageContent.slice(0, i))
        await new Promise((resolve) => setTimeout(resolve, 30))
      }

      // Step 3: Wait a moment, then click send button
      await new Promise((resolve) => setTimeout(resolve, 500))
      setSendButtonClicked(true)

      // Step 4: Wait for button click animation, then send message
      await new Promise((resolve) => setTimeout(resolve, 200))

      const userMessage: Message = {
        role: "user",
        content: userMessageContent,
        timestamp: new Date(),
      }

      setMessages([userMessage])
      setInputValue("")
      setIsTypingInput(false)
      setSendButtonClicked(false)

      // Step 5: Wait 2 seconds after user message appears
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Step 6: Add Ron's response with typing effect
      const ronResponse: Message = {
        role: "assistant",
        content:
          "I understand how frustrating and stressful that must be. High medication costs are a huge burden. Please know that you're not alone in this, and I'm here to help. Let's look at some options together. I'm pulling up some research on manufacturer discounts and patient assistance programs right now.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, ronResponse])

      // Step 7: Wait for Ron's response typing to complete (calculated timing)
      const ronTypingTime = ronResponse.content.length * 15 + 1000
      await new Promise((resolve) => setTimeout(resolve, ronTypingTime))

      // Step 8: Wait 1.5 seconds after Ron's response completes
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Step 9: Open the computer agent with the video
      startAgent("Showing cost-saving research for Humira", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ron%20AI-7_21_2025%2C%209_30%E2%80%AFAM-wlBkV5MtoPcCEVbKa2hHRzMV7swpCR.mp4")
    }

    runDemoSequence()
  }, [hasRunDemo, startAgent])

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        role: "user",
        content: inputValue,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newMessage])
      setShowHeroText(false)

      // Check if message requires computer use agent
      const requiresCUA = checkIfRequiresCUA(inputValue)
      if (requiresCUA) {
        startAgent(`Researching: ${inputValue}`, "https://ron-ai.io")
      }

      // Route the request to appropriate agent
      await routeRequest(inputValue, isDeepResearch)

      setInputValue("")
    }
  }

  const checkIfRequiresCUA = (message: string): boolean => {
    const cuaTriggers = [
      "research",
      "look up",
      "find information",
      "check reviews",
      "verify",
      "browse",
      "search online",
      "deep research",
    ]
    return cuaTriggers.some((trigger) => message.toLowerCase().includes(trigger))
  }

  const renderAgentInterface = () => {
    if (!currentAgent) return null

    switch (currentAgent.type) {
      case "provider-search":
        return <ProviderSearchInterface data={agentData.providerSearch} userProfile={userProfile} />
      case "medication":
        return <MedicationManagerInterface data={agentData.medication} userProfile={userProfile} />
      case "appointment":
        return (
          <div className="p-6 bg-card rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-4">Appointment Scheduling</h3>
            <p className="text-muted-foreground">Appointment scheduling interface coming soon...</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground">
      {/* Left Panel - Interface */}
      <div
        className={`flex flex-col transition-all duration-500 ease-in-out ${agentState.isActive ? "lg:w-1/2 w-full" : "w-full"}`}
      >
        <header
          className="fixed top-0 left-0 z-10 flex items-center justify-between py-4 lg:py-8 px-4 lg:px-6 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-500 ease-in-out"
          style={{ width: agentState.isActive ? (window.innerWidth >= 1024 ? "50%" : "100%") : "100%" }}
        >
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 lg:w-6 lg:h-6 text-primary" />
            </div>
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight font-serif">Ron AI</h1>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCareTeam(!showCareTeam)}
              className="text-xs lg:text-sm font-medium hover:text-primary hidden sm:flex"
            >
              Care Team
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (agentState.isActive) {
                  stopAgent()
                } else {
                  startAgent("Browsing Ron AI Website", "https://ron-ai.io")
                }
              }}
              className={`text-xs lg:text-sm font-medium hover:text-primary ${agentState.isActive ? "text-primary" : ""}`}
            >
              <Monitor className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">{agentState.isActive ? "Close" : "Browser"}</span>
            </Button>
            <ThemeToggle />
          </div>
        </header>

        {showCareTeam && <CareTeamPanel onClose={() => setShowCareTeam(false)} />}

        <main className="flex-1 pb-[200px] lg:pb-[259px] pt-20 lg:pt-32 px-4 lg:mx-4 lg:my-[25px] overflow-y-auto">
          <div className="container max-w-7xl mx-auto px-2 lg:px-6">
            {showHeroText ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center mb-0 py-0 mt-4 lg:mt-[-33px]"
              >
                <div
                  className={`leading-tight font-extralight tracking-wide mx-2.5 py-0 ${
                    agentState.isActive
                      ? "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl"
                      : "text-3xl sm:text-4xl lg:text-7xl"
                  }`}
                >
                  Your Health Advocacy{" "}
                  <span className="text-primary text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Co-Pilot
                  </span>
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
                  <div
                    className={`text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 font-serif tracking-wide mt-4 mb-0 py-4 ${
                      agentState.isActive ? "text-sm sm:text-base lg:text-lg" : "text-base sm:text-lg lg:text-2xl"
                    }`}
                  >
                    Get clarity and confidence in your healthcare decisions with AI-powered insights and expert
                    recommendations.
                  </div>
                </motion.div>
              </motion.div>
            ) : messages.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-8 lg:space-y-12"
              >
                {/* Agent Status Indicator */}
                {isProcessing && <AgentStatusIndicator currentAgent={currentAgent} status={agentStatus} />}

                {/* Messages */}
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                    className="flex items-start gap-3 lg:gap-6"
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${
                        msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="w-4 h-4 lg:w-5 lg:h-5" />
                      ) : (
                        <Bot className="w-4 h-4 lg:w-5 lg:h-5" />
                      )}
                    </div>
                    <div
                      className={`flex-1 pt-2 ${
                        msg.role === "user" ? "bg-card p-4 lg:p-6 rounded-2xl border border-border" : ""
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <TypewriterText
                          text={msg.content}
                          className="text-base lg:text-lg leading-relaxed"
                          speed={15}
                        />
                      ) : (
                        <div className="text-base lg:text-lg leading-relaxed">{msg.content}</div>
                      )}
                      {msg.timestamp && (
                        <span className="text-xs text-muted-foreground mt-2 block">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Agent Interface */}
                {renderAgentInterface()}
              </motion.div>
            ) : null}
          </div>
        </main>

        <motion.footer
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.5 }}
          className="fixed bottom-0 left-0 p-3 lg:p-6 transition-all duration-500 ease-in-out"
          style={{ width: agentState.isActive ? (window.innerWidth >= 1024 ? "50%" : "100%") : "100%" }}
        >
          <div className="container max-w-5xl mx-auto">
            <div className="relative bg-card/95 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-3 lg:p-4 shadow-2xl shadow-primary/10 border border-border/50">
              <div className="flex items-end gap-2 lg:gap-4">
                <div className="flex-1">
                  <Textarea
                    value={inputValue}
                    onChange={(e) => !isTypingInput && setInputValue(e.target.value)}
                    placeholder="Ask about symptoms, treatments, or find a specialist..."
                    className="w-full text-sm lg:text-lg resize-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 placeholder:text-muted-foreground/70 min-h-[50px] lg:min-h-[60px] border border-border bg-background text-foreground rounded-xl"
                    rows={1}
                    disabled={isProcessing || isTypingInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey && !isTypingInput) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                </div>
                <div className="flex items-center gap-1 lg:gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 lg:w-12 lg:h-12 hover:bg-primary/10 bg-primary/20 rounded-lg"
                  >
                    <Paperclip className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 lg:w-12 lg:h-12 hover:bg-primary/10 bg-primary/20 rounded-lg"
                  >
                    <Mic className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    disabled={isProcessing || !inputValue.trim() || isTypingInput}
                    className={`w-10 h-10 lg:w-12 lg:h-12 hover:bg-primary/90 text-primary-foreground hover:shadow-primary/25 transition-all duration-300 rounded-lg bg-primary shadow-lg disabled:opacity-50 ${
                      sendButtonClicked ? "scale-95 bg-primary/80" : ""
                    }`}
                  >
                    <ArrowUp className="w-4 h-4 lg:w-5 lg:h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 lg:pt-4 mt-3 lg:mt-4 border-t border-border/50">
                <div className="flex items-center gap-3 lg:gap-6 flex-wrap">
                  <PromptBuilderDialog />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (agentState.isActive) {
                        stopAgent()
                      } else {
                        startAgent("Browsing Ron AI Website", "https://ron-ai.io")
                      }
                    }}
                    className="text-xs lg:text-sm font-medium hover:text-primary transition-colors duration-200"
                  >
                    <Monitor className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                    {agentState.isActive ? "Close Browser" : "Browser"}
                  </Button>
                  <div className="flex items-center gap-2 lg:gap-3">
                    <BrainCircuit className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                    <label htmlFor="deep-research" className="text-xs lg:text-sm font-medium">
                      Deep Research
                    </label>
                    <Switch
                      id="deep-research"
                      checked={isDeepResearch}
                      onCheckedChange={setIsDeepResearch}
                      className="data-[state=checked]:bg-primary shadow-lg scale-75 lg:scale-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>

      {/* Right Panel - Computer Use Agent */}
      <ComputerUseAgent
        isVisible={agentState.isActive}
        onClose={stopAgent}
        task={agentState.currentTask || undefined}
        liveUrl={agentState.liveUrl || undefined}
      />
    </div>
  )
}
