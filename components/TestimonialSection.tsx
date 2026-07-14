"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "SaaSify has completely transformed how our engineering team operates. We ship 3x faster than before.",
    name: "Sarah Jenkins",
    company: "TechFlow Inc.",
    role: "CTO",
  },
  {
    quote: "The interface is so incredibly intuitive. We required zero training to onboard our entire 500-person company.",
    name: "Michael Chang",
    company: "Global Innovations",
    role: "VP of Operations",
  },
  {
    quote: "Best in class analytics and the design is just gorgeous. It feels like magic every time I log in.",
    name: "Emily Rodriguez",
    company: "DesignShift",
    role: "Product Lead",
  }
];

export function TestimonialSection() {
  return (
    <section className="py-24 bg-background" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Loved by innovative teams
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Card className="h-full bg-card border-border/50 hover:border-primary/50 transition-colors rounded-[24px]">
                <CardContent className="p-8 flex flex-col h-full justify-between gap-8">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-lg text-foreground font-medium italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-bold text-primary">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
