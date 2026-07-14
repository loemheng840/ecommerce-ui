"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { products, categories } from "@/constants/dummy-data";
import Link from "next/link";
import { toast } from "sonner";
import { useCartStore, type Product, type CartItem } from "@/lib/store/useCartStore";
import { ProductCard } from "@/components/cards/product-card";

// Mock API response structure matching backend
interface SearchApiResponse {
    products: any[];
    total: number;
    page: number;
    size: number;
    facets: {
        categories: Array<{ id: string; name: string; count: number }>;
        brands: Array<{ id: string; name: string; count: number }>;
        priceRanges: Array<{ min: number; max: number; count: number }>;
        ratings: Array<{ value: number; count: number }>;
    };
}

interface SearchFilters {
    query: string;
    category: string | null;
    brands: string[];
    minPrice: number;
    maxPrice: number;
    rating: number | null;
    inStock: boolean;
    sortBy: string;
    storeId?: string;
}

interface SearchResultsProps {
    filters: SearchFilters;
}

export function SearchResults({ filters }: SearchResultsProps) {
    const [results, setResults] = useState<SearchApiResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const { addItem } = useCartStore();

    // Mock API call to your backend
    const searchProducts = async (searchFilters: SearchFilters, pageNum: number) => {
        setLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // This would be your actual API call:
        // const queryParams = new URLSearchParams();
        // if (searchFilters.query) queryParams.append("query", searchFilters.query);
        // if (searchFilters.category) queryParams.append("category", searchFilters.category);
        // if (searchFilters.brands.length > 0) queryParams.append("brands", searchFilters.brands.join(","));
        // if (searchFilters.minPrice > 0) queryParams.append("minPrice", searchFilters.minPrice.toString());
        // if (searchFilters.maxPrice < 5000) queryParams.append("maxPrice", searchFilters.maxPrice.toString());
        // if (searchFilters.rating) queryParams.append("minRating", searchFilters.rating.toString());
        // if (!searchFilters.inStock) queryParams.append("inStock", "false");
        // if (searchFilters.sortBy) queryParams.append("sortBy", searchFilters.sortBy);
        // queryParams.append("page", pageNum.toString());
        // queryParams.append("size", "12");

        // const response = await fetch(`/api/v1/search/products?${queryParams}`);
        // const data = await response.json();

        // Mock response based on your backend structure
        const filteredProducts = products.filter(product => {
            if (searchFilters.query && !product.name.toLowerCase().includes(searchFilters.query.toLowerCase())) {
                return false;
            }
            if (searchFilters.category && product.category !== searchFilters.category) {
                return false;
            }
            if (searchFilters.brands.length > 0 && !searchFilters.brands.includes(product.brand.toLowerCase())) {
                return false;
            }
            if (product.price < searchFilters.minPrice || product.price > searchFilters.maxPrice) {
                return false;
            }
            if (searchFilters.rating && product.rating < searchFilters.rating) {
                return false;
            }
            if (searchFilters.inStock && product.stock <= 0) {
                return false;
            }
            if (searchFilters.storeId && product.storeId !== searchFilters.storeId) {
                return false;
            }
            return true;
        });

        // Sort based on sortBy
        let sortedProducts = [...filteredProducts];
        switch (searchFilters.sortBy) {
            case "price-asc":
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
            case "newest":
                sortedProducts = [...sortedProducts.filter(p => p.isNew), ...sortedProducts.filter(p => !p.isNew)];
                break;
            case "bestseller":
                sortedProducts = [...sortedProducts.filter(p => p.isBestseller), ...sortedProducts.filter(p => !p.isBestseller)];
                break;
        }

        const startIdx = (pageNum - 1) * 12;
        const paginatedProducts = sortedProducts.slice(startIdx, startIdx + 12);

        const mockResponse: SearchApiResponse = {
            products: paginatedProducts,
            total: sortedProducts.length,
            page: pageNum,
            size: 12,
            facets: {
                categories: [
                    { id: "electronics", name: "Electronics", count: sortedProducts.filter(p => p.category === "electronics").length },
                    { id: "fashion", name: "Fashion", count: sortedProducts.filter(p => p.category === "fashion").length },
                    { id: "home", name: "Home & Living", count: sortedProducts.filter(p => p.category === "home").length },
                    { id: "sports", name: "Sports", count: sortedProducts.filter(p => p.category === "sports").length },
                    { id: "beauty", name: "Beauty", count: sortedProducts.filter(p => p.category === "beauty").length },
                ],
                brands: [
                    { id: "apple", name: "Apple", count: sortedProducts.filter(p => p.brand === "Apple").length },
                    { id: "sony", name: "Sony", count: sortedProducts.filter(p => p.brand === "Sony").length },
                    { id: "keychron", name: "Keychron", count: sortedProducts.filter(p => p.brand === "Keychron").length },
                    { id: "garmin", name: "Garmin", count: sortedProducts.filter(p => p.brand === "Garmin").length },
                    { id: "bellroy", name: "Bellroy", count: sortedProducts.filter(p => p.brand === "Bellroy").length },
                ],
                priceRanges: [
                    { min: 0, max: 50, count: sortedProducts.filter(p => p.price < 50).length },
                    { min: 50, max: 200, count: sortedProducts.filter(p => p.price >= 50 && p.price < 200).length },
                    { min: 200, max: 500, count: sortedProducts.filter(p => p.price >= 200 && p.price < 500).length },
                    { min: 500, max: 5000, count: sortedProducts.filter(p => p.price >= 500).length },
                ],
                ratings: [
                    { value: 5, count: sortedProducts.filter(p => p.rating >= 4.5).length },
                    { value: 4, count: sortedProducts.filter(p => p.rating >= 4 && p.rating < 4.5).length },
                    { value: 3, count: sortedProducts.filter(p => p.rating >= 3 && p.rating < 4).length },
                ],
            },
        };

        setResults(mockResponse);
        setLoading(false);
    };

    useEffect(() => {
        if (filters) {
            setPage(1);
            searchProducts(filters, 1);
        }
    }, [filters]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        searchProducts(filters, nextPage);
    };

    const handleAddToCart = (product: typeof products[0]) => {
        const cartItem: CartItem = {
            id: product.id + "-default",
            product: product as Product,
            quantity: 1,
        };
        addItem(cartItem);
        toast.success(`${product.name} added to cart`);
    };

    if (loading && !results) {
        return (
            <div className="py-20 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-muted-foreground">Searching products...</p>
            </div>
        );
    }

    if (!results) {
        return null;
    }

    const totalPages = Math.ceil(results.total / results.size);

    return (
        <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-muted-foreground">
                        Found <span className="font-bold text-foreground">{results.total}</span> products
                        {filters.query && (
                            <> for "<span className="font-bold text-foreground">{filters.query}</span>"</>
                        )}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline">{results.page} of {totalPages} pages</Badge>
                </div>
            </div>

            {/* Results Grid */}
            {results.products.length === 0 ? (
                <div className="text-center py-20 rounded-[32px] bg-card border border-border/50">
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your search filters</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {results.products.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-3 pt-8">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    if (page > 1) {
                                        const prevPage = page - 1;
                                        setPage(prevPage);
                                        searchProducts(filters, prevPage);
                                    }
                                }}
                                disabled={page <= 1 || loading}
                                className="rounded-full"
                            >
                                Previous
                            </Button>

                            <div className="flex items-center gap-2">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum = i + 1;
                                    if (page > 3) {
                                        pageNum = page - 2 + i;
                                    }
                                    if (pageNum > totalPages) return null;

                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={pageNum === page ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => {
                                                if (pageNum !== page) {
                                                    setPage(pageNum);
                                                    searchProducts(filters, pageNum);
                                                }
                                            }}
                                            className={`rounded-full w-10 h-10 ${pageNum === page ? "bg-primary text-primary-foreground" : ""
                                                }`}
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                })}
                            </div>

                            <Button
                                variant="outline"
                                onClick={handleLoadMore}
                                disabled={page >= totalPages || loading}
                                className="rounded-full"
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}

            {/* Facets Summary (Could be used to show selected filters) */}
            {(filters.category || filters.brands.length > 0 || filters.rating ||
                filters.minPrice > 0 || filters.maxPrice < 5000) && (
                <div className="pt-6 border-t border-border/50">
                    <h4 className="text-sm font-medium mb-3">Active Filters</h4>
                    <div className="flex flex-wrap gap-2">
                        {filters.category && (
                            <Badge variant="secondary" className="rounded-full px-3 py-1">
                                Category: {categories.find(c => c.id === filters.category)?.name}
                                <button className="ml-2 hover:text-destructive">×</button>
                            </Badge>
                        )}
                        {filters.brands.map(brand => (
                            <Badge key={brand} variant="secondary" className="rounded-full px-3 py-1">
                                Brand: {brand}
                                <button className="ml-2 hover:text-destructive">×</button>
                            </Badge>
                        ))}
                        {(filters.minPrice > 0 || filters.maxPrice < 5000) && (
                            <Badge variant="secondary" className="rounded-full px-3 py-1">
                                Price: ${filters.minPrice} - ${filters.maxPrice}
                                <button className="ml-2 hover:text-destructive">×</button>
                            </Badge>
                        )}
                        {filters.rating && (
                            <Badge variant="secondary" className="rounded-full px-3 py-1">
                                Rating: {filters.rating}+ stars
                                <button className="ml-2 hover:text-destructive">×</button>
                            </Badge>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
