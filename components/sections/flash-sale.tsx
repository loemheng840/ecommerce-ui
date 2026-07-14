"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import Link from "next/link";

export function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 34, seconds: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-md">
              <Timer className="w-5 h-5 text-white" />
              <span className="font-semibold text-white tracking-wide">Flash Sale 50% Off</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">The Ultimate Tech Bundle</h2>
            <p className="text-lg text-white/80 mb-8 max-w-lg">
              Get our best-selling accessories at half the price. Only for a limited time.
            </p>
            
            <div className="flex gap-4 mb-10">
              <div className="flex flex-col items-center bg-white/10 rounded-2xl p-4 w-20 backdrop-blur-md border border-white/10 shadow-inner">
                <span className="text-3xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-xs text-white/70 mt-1 uppercase font-medium tracking-wider">Hours</span>
              </div>
              <div className="text-3xl font-bold text-white/50 mt-2">:</div>
              <div className="flex flex-col items-center bg-white/10 rounded-2xl p-4 w-20 backdrop-blur-md border border-white/10 shadow-inner">
                <span className="text-3xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-xs text-white/70 mt-1 uppercase font-medium tracking-wider">Mins</span>
              </div>
              <div className="text-3xl font-bold text-white/50 mt-2">:</div>
              <div className="flex flex-col items-center bg-white/10 rounded-2xl p-4 w-20 backdrop-blur-md border border-white/10 shadow-inner">
                <span className="text-3xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-xs text-white/70 mt-1 uppercase font-medium tracking-wider">Secs</span>
              </div>
            </div>

            <Link href="/products">
              <Button size="lg" variant="secondary" className="rounded-full h-14 px-8 text-base font-medium shadow-xl hover:scale-105 transition-transform text-black bg-white hover:bg-white/90">
                Claim Offer Now
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-[40px] transform rotate-3" />
            <img 
              src="https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop" 
              alt="Flash Sale Product" 
              className="relative z-10 w-full h-auto rounded-[40px] shadow-2xl object-cover aspect-square"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
