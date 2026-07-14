"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "The New Era of Apple",
    subtitle: "MacBook Pro M3 Max",
    description: "Mind-blowing. Head-turning. The most advanced Mac ever built.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop",
    cta: "Shop Now"
  },
  {
    id: 2,
    title: "Sound, perfected.",
    subtitle: "AirPods Pro",
    description: "Active Noise Cancellation. Adaptive Transparency. Personalized Spatial Audio.",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1600&auto=format&fit=crop",
    cta: "Learn More"
  }
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-background">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img src={slides[current].image} alt={slides[current].title} className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pb-20 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="text-primary-foreground/80 font-medium tracking-wider uppercase mb-4">{slides[current].subtitle}</p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              {slides[current].title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl">
              {slides[current].description}
            </p>
            <Button size="lg" className="rounded-full h-14 px-8 text-base font-medium group bg-white text-black hover:bg-white/90 shadow-lg">
              {slides[current].cta}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-12 h-1 rounded-full transition-all duration-500 ${current === i ? "bg-white" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
