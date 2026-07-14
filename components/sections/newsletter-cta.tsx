"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

export function NewsletterCTA() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubscribed(true);
        toast.success("Welcome! Check your email for your 10% off coupon.");
        setEmail("");
    };

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-[32px] md:rounded-[48px] bg-gradient-to-br from-primary via-primary to-blue-600 p-8 md:p-16"
                >
                    {/* Decorative Elements */}
                    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 mb-6">
                            <Sparkles className="w-4 h-4 text-white" />
                            <span className="text-white text-xs font-bold uppercase tracking-wider">
                                Exclusive Offer
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                            Get 10% Off Your First Order
                        </h2>
                        <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl mx-auto">
                            Subscribe to our newsletter for exclusive deals, new arrivals, and personalized
                            recommendations.
                        </p>

                        {subscribed ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3"
                            >
                                <Check className="w-5 h-5 text-white" />
                                <span className="text-white font-medium">
                                    Thanks for subscribing! Check your email.
                                </span>
                            </motion.div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                            >
                                <div className="relative flex-1">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-12 pl-10 rounded-full bg-white/20 backdrop-blur-md border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="h-12 px-8 rounded-full bg-white text-primary hover:bg-white/90 font-medium"
                                >
                                    Subscribe
                                </Button>
                            </form>
                        )}

                        <p className="text-white/60 text-xs mt-4">
                            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
