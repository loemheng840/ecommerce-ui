"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { SearchLayout } from "@/components/search/search-layout";
import { SearchResults } from "@/components/search/search-results";

export default function ProductsPage() {
    const [searchFilters, setSearchFilters] = useState<any>({
        query: "",
        category: null,
        brands: [],
        minPrice: 0,
        maxPrice: 5000,
        rating: null,
        inStock: false,
        sortBy: "featured",
    });

    const handleSearch = (filters: any) => {
        setSearchFilters(filters);
    };

    return (
        <>
            <Navbar />
            <main className="flex-1 pt-16 bg-background">
                <SearchLayout 
                    onSearch={handleSearch} 
                    title="All Products"
                    description="Browse and filter our collection"
                >
                    <SearchResults filters={searchFilters} />
                </SearchLayout>
            </main>
            <Footer />
        </>
    );
}

