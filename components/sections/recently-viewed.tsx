"use client";

import { motion } from "framer-motion";
import { products } from "@/constants/dummy-data";
import { Clock } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/cards/product-card";

export function RecentlyViewed() {
    // In real app, this would come from localStorage or user history API
    const recentlyViewed = products.slice(0, 6);

    return (
        <section className="py-16 md:py-20 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Recently Viewed</h2>
                            <p className="text-sm text-muted-foreground">Pick up where you left off</p>
                        </div>
                    </div>
                    <Link href="/dashboard" className="hidden md:block text-primary text-sm font-medium hover:underline">
                        View History
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {recentlyViewed.slice(0, 4).map((product, i) => (
                        <ProductCard key={product.id} product={product} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
