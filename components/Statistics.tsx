"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { label: "Projects", value: 15000, suffix: "+" },
  { label: "Users", value: 2000000, suffix: "+" },
  { label: "API Requests", value: 10, suffix: "B+" },
  { label: "Countries", value: 150, suffix: "" },
];

function Counter({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number | null = null;
    let animationFrameId: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing out quint
      const easeOut = 1 - Math.pow(1 - progress, 5);
      
      setCount(Math.floor(easeOut * (to - from) + from));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };
    
    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function Statistics() {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-2"
            >
              <div className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {typeof stat.value === 'number' && stat.value > 1000 ? (
                  <Counter to={stat.value} />
                ) : (
                  <span>{stat.value}</span>
                )}
                {stat.suffix}
              </div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
