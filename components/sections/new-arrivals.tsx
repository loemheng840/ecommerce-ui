"use client";

import { products } from "@/constants/dummy-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductCard } from "@/components/cards/product-card";

export function NewArrivals() {
  const newProducts = products.filter(p => p.isNew).slice(0, 8);

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">New Arrivals</h2>
            <p className="text-muted-foreground">The latest and greatest, curated for you.</p>
          </div>
          <Link href="/products?sort=new" className="hidden md:block text-primary font-medium hover:underline">View All</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/products?sort=new">
            <Button variant="outline" className="rounded-full">View All New Arrivals</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
