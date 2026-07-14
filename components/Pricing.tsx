"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for individuals and small projects.",
    features: ["Up to 3 projects", "Basic analytics", "24-hour support response", "Custom domain"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$99",
    description: "Ideal for growing teams and businesses.",
    features: ["Unlimited projects", "Advanced analytics", "1-hour support response", "Custom domain", "Team collaboration", "API access"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale organizations needing ultimate control.",
    features: ["Everything in Pro", "Dedicated success manager", "SLA guarantees", "SSO integration", "Custom reporting"],
    highlighted: false,
  }
];

export function Pricing() {
  return (
    <section className="py-24 bg-card" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            No hidden fees. No surprise charges. Just pay for what you use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`flex ${plan.highlighted ? "md:-translate-y-4" : ""}`}
            >
              <Card className={`flex flex-col w-full rounded-[32px] overflow-hidden ${plan.highlighted ? "border-primary shadow-xl ring-1 ring-primary" : "border-border/50"}`}>
                {plan.highlighted && (
                  <div className="bg-primary text-primary-foreground text-center text-sm font-semibold py-2">
                    Most Popular
                  </div>
                )}
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2 min-h-[40px]">{plan.description}</p>
                </CardHeader>
                <CardContent className="p-8 pt-0 flex-1">
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground font-medium">/mo</span>}
                  </div>
                  <ul className="space-y-4">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <Button 
                    variant={plan.highlighted ? "default" : "outline"} 
                    className={`w-full rounded-full h-12 text-base ${plan.highlighted ? "shadow-md" : ""}`}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
