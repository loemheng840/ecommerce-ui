"use client";

import { use, useState } from "react";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { products, reviews } from "@/constants/dummy-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Star,
    ShoppingBag,
    Heart,
    Truck,
    Shield,
    RotateCcw,
    Minus,
    Plus,
    Check,
} from "lucide-react";
import { useCartStore, type Product, type CartItem } from "@/lib/store/useCartStore";
import Link from "next/link";
import { toast } from "sonner";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = products.find((p) => p.id === id);
    const { addItem } = useCartStore();

    const [selectedColor, setSelectedColor] = useState<string | null>(
        product?.colors?.[0] || null
    );
    const [selectedVariant, setSelectedVariant] = useState<string | null>(
        product?.variants?.[0] || null
    );
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

    if (!product) {
        return (
            <>
                <Navbar />
                <main className="flex-1 pt-32 pb-24 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                        <Link href="/products">
                            <Button className="rounded-full">Back to Shop</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const handleAddToCart = () => {
        const itemId = `${product.id}-${selectedColor || "default"}-${selectedVariant || "default"}`;
        const cartItem: CartItem = {
            id: itemId,
            product: product as Product,
            quantity,
            color: selectedColor || undefined,
            variant: selectedVariant || undefined,
        };
        addItem(cartItem);
        toast.success(`${product.name} added to cart`);
    };

    const relatedProducts = products.filter(
        (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4);

    return (
        <>
            <Navbar />
            <main className="flex-1 pt-24 pb-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
                        <span>/</span>
                        <span className="text-foreground font-medium truncate">{product.name}</span>
                    </nav>

                    {/* Product Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
                        {/* Image */}
                        <div className="relative rounded-[32px] overflow-hidden bg-muted aspect-square">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {product.oldPrice && (
                                <Badge className="absolute top-6 left-6 bg-destructive text-destructive-foreground rounded-full px-3 py-1 text-xs font-bold uppercase">
                                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% Off
                                </Badge>
                            )}
                            <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-2">
                                    {product.brand}
                                </p>
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(product.rating)
                                                        ? "fill-primary text-primary"
                                                        : "text-border"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium">{product.rating}</span>
                                    <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                                </div>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                                    {product.oldPrice && (
                                        <span className="text-xl text-muted-foreground line-through">
                                            ${product.oldPrice.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Colors */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-sm mb-3">Color</h3>
                                    <div className="flex gap-3">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === color
                                                        ? "border-primary scale-110"
                                                        : "border-border hover:border-primary/50"
                                                    }`}
                                                style={{ backgroundColor: color }}
                                            >
                                                {selectedColor === color && (
                                                    <Check
                                                        className={`w-4 h-4 ${color === "#FFFFFF" || color === "#F4F4F4"
                                                                ? "text-foreground"
                                                                : "text-white"
                                                            }`}
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Variants */}
                            {product.variants && product.variants.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-sm mb-3">
                                        {product.category === "fashion" ? "Size" : "Storage"}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.variants.map((variant) => (
                                            <button
                                                key={variant}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${selectedVariant === variant
                                                        ? "border-primary bg-primary text-primary-foreground"
                                                        : "border-border bg-secondary/50 hover:border-primary/50"
                                                    }`}
                                            >
                                                {variant}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity */}
                            <div className="mb-8">
                                <h3 className="font-semibold text-sm mb-3">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-3 bg-secondary/50 rounded-full px-4 py-2 border border-border/50">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center font-medium">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                    </span>
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <div className="flex gap-3 mb-8">
                                <Button
                                    onClick={handleAddToCart}
                                    className="flex-1 rounded-full h-14 text-base font-medium gap-2 shadow-xl hover:scale-[1.02] transition-transform"
                                    disabled={product.stock === 0}
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                    Add to Cart
                                </Button>
                                <Button variant="outline" className="rounded-full h-14 px-6">
                                    <Heart className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-4 p-4 rounded-[20px] bg-secondary/30 border border-border/50">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Truck className="w-5 h-5 text-primary" />
                                    <span className="text-xs text-muted-foreground">Free Shipping</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Shield className="w-5 h-5 text-primary" />
                                    <span className="text-xs text-muted-foreground">2 Year Warranty</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <RotateCcw className="w-5 h-5 text-primary" />
                                    <span className="text-xs text-muted-foreground">30 Day Returns</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs: Description & Reviews */}
                    <div className="mb-20">
                        <div className="flex gap-6 border-b border-border mb-8">
                            <button
                                onClick={() => setActiveTab("description")}
                                className={`pb-4 text-sm font-medium transition-colors border-b-2 ${activeTab === "description"
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                Description
                            </button>
                            <button
                                onClick={() => setActiveTab("reviews")}
                                className={`pb-4 text-sm font-medium transition-colors border-b-2 ${activeTab === "reviews"
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                Reviews ({product.reviews})
                            </button>
                        </div>

                        {activeTab === "description" ? (
                            <div className="max-w-3xl">
                                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                            </div>
                        ) : (
                            <div className="max-w-3xl space-y-6">
                                {reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="p-6 rounded-[20px] bg-card border border-border/50"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <span className="text-xs font-bold text-primary">
                                                        {review.user.charAt(0)}
                                                    </span>
                                                </div>
                                                <span className="font-medium text-sm">{review.user}</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">{review.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating
                                                            ? "fill-primary text-primary"
                                                            : "text-border"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{review.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight mb-8">You May Also Like</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                {relatedProducts.map((rp) => (
                                    <Link key={rp.id} href={`/product/${rp.id}`}>
                                        <div className="rounded-[24px] overflow-hidden bg-card border border-border/50 group hover:border-primary/30 transition-colors">
                                            <div className="aspect-square bg-muted overflow-hidden">
                                                <img
                                                    src={rp.image}
                                                    alt={rp.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-sm line-clamp-1">{rp.name}</h3>
                                                <p className="text-sm font-bold mt-1">${rp.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
