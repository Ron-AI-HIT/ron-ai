"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  highlightWords?: string[]
  onComplete?: () => void
}

export function TypewriterText({
  text,
  className = "",
  speed = 50,
  delay = 0,
  highlightWords = [],
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setHasStarted(true)
      }, delay)
      return () => clearTimeout(delayTimer)
    } else {
      setHasStarted(true)
    }
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true)
      if (onComplete) {
        onComplete()
      }
    }
  }, [currentIndex, text, speed, hasStarted, isComplete, onComplete])

  const renderTextWithHighlights = (text: string) => {
    if (highlightWords.length === 0) return text

    let result = text
    highlightWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi")
      result = result.replace(regex, "|||HIGHLIGHT_START|||$1|||HIGHLIGHT_END|||")
    })

    return result.split("|||").map((part, index) => {
      if (part === "HIGHLIGHT_START") return null
      if (part === "HIGHLIGHT_END") return null
      if (index > 0 && result.split("|||")[index - 1] === "HIGHLIGHT_START") {
        return (
          <span
            key={index}
            className="text-primary text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            {part}
          </span>
        )
      }
      return part
    })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className={className}>
      {renderTextWithHighlights(displayedText)}
      {!isComplete && hasStarted && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="inline-block w-0.5 h-[1em] bg-primary ml-1"
        />
      )}
    </motion.div>
  )
}
