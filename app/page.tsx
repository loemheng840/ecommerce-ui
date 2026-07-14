"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar/navbar";
import { QuickCategories } from "@/components/sections/quick-categories";
import { HeroWithBanners } from "@/components/hero/hero-with-banners";
import { TrustBar } from "@/components/sections/trust-bar";
import { CategoryCards } from "@/components/sections/category-cards";
import { DealsOfDay } from "@/components/sections/deals-of-day";
import { BestSellers } from "@/components/sections/best-sellers";
import { FlashSale } from "@/components/sections/flash-sale";
import { NewArrivals } from "@/components/sections/new-arrivals";
import { RecentlyViewed } from "@/components/sections/recently-viewed";
import { NewsletterCTA } from "@/components/sections/newsletter-cta";
import { Footer } from "@/components/footer/footer";
import { SearchLayout } from "@/components/search/search-layout";
import { SearchResults } from "@/components/search/search-results";

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchFilters, setSearchFilters] = useState<any>(null);

  const handleSearch = (filters: any) => {
    const hasActiveFilters = 
      filters.query || 
      filters.category || 
      filters.brands.length > 0 || 
      filters.rating !== null ||
      filters.minPrice > 0 || 
      filters.maxPrice < 5000 || 
      !filters.inStock;

    if (hasActiveFilters) {
      setIsSearching(true);
      setSearchFilters(filters);
    } else {
      setIsSearching(false);
      setSearchFilters(null);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hide Hero and Trust Bar when searching to focus on results */}
        {!isSearching && (
          <>
            <HeroWithBanners />
            <TrustBar />
          </>
        )}

        {/* Search Sidebar Layout for the rest of the page */}
        <SearchLayout 
          onSearch={handleSearch} 
          hideHeader={!isSearching}
          title={isSearching ? "Search Results" : "Products"}
          description={isSearching ? "Products matching your criteria" : "Refine your search using the filters"}
          contentClassName={isSearching ? "p-4 lg:p-6" : "p-0"}
        >
          {isSearching && searchFilters ? (
            <SearchResults filters={searchFilters} />
          ) : (
            <>
              {/* Shop by Category */}
              <CategoryCards />

              {/* Deals of the Day */}
              <DealsOfDay />

              {/* Best Sellers */}
              <BestSellers />

              {/* Flash Sale */}
              <FlashSale />

              {/* New Arrivals */}
              <NewArrivals />

              {/* Recently Viewed */}
              <RecentlyViewed />

              {/* Newsletter CTA */}
              <NewsletterCTA />
            </>
          )}
        </SearchLayout>
      </main>
      <Footer />
    </>
    
  );
}
