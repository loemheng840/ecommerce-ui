"use client";

import { motion } from "framer-motion";
import { Truck, Shield, RotateCcw, HeadphonesIcon, CreditCard } from "lucide-react";

const trustItems = [
    {
        icon: Truck,
        title: "Free Shipping",
        description: "On orders over $100",
    },
    {
        icon: RotateCcw,
        title: "Easy Returns",
        description: "30-day return policy",
    },
    {
        icon: Shield,
        title: "Secure Payment",
        description: "100% protected",
    },
    {
        icon: HeadphonesIcon,
        title: "24/7 Support",
        description: "Always here to help",
    },
    {
        icon: CreditCard,
        title: "Flexible Payment",
        description: "Multiple methods",
    },
];

export function TrustBar() {
    return (
        <section className="py-8 md:py-10 bg-secondary/30 border-y border-border/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {trustItems.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
