"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full max-w-4xl mx-auto opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
            Join thousands of modern teams who have upgraded their experience. Get started for free today, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full text-base h-14 px-8">
              Start your free trial
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8">
              Talk to sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
