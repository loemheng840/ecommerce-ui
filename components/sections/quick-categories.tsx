"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Laptop,
    Shirt,
    Home,
    Dumbbell,
    Sparkles,
    Gift,
    Headphones,
    Watch,
    Camera,
    Book,
    Gamepad2,
    Baby,
} from "lucide-react";

const quickCategories = [
    { id: "electronics", name: "Electronics", icon: Laptop, color: "bg-blue-100 text-blue-600" },
    { id: "fashion", name: "Fashion", icon: Shirt, color: "bg-pink-100 text-pink-600" },
    { id: "home", name: "Home", icon: Home, color: "bg-amber-100 text-amber-600" },
    { id: "sports", name: "Sports", icon: Dumbbell, color: "bg-green-100 text-green-600" },
    { id: "beauty", name: "Beauty", icon: Sparkles, color: "bg-purple-100 text-purple-600" },
    { id: "gifts", name: "Gifts", icon: Gift, color: "bg-red-100 text-red-600" },
    { id: "audio", name: "Audio", icon: Headphones, color: "bg-indigo-100 text-indigo-600" },
    { id: "watches", name: "Watches", icon: Watch, color: "bg-slate-100 text-slate-600" },
    { id: "cameras", name: "Cameras", icon: Camera, color: "bg-orange-100 text-orange-600" },
    { id: "books", name: "Books", icon: Book, color: "bg-teal-100 text-teal-600" },
    { id: "gaming", name: "Gaming", icon: Gamepad2, color: "bg-violet-100 text-violet-600" },
    { id: "kids", name: "Kids", icon: Baby, color: "bg-rose-100 text-rose-600" },
];

export function QuickCategories() {
    return (
        <section className="py-8 bg-background border-b border-border/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:justify-between">
                    {quickCategories.map((category, i) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.03 }}
                            >
                                <Link
                                    href={`/products?category=${category.id}`}
                                    className="flex flex-col items-center gap-2 min-w-[70px] md:min-w-[80px] group"
                                >
                                    <div
                                        className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${category.color} flex items-center justify-center transition-transform group-hover:scale-110 group-hover:shadow-md`}
                                    >
                                        <Icon className="w-6 h-6 md:w-7 md:h-7" />
                                    </div>
                                    <span className="text-xs md:text-sm font-medium text-center whitespace-nowrap">
                                        {category.name}
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
