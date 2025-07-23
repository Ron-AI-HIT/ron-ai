"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RonAILanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-black">Ron AI</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-700 hover:text-black transition-colors">
                Home
              </a>
              <a href="#products" className="text-gray-700 hover:text-black transition-colors">
                Our Products
              </a>
              <a href="#blog" className="text-gray-700 hover:text-black transition-colors">
                Blog
              </a>
              <a href="#about" className="text-gray-700 hover:text-black transition-colors">
                About Us
              </a>
              <a href="#contact" className="text-gray-700 hover:text-black transition-colors">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <Button className="hidden md:inline-flex bg-gray-800 hover:bg-gray-900 text-white rounded-md px-4 py-2">
                Request Early Access
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4"
            >
              <div className="flex flex-col gap-4">
                <a href="#home" className="text-gray-700 hover:text-black transition-colors">
                  Home
                </a>
                <a href="#products" className="text-gray-700 hover:text-black transition-colors">
                  Our Products
                </a>
                <a href="#blog" className="text-gray-700 hover:text-black transition-colors">
                  Blog
                </a>
                <a href="#about" className="text-gray-700 hover:text-black transition-colors">
                  About Us
                </a>
                <a href="#contact" className="text-gray-700 hover:text-black transition-colors">
                  Contact
                </a>
                <Button className="bg-gray-800 hover:bg-gray-900 text-white w-full">Request Early Access</Button>
              </div>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-normal text-black leading-tight">
                  Ron is
                  <br />
                  Healthcare's
                  <br />
                  <span className="text-blue-600 font-normal">
                    Care Advocacy
                    <br />
                    Co-Pilot
                  </span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Ron is your personal AI healthcare coordinator. He finds doctors who take your insurance, books
                  appointments with a simple voice command, compares medication prices across pharmacies, and even helps
                  fight insurance denials. Let Ron handle the healthcare maze while you focus on getting better.
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base px-6 py-3 rounded-md">
                Get Early Access
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-100 rounded-3xl p-8 shadow-lg">
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Ron AI</h3>
                      <p className="text-sm text-gray-500">Healthcare Assistant</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-700">"Find me a rheumatologist"</p>
                    </div>
                    <div className="bg-blue-600 text-white rounded-lg p-3">
                      <p className="text-sm">
                        I found 3 excellent options in your area. Dr. Chen has availability tomorrow at 2 PM.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-normal text-black">
              Watch Ron <span className="text-blue-600">Find Your Doctor & Book Your Appointment</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              See how Ron's AI healthcare assistant finds doctors who take your insurance near you and uses voice
              technology to call offices and book appointments automatically - saving you 45+ minutes per booking.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
