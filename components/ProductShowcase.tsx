"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const showcases = [
  {
    title: "Seamless Integration",
    description: "Connect your favorite tools with just a few clicks. Our platform integrates with over 100+ services seamlessly.",
    reversed: false,
  },
  {
    title: "Advanced Analytics",
    description: "Gain deep insights into your workflow with our beautiful, real-time analytics dashboard.",
    reversed: true,
  },
];

export function ProductShowcase() {
  return (
    <section className="py-24 bg-background" id="product">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-32">
        {showcases.map((showcase, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${showcase.reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24`}
          >
            <motion.div 
              initial={{ opacity: 0, x: showcase.reversed ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-1 space-y-6"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                {showcase.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {showcase.description}
              </p>
              <Button variant="link" className="px-0 text-primary text-base h-auto hover:no-underline hover:opacity-80">
                Learn more &rarr;
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-1 w-full"
            >
              <div className="aspect-[4/3] rounded-[32px] bg-card border border-border/50 shadow-sm flex items-center justify-center overflow-hidden">
                <span className="text-muted-foreground font-medium">Showcase Illustration</span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
