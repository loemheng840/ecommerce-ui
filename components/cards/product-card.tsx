"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Star, Store } from "lucide-react";
import Link from "next/link";
import { Product, useCartStore } from "@/lib/store/useCartStore";
import { toast } from "sonner";
import { stores } from "@/constants/dummy-data";

interface ProductCardProps {
  product: Product;
  index?: number;
  showProgress?: boolean;
  progressValue?: number;
}

export function ProductCard({ 
  product, 
  index = 0, 
  showProgress = false, 
  progressValue = 0 
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if clicking cart on a linked card
    addItem({
      id: product.id,
      product: product,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
  };

  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  const store = product.storeId ? stores.find(s => s.id === product.storeId) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <Card className="rounded-[24px] overflow-hidden border-border/50 group bg-card transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 h-full">
        <CardContent className="p-0 relative flex flex-col h-full">
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {discount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive font-bold px-2 py-0.5 text-xs border-0 tracking-wide">
                -{discount}%
              </Badge>
            )}
            {product.isNew && discount === 0 && (
              <Badge className="bg-primary text-primary-foreground hover:bg-primary font-bold px-2 py-0.5 text-xs border-0 uppercase tracking-wider">
                New
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors shadow-sm">
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Image */}
          <Link href={`/product/${product.id}`} className="block relative aspect-square bg-muted overflow-hidden shrink-0">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </Link>

          {/* Content */}
          <div className="p-4 md:p-5 flex flex-col flex-grow">
            {/* Store Badge */}
            {store && (
              <Link href={`/store/${store.id}`} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-1.5 bg-secondary/50 w-fit px-2 py-0.5 rounded-full border border-border/50">
                <Store className="w-3 h-3" />
                {store.name}
              </Link>
            )}

            {/* Brand */}
            {product.brand && (
                <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
            )}
            
            {/* Title */}
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-2 hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span className="text-sm font-medium">{product.rating}</span>
              {product.reviews > 0 && (
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              )}
            </div>

            {/* Price & Actions */}
            <div className="mt-auto">
              <div className="flex items-end justify-between gap-2">
                <div className="flex flex-col">
                  {product.oldPrice && (
                    <span className="text-xs text-muted-foreground line-through mb-0.5">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="font-bold text-base md:text-lg text-foreground leading-none">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                
                {!showProgress && (
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full h-8 w-8 hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Progress Bar for Deals */}
              {showProgress && (
                <div className="mt-3">
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${progressValue}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1.5 font-medium">
                    🔥 {progressValue}% sold
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
