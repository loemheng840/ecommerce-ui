"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { SearchLayout } from "@/components/search/search-layout";
import { SearchResults } from "@/components/search/search-results";
import { stores } from "@/constants/dummy-data";

function ProductsContent() {
    const searchParams = useSearchParams();

    // Seed initial filters from the URL so links like
    // /products?category=x&storeId=y or /products?brand=z land pre-filtered.
    const storeId = searchParams.get("storeId") ?? undefined;
    const category = searchParams.get("category");
    const query = searchParams.get("search") ?? "";
    const brand = searchParams.get("brand");

    const store = storeId ? stores.find((s) => s.id === storeId) : null;

    const [searchFilters, setSearchFilters] = useState<any>({
        query,
        category,
        brands: brand ? [brand.toLowerCase()] : [],
        minPrice: 0,
        maxPrice: 5000,
        rating: null,
        inStock: false,
        sortBy: "featured",
        // Keep the store scope so only this store's products are shown.
        storeId,
    });

    const handleSearch = (filters: any) => {
        // Preserve the store scope across subsequent sidebar searches.
        setSearchFilters({ ...filters, storeId });
    };

    return (
        <SearchLayout
            onSearch={handleSearch}
            title={store ? `${store.name} Products` : "All Products"}
            description={
                store
                    ? `Browse products from ${store.name}`
                    : "Browse and filter our collection"
            }
        >
            <SearchResults filters={searchFilters} />
        </SearchLayout>
    );
}

export default function ProductsPage() {
    return (
        <>
            <Navbar />
            <main className="flex-1 pt-16 bg-background">
                <Suspense fallback={null}>
                    <ProductsContent />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
