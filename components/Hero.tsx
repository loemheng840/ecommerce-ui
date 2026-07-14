"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Announcing our new Pro tier
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            Design without <br className="hidden md:block" /> boundaries.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
            A premium, intuitive interface designed for the modern web. Built with extreme attention to detail, typography, and motion.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full text-base h-14 px-8">
              Get Started
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto rounded-full text-base h-14 px-8 group">
              View Demo
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Product Image */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10 h-full w-full pointer-events-none" />
          <div className="relative rounded-2xl md:rounded-3xl border border-border/50 bg-card overflow-hidden shadow-2xl">
            <div className="aspect-[16/9] w-full bg-secondary/30 flex items-center justify-center">
              <span className="text-muted-foreground">Product Dashboard Mockup (1200x675)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
