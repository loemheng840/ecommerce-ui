"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Smartphone, Globe, Cloud } from "lucide-react";

const features = [
  {
    title: "Lightning Fast",
    description: "Built on a modern architecture that loads instantly.",
    icon: <Zap className="w-6 h-6 text-primary" />,
    className: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    title: "Secure by Design",
    description: "Enterprise-grade security built into every layer.",
    icon: <Shield className="w-6 h-6 text-primary" />,
    className: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    title: "Mobile Optimized",
    description: "Perfectly responsive across all devices and screen sizes.",
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    className: "col-span-1 md:col-span-1 row-span-2",
  },
  {
    title: "Global CDN",
    description: "Distributed across 200+ edge locations worldwide.",
    icon: <Globe className="w-6 h-6 text-primary" />,
    className: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    title: "Cloud Sync",
    description: "Real-time synchronization across all your platforms.",
    icon: <Cloud className="w-6 h-6 text-primary" />,
    className: "col-span-1 md:col-span-1 row-span-1",
  },
];

export function BentoFeatures() {
  return (
    <section className="py-24 bg-card" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Everything you need. <br className="hidden sm:block"/> Nothing you don't.
          </h2>
          <p className="text-lg text-muted-foreground">
            A carefully curated set of features designed to maximize your productivity without overwhelming you with clutter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto auto-rows-[250px]">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 0.98 }}
              className={`rounded-[24px] border border-border bg-background p-8 flex flex-col justify-between transition-shadow hover:shadow-lg overflow-hidden group ${feature.className}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
