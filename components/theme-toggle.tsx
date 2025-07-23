"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  // Add this state to handle mounting
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme()

  // Add useEffect after the useTheme hook
  useEffect(() => {
    setMounted(true)
  }, [])

  // Add this condition before the return statement
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-12 h-12 rounded-full hover:bg-primary/10 transition-all duration-200 relative overflow-hidden"
      >
        <Sun className="h-6 w-6 text-primary" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-12 h-12 rounded-full hover:bg-primary/10 transition-all duration-200 relative overflow-hidden"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-primary" />
        <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
