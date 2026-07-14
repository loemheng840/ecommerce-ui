"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PackageOpen } from "lucide-react";
import { ProductCard } from "@/components/cards/product-card";
import { products as localProducts } from "@/constants/dummy-data";
import type { Product } from "@/lib/store/useCartStore";
import {
    searchStoreProducts,
    type StoreSearchParams,
    type StoreSearchResultItem,
} from "@/lib/api/store-search";

const PAGE_SIZE = 12;

export interface StoreProductFilters {
    query?: string;
    category?: string | null;
    brands?: string[];
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    sortBy?: string;
}

interface StoreProductsProps {
    storeId: string;
    filters: StoreProductFilters;
}

/** Map the sidebar's filter object to the backend search params. */
function toSearchParams(
    filters: StoreProductFilters,
    page: number
): StoreSearchParams {
    return {
        keyword: filters.query,
        categoryId: filters.category ?? undefined,
        brandIds: filters.brands,
        minPrice: filters.minPrice && filters.minPrice > 0 ? filters.minPrice : undefined,
        maxPrice: filters.maxPrice && filters.maxPrice < 5000 ? filters.maxPrice : undefined,
        inStockOnly: filters.inStock,
        sortBy: filters.sortBy,
        page,
        size: PAGE_SIZE,
    };
}

/**
 * Enrich a backend search row into the full Product shape ProductCard expects.
 * When the row corresponds to a known local product we reuse its rich fields
 * (rating, brand, images); otherwise we synthesize sensible defaults.
 */
function toProduct(item: StoreSearchResultItem): Product {
    const local = localProducts.find((p) => p.id === item.productId);
    if (local) return local as Product;
    return {
        id: item.productId,
        name: item.name,
        brand: item.brandId ?? "",
        price: item.price,
        image: item.thumbnail ?? "",
        images: item.thumbnail ? [item.thumbnail] : [],
        rating: 0,
        reviews: 0,
        description: "",
    };
}

/** Client-side fallback so the page still works without a live backend. */
function localFallback(
    storeId: string,
    filters: StoreProductFilters,
    page: number
): { items: Product[]; total: number } {
    let list = localProducts.filter((p) => p.storeId === storeId);

    if (filters.query) {
        const q = filters.query.toLowerCase();
        list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (filters.category) {
        list = list.filter((p) => p.category === filters.category);
    }
    if (filters.brands && filters.brands.length > 0) {
        list = list.filter((p) => filters.brands!.includes(p.brand.toLowerCase()));
    }
    if (filters.minPrice) list = list.filter((p) => p.price >= filters.minPrice!);
    if (filters.maxPrice && filters.maxPrice < 5000) {
        list = list.filter((p) => p.price <= filters.maxPrice!);
    }
    if (filters.inStock) list = list.filter((p) => (p.stock ?? 0) > 0);

    switch (filters.sortBy) {
        case "price-asc":
            list = [...list].sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            list = [...list].sort((a, b) => b.price - a.price);
            break;
        case "rating":
            list = [...list].sort((a, b) => b.rating - a.rating);
            break;
    }

    const start = (page - 1) * PAGE_SIZE;
    return {
        items: list.slice(start, start + PAGE_SIZE) as Product[],
        total: list.length,
    };
}

function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-[24px] border border-border/50 bg-card overflow-hidden"
                >
                    <Skeleton className="aspect-square rounded-none" />
                    <div className="p-4 md:p-5 space-y-3">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="flex items-center justify-between pt-2">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function StoreProducts({ storeId, filters }: StoreProductsProps) {
    const [items, setItems] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const load = useCallback(
        async (pageNum: number) => {
            setLoading(true);
            try {
                const res = await searchStoreProducts(
                    storeId,
                    toSearchParams(filters, pageNum)
                );
                setItems(res.content.map(toProduct));
                setTotal(res.totalElements);
            } catch {
                // Backend unavailable — fall back to the local dataset so the
                // store still renders its own products.
                const { items: localItems, total: localTotal } = localFallback(
                    storeId,
                    filters,
                    pageNum
                );
                setItems(localItems);
                setTotal(localTotal);
            } finally {
                setLoading(false);
            }
        },
        [storeId, filters]
    );

    useEffect(() => {
        setPage(1);
        load(1);
    }, [load]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    const goToPage = (next: number) => {
        setPage(next);
        load(next);
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-5 w-40" />
                <ProductGridSkeleton />
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center text-center py-20 rounded-[24px] bg-card border border-border/50">
                <PackageOpen className="w-10 h-10 text-muted-foreground/30 mb-3" strokeWidth={1.25} />
                <h3 className="text-lg font-semibold tracking-tight mb-1">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground tabular-nums">{items.length}</span> of{" "}
                <span className="font-semibold text-foreground tabular-nums">{total}</span> products
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {items.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-8">
                    <Button
                        variant="outline"
                        onClick={() => page > 1 && goToPage(page - 1)}
                        disabled={page <= 1}
                        className="rounded-full"
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground tabular-nums">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        onClick={() => page < totalPages && goToPage(page + 1)}
                        disabled={page >= totalPages}
                        className="rounded-full"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
