"use client";

import { useState, use } from "react";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { StoreHeader } from "@/components/store/store-header";
import { StoreTabs } from "@/components/store/store-tabs";
import { CouponCard } from "@/components/store/coupon-card";
import { SearchLayout } from "@/components/search/search-layout";
import { SearchResults } from "@/components/search/search-results";
import { stores, coupons, products, categories } from "@/constants/dummy-data";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/cards/product-card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function StorePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [activeTab, setActiveTab] = useState("home");
    const [searchFilters, setSearchFilters] = useState<any>({
        query: "",
        category: null,
        brands: [],
        minPrice: 0,
        maxPrice: 5000,
        rating: null,
        inStock: false,
        sortBy: "featured",
        storeId: id, // Critical: Filter by store
    });

    const store = stores.find((s) => s.id === id);
    if (!store) notFound();

    const storeCoupons = coupons.filter((c) => c.storeId === id);
    const storeProducts = products.filter((p) => p.storeId === id);
    const featuredProducts = storeProducts.slice(0, 4);

    // Get unique categories for this store
    const storeCategories = categories.filter((cat) =>
        storeProducts.some((p) => p.category === cat.id)
    );

    const handleSearch = (filters: any) => {
        setSearchFilters({ ...filters, storeId: id });
    };

    return (
        <>
            <Navbar />
            <main className="flex-1 pt-16 bg-background min-h-screen">
                <StoreHeader store={store} />

                {/* Coupons Section */}
                {storeCoupons.length > 0 && (
                    <div className="border-b border-border/50 bg-card">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <span className="text-primary">🎫</span> Store Coupons
                            </h2>
                            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                                {storeCoupons.map((coupon) => (
                                    <CouponCard key={coupon.id} coupon={coupon} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <StoreTabs activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Home Tab */}
                    {activeTab === "home" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-12"
                        >
                            {/* Featured Products */}
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold">Featured Products</h2>
                                    {storeProducts.length > 4 && (
                                        <button
                                            onClick={() => setActiveTab("products")}
                                            className="text-sm text-primary hover:underline font-medium"
                                        >
                                            View All ({storeProducts.length})
                                        </button>
                                    )}
                                </div>
                                {featuredProducts.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                        {featuredProducts.map((product, i) => (
                                            <ProductCard key={product.id} product={product} index={i} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 rounded-[24px] bg-card border border-border/50">
                                        <p className="text-muted-foreground">No products available yet</p>
                                    </div>
                                )}
                            </section>

                            {/* Quick Categories */}
                            {storeCategories.length > 0 && (
                                <section>
                                    <h2 className="text-xl font-bold mb-6">Shop by Category</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {storeCategories.map((category, i) => (
                                            <motion.div
                                                key={category.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                            >
                                                <Link
                                                    href={`/products?category=${category.id}&storeId=${id}`}
                                                    className="block group"
                                                >
                                                    <div className="relative aspect-square rounded-2xl overflow-hidden border border-border/50 bg-card">
                                                        <img
                                                            src={category.image}
                                                            alt={category.name}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                        <div className="absolute bottom-4 left-4 right-4">
                                                            <h3 className="font-semibold text-white text-sm md:text-base">
                                                                {category.name}
                                                            </h3>
                                                            <p className="text-xs text-white/80">
                                                                {storeProducts.filter((p) => p.category === category.id).length} items
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Store Stats */}
                            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-card rounded-2xl border border-border/50 p-6 text-center">
                                    <p className="text-3xl font-bold text-primary">{storeProducts.length}</p>
                                    <p className="text-sm text-muted-foreground mt-1">Products</p>
                                </div>
                                <div className="bg-card rounded-2xl border border-border/50 p-6 text-center">
                                    <p className="text-3xl font-bold text-primary">{store.rating}</p>
                                    <p className="text-sm text-muted-foreground mt-1">Rating</p>
                                </div>
                                <div className="bg-card rounded-2xl border border-border/50 p-6 text-center">
                                    <p className="text-3xl font-bold text-primary">
                                        {(store.followers / 1000).toFixed(1)}k
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">Followers</p>
                                </div>
                                <div className="bg-card rounded-2xl border border-border/50 p-6 text-center">
                                    <p className="text-3xl font-bold text-primary">{storeCoupons.length}</p>
                                    <p className="text-sm text-muted-foreground mt-1">Active Coupons</p>
                                </div>
                            </section>
                        </motion.div>
                    )}

                    {/* Products Tab */}
                    {activeTab === "products" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <SearchLayout
                                onSearch={handleSearch}
                                title={`${store.name} Products`}
                                description="Browse all products from this store"
                            >
                                <SearchResults filters={searchFilters} />
                            </SearchLayout>
                        </motion.div>
                    )}

                    {/* Categories Tab */}
                    {activeTab === "categories" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h2 className="text-xl font-bold mb-6">All Categories</h2>
                            {storeCategories.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {storeCategories.map((category, i) => (
                                        <motion.div
                                            key={category.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: i * 0.05 }}
                                        >
                                            <Link
                                                href={`/products?category=${category.id}&storeId=${id}`}
                                                className="block group"
                                            >
                                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 bg-card">
                                                    <img
                                                        src={category.image}
                                                        alt={category.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                    <div className="absolute bottom-4 left-4 right-4">
                                                        <h3 className="font-semibold text-white">{category.name}</h3>
                                                        <p className="text-sm text-white/80">
                                                            {storeProducts.filter((p) => p.category === category.id).length} items
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 rounded-[24px] bg-card border border-border/50">
                                    <p className="text-muted-foreground">No categories available</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
