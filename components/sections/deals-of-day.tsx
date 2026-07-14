"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { products } from "@/constants/dummy-data";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/cards/product-card";

export function DealsOfDay() {
    const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 45, seconds: 20 });

    // Get products with discounts
    const deals = products.filter((p) => p.oldPrice).slice(0, 6);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-16 md:py-20 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-4 py-1.5 mb-3">
                            <Flame className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Deal of the Day</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                            Grab Them Before They&apos;re Gone
                        </h2>
                        <p className="text-muted-foreground">Exclusive deals ending in:</p>
                    </div>

                    {/* Countdown */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="flex flex-col items-center bg-white dark:bg-card rounded-2xl p-3 md:p-4 w-16 md:w-20 shadow-md border border-border/50">
                            <span className="text-2xl md:text-3xl font-bold text-orange-600">
                                {String(timeLeft.hours).padStart(2, "0")}
                            </span>
                            <span className="text-[10px] md:text-xs text-muted-foreground mt-1 uppercase font-medium">
                                Hours
                            </span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-orange-500">:</div>
                        <div className="flex flex-col items-center bg-white dark:bg-card rounded-2xl p-3 md:p-4 w-16 md:w-20 shadow-md border border-border/50">
                            <span className="text-2xl md:text-3xl font-bold text-orange-600">
                                {String(timeLeft.minutes).padStart(2, "0")}
                            </span>
                            <span className="text-[10px] md:text-xs text-muted-foreground mt-1 uppercase font-medium">
                                Mins
                            </span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-orange-500">:</div>
                        <div className="flex flex-col items-center bg-white dark:bg-card rounded-2xl p-3 md:p-4 w-16 md:w-20 shadow-md border border-border/50">
                            <span className="text-2xl md:text-3xl font-bold text-orange-600">
                                {String(timeLeft.seconds).padStart(2, "0")}
                            </span>
                            <span className="text-[10px] md:text-xs text-muted-foreground mt-1 uppercase font-medium">
                                Secs
                            </span>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {deals.slice(0, 4).map((product, i) => {
                        const discount = product.oldPrice
                            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
                            : 0;
                        return (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                index={i} 
                                showProgress={true} 
                                progressValue={60 + i * 5} 
                            />
                        );
                    })}
                </div>

                {/* View All Button */}
                <div className="mt-8 text-center">
                    <Link href="/products?sale=true">
                        <Button className="rounded-full h-12 px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white border-0">
                            View All Deals
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
