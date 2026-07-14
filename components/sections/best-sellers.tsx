"use client";

import { motion } from "framer-motion";
import { products } from "@/constants/dummy-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingBag, Heart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { ProductCard } from "@/components/cards/product-card";

export function BestSellers() {
  const bestSellers = products.filter(p => p.isBestseller);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Best Sellers</h2>
            <p className="text-muted-foreground">Our most popular products.</p>
          </div>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {bestSellers.map((product, i) => (
              <CarouselItem key={product.id} className="pl-4 md:pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard product={product} index={i} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-end gap-2 mt-8">
            <CarouselPrevious className="relative inset-auto translate-x-0 translate-y-0 w-12 h-12 rounded-full border-border bg-background hover:bg-secondary" />
            <CarouselNext className="relative inset-auto translate-x-0 translate-y-0 w-12 h-12 rounded-full border-border bg-background hover:bg-secondary" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
