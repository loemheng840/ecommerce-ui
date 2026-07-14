"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import Link from "next/link";
import { useState, useEffect } from "react";

export function CartSheet() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = getItemCount();
  const subtotal = getTotal();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="relative hover:bg-transparent" />
        }
      >
        <ShoppingBag className="w-5 h-5" />
        {mounted && itemCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-[10px] font-bold text-primary-foreground rounded-full flex items-center justify-center translate-x-1/4 -translate-y-1/4">
            {itemCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l border-border/50">
        <SheetHeader className="p-6 border-b border-border/50">
          <SheetTitle className="text-xl font-bold">Shopping Cart {mounted && `(${itemCount})`}</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {!mounted ? null : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Continue Shopping</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-20 rounded-xl bg-muted overflow-hidden flex-shrink-0 relative">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-sm line-clamp-2">{item.product.name}</h4>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.color && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full border border-border" style={{ backgroundColor: item.color }} />
                        {item.color}
                      </span>
                    )}
                    {item.variant && <span className="mt-1 block">{item.variant}</span>}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="font-bold text-sm">${item.product.price.toFixed(2)}</span>
                    <div className="flex items-center gap-2 bg-secondary/50 rounded-full px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-background/80 text-foreground transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-background/80 text-foreground transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {mounted && items.length > 0 && (
          <div className="p-6 border-t border-border/50 bg-background/50 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Shipping and taxes calculated at checkout.</p>
            <Link href="/cart" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-full h-12 text-base font-medium">View Cart & Checkout</Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
