"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

const slides = [
    {
        id: 1,
        title: "The New Era of Apple",
        subtitle: "MacBook Pro M3 Max",
        description: "Mind-blowing performance. Head-turning design.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop",
        cta: "Shop Now",
        href: "/products?category=electronics",
    },
    {
        id: 2,
        title: "Sound, perfected.",
        subtitle: "AirPods Pro",
        description: "Active Noise Cancellation. Spatial Audio.",
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1600&auto=format&fit=crop",
        cta: "Learn More",
        href: "/products?category=audio",
    },
    {
        id: 3,
        title: "Style Redefined.",
        subtitle: "Premium Fashion",
        description: "Discover the season's most coveted pieces.",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600&auto=format&fit=crop",
        cta: "Explore",
        href: "/products?category=fashion",
    },
];

const sideBanners = [
    {
        id: 1,
        icon: Sparkles,
        tag: "New Collection",
        title: "Fresh Arrivals",
        description: "Up to 30% off",
        gradient: "from-purple-500 to-pink-500",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        href: "/products?sort=newest",
    },
    {
        id: 2,
        icon: Zap,
        tag: "Flash Deal",
        title: "Weekend Sale",
        description: "Save up to 50%",
        gradient: "from-orange-500 to-red-500",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop",
        href: "/products?sale=true",
    },
];

export function HeroWithBanners() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-6 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Main Hero Slider (2/3) */}
                    <div className="lg:col-span-2 relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-[32px] bg-muted">
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
                                <img
                                    src={slides[current].image}
                                    alt={slides[current].title}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-12">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="max-w-xl"
                                >
                                    <p className="text-white/80 font-medium tracking-wider uppercase text-xs md:text-sm mb-3">
                                        {slides[current].subtitle}
                                    </p>
                                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
                                        {slides[current].title}
                                    </h1>
                                    <p className="text-base md:text-lg text-white/80 mb-6 max-w-md">
                                        {slides[current].description}
                                    </p>
                                    <Link href={slides[current].href}>
                                        <Button
                                            size="lg"
                                            className="rounded-full h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-medium group bg-white text-black hover:bg-white/90 shadow-lg"
                                        >
                                            {slides[current].cta}
                                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Slide indicators */}
                        <div className="absolute bottom-6 left-6 md:left-12 z-30 flex gap-2">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${current === i ? "bg-white w-8" : "bg-white/40 w-4"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Side Banners (1/3) */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
                        {sideBanners.map((banner, i) => {
                            const Icon = banner.icon;
                            return (
                                <motion.div
                                    key={banner.id}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                >
                                    <Link
                                        href={banner.href}
                                        className="relative block h-[192px] md:h-[242px] rounded-[24px] overflow-hidden group"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${banner.gradient} opacity-90 z-10`} />
                                        <img
                                            src={banner.image}
                                            alt={banner.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 z-20 p-5 md:p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 mb-3">
                                                    <Icon className="w-3.5 h-3.5 text-white" />
                                                    <span className="text-white text-xs font-medium">{banner.tag}</span>
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 leading-tight">
                                                    {banner.title}
                                                </h3>
                                                <p className="text-white/90 text-sm">{banner.description}</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-white text-sm font-medium">
                                                Shop now
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
