"use client";

import { products } from "@/constants/dummy-data";
import { ProductCard } from "@/components/cards/product-card";
import type { Product } from "@/lib/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "../_components/dashboard-header";

export default function WishlistPage() {
  const wishlistItems = products.slice(2, 6) as Product[]; // Just grab a few

  if (wishlistItems.length === 0) {
    return (
      <div>
        <DashboardHeader title="Wishlist" description="Items saved for later." />
        <div className="flex flex-col items-center justify-center text-center py-20">
          <Heart className="w-12 h-12 text-muted-foreground/30 mb-5" strokeWidth={1.25} />
          <p className="text-lg font-medium tracking-tight mb-5">Your wishlist is empty</p>
          <Link href="/products">
            <Button className="rounded-full h-11 px-6">Explore Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader
        title="Wishlist"
        description={`${wishlistItems.length} items saved for later.`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
