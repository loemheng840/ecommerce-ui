"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCartStore, type CartItem } from "@/lib/store/useCartStore";
import {
    Minus,
    Plus,
    ShoppingBag,
    ChevronDown,
    Repeat,
    CreditCard,
    Ticket,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

/* -------------------------------------------------------------------------- */
/*  Color helpers — show readable names instead of raw hex in the selector     */
/* -------------------------------------------------------------------------- */

// Maps known hex values (and friendly aliases) to human-readable names so the
// color dropdown never shows raw codes like "#1F2232".
const COLOR_NAMES: Record<string, string> = {
    "#000000": "Black",
    "#FFFFFF": "White",
    "#F4F4F4": "Silver",
    "#C0C0C0": "Silver",
    "#1F2232": "Midnight",
    "#2C2C2C": "Space Gray",
    "#5E5E5E": "Gray",
    "#DCD7C9": "Sand",
    "#A27B5C": "Tan",
    "#3F4E4F": "Forest",
    "#8B4513": "Brown",
    "#FF5733": "Coral",
    // Friendly aliases → normalized hex so named seeds dedupe with hex options.
    silver: "#F4F4F4",
    black: "#000000",
    white: "#FFFFFF",
};

// Resolve any incoming color value to a canonical hex when possible.
function normalizeColor(value: string): string {
    const alias = COLOR_NAMES[value.toLowerCase()];
    return alias && alias.startsWith("#") ? alias : value;
}

function colorLabel(value: string): string {
    if (value.startsWith("#")) return COLOR_NAMES[value.toUpperCase()] ?? value;
    // Named value: title-case it.
    return value.charAt(0).toUpperCase() + value.slice(1);
}

/* -------------------------------------------------------------------------- */
/*  Line item row — flat row with inline editing + height-collapse on remove   */
/* -------------------------------------------------------------------------- */

function CartItemRow({
    item,
    onRemove,
    onQuantityChange,
    onOptionsChange,
}: {
    item: CartItem;
    onRemove: (id: string) => void;
    onQuantityChange: (id: string, quantity: number) => void;
    onOptionsChange: (id: string, options: { color?: string; variant?: string }) => void;
}) {
    const [isRemoving, setIsRemoving] = useState(false);
    // Only set while collapsing; left undefined otherwise so the row keeps its
    // natural height and can't clip when a variant/color change resizes it.
    const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
    const rowRef = useRef<HTMLDivElement>(null);

    // Normalize product colors and the selected color to canonical hex, then
    // dedupe so a named seed (e.g. "Silver") doesn't double up with its hex.
    const productColors = (item.product.colors ?? []).map(normalizeColor);
    const selectedColor = item.color ? normalizeColor(item.color) : undefined;
    const colors = Array.from(
        new Set(
            selectedColor && !productColors.includes(selectedColor)
                ? [selectedColor, ...productColors]
                : productColors
        )
    );
    const variants = item.product.variants ?? [];

    const handleRemove = () => {
        // Lock in the current height first so the transition has a start value,
        // then collapse to 0 on the next frame.
        setMaxHeight(rowRef.current?.scrollHeight);
        requestAnimationFrame(() => setIsRemoving(true));
        // Wait for the collapse animation before mutating the store.
        window.setTimeout(() => onRemove(item.id), 320);
    };

    return (
        <div
            ref={rowRef}
            style={{ maxHeight: isRemoving ? 0 : maxHeight }}
            className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRemoving ? "opacity-0 -translate-y-1" : "opacity-100"
                }`}
        >
            <div className="flex gap-4 md:gap-6 py-6">
                {/* Image */}
                <Link href={`/product/${item.product.id}`} className="shrink-0">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-[16px] bg-muted overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <Link href={`/product/${item.product.id}`}>
                                <h3 className="font-medium text-[15px] md:text-base tracking-tight hover:text-primary transition-colors line-clamp-2">
                                    {item.product.name}
                                </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {item.product.brand}
                            </p>
                        </div>
                        <span className="font-medium text-[15px] md:text-base tabular-nums shrink-0">
                            ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                    </div>

                    {/* Inline editors */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                        {/* Quantity stepper */}
                        <div className="flex items-center gap-1 rounded-full border border-border/70 px-1 h-9">
                            <button
                                onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors cursor-pointer disabled:opacity-40"
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                            >
                                <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center tabular-nums">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                            >
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Color selector */}
                        {colors.length > 0 && (
                            <Select
                                value={selectedColor}
                                onValueChange={(value) =>
                                    onOptionsChange(item.id, { color: value as string })
                                }
                            >
                                <SelectTrigger className="h-9 rounded-full border-border/70 text-sm">
                                    <SelectValue placeholder="Color">
                                        <span className="flex items-center gap-1.5">
                                            {selectedColor && (
                                                <span
                                                    className="w-3.5 h-3.5 rounded-full border border-border"
                                                    style={{ backgroundColor: selectedColor }}
                                                />
                                            )}
                                            {selectedColor ? colorLabel(selectedColor) : "Color"}
                                        </span>
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent className="rounded-[14px]">
                                    {colors.map((color) => (
                                        <SelectItem key={color} value={color}>
                                            <span className="flex items-center gap-2">
                                                <span
                                                    className="w-3.5 h-3.5 rounded-full border border-border"
                                                    style={{ backgroundColor: color }}
                                                />
                                                {colorLabel(color)}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {/* Variant selector */}
                        {variants.length > 0 && (
                            <Select
                                value={item.variant}
                                onValueChange={(value) =>
                                    onOptionsChange(item.id, { variant: value as string })
                                }
                            >
                                <SelectTrigger className="h-9 rounded-full border-border/70 text-sm">
                                    <SelectValue placeholder="Option" />
                                </SelectTrigger>
                                <SelectContent className="rounded-[18px]">
                                    {variants.map((variant) => (
                                        <SelectItem key={variant} value={variant}>
                                            {variant}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {/* Remove — text link, not a navigating button */}
                        <button
                            onClick={handleRemove}
                            className="ml-auto text-sm text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  Expandable disclosure row inside the summary (trade-in / financing / promo) */
/* -------------------------------------------------------------------------- */

function DisclosureRow({
    icon: Icon,
    label,
    children,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="border-t border-border/60">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center gap-3 py-3.5 text-left cursor-pointer group"
            >
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium flex-1">{label}</span>
                <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>
            <div
                style={{ maxHeight: open ? contentRef.current?.scrollHeight ?? 200 : 0 }}
                className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
                <div ref={contentRef} className="pb-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  Cross-fading amount — remounts on value change for a soft number swap       */
/* -------------------------------------------------------------------------- */

function AnimatedAmount({ value, className }: { value: string; className?: string }) {
    return (
        <span key={value} className={`inline-block animate-in fade-in duration-300 ${className ?? ""}`}>
            {value}
        </span>
    );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function CartPage() {
    const { items, removeItem, updateQuantity, updateOptions, getTotal } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [promoCode, setPromoCode] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <>
                <Navbar />
                <main className="flex-1 pt-24 pb-16 bg-background">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="animate-pulse space-y-6">
                            <div className="h-8 bg-muted rounded w-48" />
                            <div className="h-24 bg-muted rounded-[24px]" />
                            <div className="h-24 bg-muted rounded-[24px]" />
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const subtotal = getTotal();
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    /* ------------------------------- Empty state ------------------------------ */
    if (items.length === 0) {
        return (
            <>
                <Navbar />
                <main className="flex-1 pt-24 pb-16 bg-background">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-center text-center min-h-[55vh]">
                            <ShoppingBag className="w-14 h-14 text-muted-foreground/30 mb-6" strokeWidth={1.25} />
                            <p className="text-xl font-medium tracking-tight mb-6">Your bag is empty</p>
                            <Link href="/products">
                                <Button className="rounded-full h-12 px-8">Continue Shopping</Button>
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    /* ----------------------------------- Cart ---------------------------------- */
    return (
        <>
            <Navbar />
            <main className="flex-1 pt-24 pb-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">
                        Your Bag
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.85fr_1fr] gap-8 lg:gap-16 items-start">
                        {/* Line items — flat rows with hairline dividers */}
                        <div className="divide-y divide-border/60 border-t border-border/60">
                            {items.map((item) => (
                                <CartItemRow
                                    key={item.id}
                                    item={item}
                                    onRemove={removeItem}
                                    onQuantityChange={updateQuantity}
                                    onOptionsChange={updateOptions}
                                />
                            ))}
                        </div>

                        {/* Sticky order summary */}
                        <div className="lg:sticky lg:top-24">
                            <h2 className="text-lg font-semibold tracking-tight mb-5">
                                Order Summary
                            </h2>

                            <div className="space-y-3.5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <AnimatedAmount
                                        value={`$${subtotal.toFixed(2)}`}
                                        className="font-medium tabular-nums"
                                    />
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="font-medium tabular-nums">
                                        {shipping === 0 ? (
                                            <span className="text-success">Free</span>
                                        ) : (
                                            `$${shipping.toFixed(2)}`
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax</span>
                                    <AnimatedAmount
                                        value={`$${tax.toFixed(2)}`}
                                        className="font-medium tabular-nums"
                                    />
                                </div>
                            </div>

                            {shipping > 0 && (
                                <p className="text-xs text-muted-foreground mt-4">
                                    Add ${(100 - subtotal).toFixed(2)} more to qualify for free shipping.
                                </p>
                            )}

                            <div className="flex justify-between items-baseline mt-5 pt-5 border-t border-border">
                                <span className="font-semibold">Total</span>
                                <AnimatedAmount
                                    value={`$${total.toFixed(2)}`}
                                    className="font-semibold text-2xl tracking-tight tabular-nums"
                                />
                            </div>

                            {/* Collapsed disclosure rows — quiet until opted into */}
                            <div className="mt-6">
                                <DisclosureRow icon={Repeat} label="Add a trade-in">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Trade in an eligible device and get credit toward your order.
                                        Estimate your device&apos;s value to see how much you could save.
                                    </p>
                                    <Button variant="outline" className="rounded-full h-9 mt-3 text-sm">
                                        Get an estimate
                                    </Button>
                                </DisclosureRow>

                                <DisclosureRow icon={CreditCard} label="Financing options">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Pay over time, interest-free. Choose monthly installments at
                                        checkout for eligible orders.
                                    </p>
                                    <Button variant="outline" className="rounded-full h-9 mt-3 text-sm">
                                        See if you prequalify
                                    </Button>
                                </DisclosureRow>

                                <DisclosureRow icon={Ticket} label="Promo code">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Enter code"
                                            className="flex-1 h-9 rounded-full border border-border/70 bg-transparent px-4 text-sm outline-none focus:border-ring transition-colors"
                                        />
                                        <Button
                                            variant="outline"
                                            className="rounded-full h-9 text-sm"
                                            disabled={!promoCode.trim()}
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </DisclosureRow>
                            </div>

                            {/* Primary actions — Check Out is the only solid button */}
                            <div className="mt-8 flex flex-col items-center gap-4">
                                <Link href="/checkout" className="w-full">
                                    <Button className="w-full rounded-full h-14 text-base font-medium">
                                        Check Out
                                    </Button>
                                </Link>
                                <Link
                                    href="/products"
                                    className="text-sm font-medium text-primary hover:opacity-80 transition-opacity"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
