"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ComputerUseAgentProps {
  isVisible: boolean
  onClose: () => void
  task?: string
  liveUrl?: string
}

export function ComputerUseAgent({ isVisible, onClose, task, liveUrl }: ComputerUseAgentProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentUrl, setCurrentUrl] = useState(liveUrl || "https://example.com")

  useEffect(() => {
    if (liveUrl) {
      setCurrentUrl(liveUrl)
      setIsLoading(true)

      const loadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 2000)

      return () => clearTimeout(loadingTimer)
    }
  }, [liveUrl])

  const isVideo = currentUrl.endsWith(".mov") || currentUrl.endsWith(".mp4") || currentUrl.includes("/videos/")

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <div className="fixed top-0 right-0 w-1/2 h-full z-40 bg-black">
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            duration: 0.8,
          }}
          className="w-full h-full bg-black"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex items-center justify-center bg-black"
              >
                <div className="text-center space-y-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary mx-auto"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <p className="font-semibold text-lg text-white">Initializing Computer Use Agent</p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="text-sm text-gray-400 mt-2"
                    >
                      Setting up automated browser session...
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full h-full bg-black"
              >
                {isVideo ? (
                  <video
                    src={currentUrl}
                    autoPlay
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-cover bg-black"
                  />
                ) : (
                  <iframe
                    id="cua-iframe"
                    src={currentUrl}
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                    title="Computer Use Agent"
                    className="w-full h-full border-none bg-black"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
