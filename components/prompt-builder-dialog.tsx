"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

export function PromptBuilderDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm font-medium hover:text-primary transition-colors duration-200"
        >
          <Plus className="mr-2 h-[34px] w-[33px] px-0 text-primary" />
          Prompt Builder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border shadow-2xl dark:shadow-primary/10">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-2xl font-bold text-glow">Prompt Builder</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground leading-relaxed">
            Craft a detailed prompt to get the most accurate and personalized health information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <Textarea
            placeholder="Describe your condition, symptoms, medical history, current medications, and what specific information you're looking for..."
            className="min-h-[150px] bg-background border-border text-base leading-relaxed resize-none focus-visible:ring-primary focus-visible:border-primary transition-colors duration-200"
          />
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            Generate Prompt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
