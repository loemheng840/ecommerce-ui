"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Search,
    Filter,
    X,
    ChevronDown,
    ChevronUp,
    Star,
    Tag,
    Clock,
    TrendingUp,
    Hash,
    DollarSign,
    Check
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { categories, brands } from "@/constants/dummy-data";

// Mock search history from localStorage/backend
const mockSearchHistory = [
    { id: 1, query: "MacBook Pro", count: 3 },
    { id: 2, query: "Wireless Headphones", count: 5 },
    { id: 3, query: "Smart Watch", count: 2 },
    { id: 4, query: "Gaming Keyboard", count: 1 },
    { id: 5, query: "Coffee Mug", count: 4 },
];

// Mock facets (from backend API)
const mockFacets = {
    categories: [
        { id: "electronics", name: "Electronics", count: 1240 },
        { id: "fashion", name: "Fashion", count: 850 },
        { id: "home", name: "Home & Living", count: 640 },
        { id: "sports", name: "Sports", count: 320 },
        { id: "beauty", name: "Beauty", count: 420 },
    ],
    brands: [
        { id: "apple", name: "Apple", count: 450 },
        { id: "sony", name: "Sony", count: 320 },
        { id: "keychron", name: "Keychron", count: 180 },
        { id: "garmin", name: "Garmin", count: 210 },
        { id: "bellroy", name: "Bellroy", count: 95 },
    ],
    ratings: [
        { id: "5", name: "★★★★★ & up", value: 5, count: 842 },
        { id: "4", name: "★★★★ & up", value: 4, count: 1245 },
        { id: "3", name: "★★★ & up", value: 3, count: 1567 },
    ],
    availability: [
        { id: "in-stock", name: "In Stock", count: 2450 },
        { id: "out-of-stock", name: "Out of Stock", count: 120 },
    ],
};

// Sort options matching backend
const sortOptions = [
    { id: "relevance", label: "Relevance", field: null, direction: null },
    { id: "price-asc", label: "Price: Low to High", field: "price", direction: "asc" },
    { id: "price-desc", label: "Price: High to Low", field: "price", direction: "desc" },
    { id: "rating", label: "Top Rated", field: "rating", direction: "desc" },
    { id: "newest", label: "Newest", field: "createdAt", direction: "desc" },
    { id: "bestseller", label: "Bestsellers", field: "sales", direction: "desc" },
];

interface SearchFilters {
    query: string;
    category: string | null;
    brands: string[];
    minPrice: number;
    maxPrice: number;
    rating: number | null;
    inStock: boolean;
    sortBy: string;
}

interface SidebarSearchProps {
    onSearch: (filters: SearchFilters) => void;
    onClose?: () => void;
    isMobile?: boolean;
}

export function SidebarSearch({ onSearch, onClose, isMobile = false }: SidebarSearchProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<SearchFilters>({
        query: "",
        category: null,
        brands: [],
        minPrice: 0,
        maxPrice: 5000,
        rating: null,
        inStock: true,
        sortBy: "relevance",
    });

    const [expandedSections, setExpandedSections] = useState({
        categories: true,
        price: true,
        brands: true,
        rating: true,
        availability: true,
        sort: true,
    });

    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Mock API call for search suggestions
    const fetchSuggestions = useCallback(async (query: string) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        // Simulate API call to /api/v1/search/suggestions
        const mockSuggestions = [
            "MacBook Pro M3 Max",
            "MacBook Air",
            "Mac mini",
            "Mac accessories",
            "Mac keyboards",
            "Mac monitors",
        ].filter(suggestion =>
            suggestion.toLowerCase().includes(query.toLowerCase())
        );

        setSuggestions(mockSuggestions.slice(0, 5));
    }, []);

    // Debounced search for suggestions
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSuggestions(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, fetchSuggestions]);

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleCategorySelect = (categoryId: string) => {
        setFilters(prev => ({
            ...prev,
            category: prev.category === categoryId ? null : categoryId,
        }));
    };

    const handleBrandToggle = (brandId: string) => {
        setFilters(prev => ({
            ...prev,
            brands: prev.brands.includes(brandId)
                ? prev.brands.filter(id => id !== brandId)
                : [...prev.brands, brandId],
        }));
    };

    const handleRatingSelect = (rating: number) => {
        setFilters(prev => ({
            ...prev,
            rating: prev.rating === rating ? null : rating,
        }));
    };

    const handlePriceChange = (value: number | readonly number[]) => {
        const priceValues = Array.isArray(value) ? value as number[] : [value as number];
        setPriceRange(priceValues);
        setFilters(prev => ({
            ...prev,
            minPrice: priceValues[0],
            maxPrice: priceValues[1],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedFilters = {
            ...filters,
            query: searchQuery,
        };
        onSearch(updatedFilters);

        // In real app, save to search history via API
        if (searchQuery.trim()) {
            console.log("Save search history:", searchQuery);
        }
    };

    const handleClearFilters = () => {
        setSearchQuery("");
        setFilters({
            query: "",
            category: null,
            brands: [],
            minPrice: 0,
            maxPrice: 5000,
            rating: null,
            inStock: true,
            sortBy: "relevance",
        });
        setPriceRange([0, 5000]);
    };

    const handleQuickSearch = (query: string) => {
        setSearchQuery(query);
        const updatedFilters = {
            ...filters,
            query,
        };
        onSearch(updatedFilters);
    };

    const hasActiveFilters = filters.category || filters.brands.length > 0 || filters.rating !== null ||
        filters.minPrice > 0 || filters.maxPrice < 5000 || !filters.inStock;

    return (
        <div className={`${isMobile ? 'w-full' : 'w-80'} flex flex-col h-full bg-card border-r border-border`}>
            {/* Header */}
            <div className="p-6 border-b border-border/50">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Search Products</h2>
                    {onClose && (
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </div>

                {/* Search Input */}
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search products, brands, categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 rounded-full h-10"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Search Suggestions */}
                    {suggestions.length > 0 && (
                        <div className="mt-2 rounded-lg border border-border/50 bg-background shadow-sm">
                            <div className="p-2">
                                <p className="text-xs font-medium text-muted-foreground px-2 py-1">Suggestions</p>
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleQuickSearch(suggestion)}
                                        className="w-full text-left px-2 py-2 rounded hover:bg-secondary/50 text-sm transition-colors flex items-center gap-2"
                                    >
                                        <Search className="w-3 h-3 text-muted-foreground" />
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <Button type="submit" className="w-full mt-3 rounded-full">
                        <Search className="w-4 h-4 mr-2" />
                        Search
                    </Button>
                </form>
            </div>

            {/* Scrollable Filters */}
            <ScrollArea className="flex-1 min-h-0">
                <div className="p-6 space-y-6">
                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Active Filters</span>
                            <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-xs h-7">
                                <X className="w-3 h-3 mr-1" />
                                Clear All
                            </Button>
                        </div>
                    )}

                    {/* Sort Options */}
                    <div>
                        <button
                            onClick={() => toggleSection("sort")}
                            className="flex items-center justify-between w-full text-sm font-medium mb-3"
                        >
                            <span className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                Sort By
                            </span>
                            {expandedSections.sort ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </button>

                        {expandedSections.sort && (
                            <RadioGroup
                                value={filters.sortBy}
                                onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
                                className="space-y-2"
                            >
                                {sortOptions.map((option) => (
                                    <div key={option.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.id} id={`sort-${option.id}`} />
                                        <Label htmlFor={`sort-${option.id}`} className="text-sm font-normal cursor-pointer">
                                            {option.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        )}
                    </div>

                    <Separator />

                    {/* Price Range */}
                    <div>
                        <button
                            onClick={() => toggleSection("price")}
                            className="flex items-center justify-between w-full text-sm font-medium mb-3"
                        >
                            <span className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Price Range
                            </span>
                            {expandedSections.price ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </button>

                        {expandedSections.price && (
                            <div className="space-y-4">
                                <div className="pt-2">
                                    <Slider
                                        value={priceRange}
                                        onValueChange={handlePriceChange}
                                        min={0}
                                        max={5000}
                                        step={10}
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">${priceRange[0].toLocaleString()}</span>
                                    <span className="text-muted-foreground">to</span>
                                    <span className="text-muted-foreground">${priceRange[1].toLocaleString()}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Categories */}
                    <div>
                        <button
                            onClick={() => toggleSection("categories")}
                            className="flex items-center justify-between w-full text-sm font-medium mb-3"
                        >
                            <span className="flex items-center gap-2">
                                <Hash className="w-4 h-4" />
                                Categories
                            </span>
                            {expandedSections.categories ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </button>

                        {expandedSections.categories && (
                            <div className="space-y-2">
                                {mockFacets.categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategorySelect(category.id)}
                                        className={`flex items-center justify-between w-full text-sm px-2 py-1.5 rounded-lg transition-colors ${filters.category === category.id
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "hover:bg-secondary/50"
                                            }`}
                                    >
                                        <span>{category.name}</span>
                                        <Badge variant="secondary" className="text-xs">
                                            {category.count}
                                        </Badge>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Brands */}
                    <div>
                        <button
                            onClick={() => toggleSection("brands")}
                            className="flex items-center justify-between w-full text-sm font-medium mb-3"
                        >
                            <span className="flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                Brands
                            </span>
                            {expandedSections.brands ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </button>

                        {expandedSections.brands && (
                            <div className="space-y-2">
                                {mockFacets.brands.map((brand) => (
                                    <div key={brand.id} className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleBrandToggle(brand.id)}
                                            className={`flex items-center justify-between flex-1 text-sm px-2 py-1.5 rounded-lg transition-colors ${filters.brands.includes(brand.id)
                                                ? "bg-primary/10 text-primary font-medium"
                                                : "hover:bg-secondary/50"
                                                }`}
                                        >
                                            <span>{brand.name}</span>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="text-xs">
                                                    {brand.count}
                                                </Badge>
                                                {filters.brands.includes(brand.id) && (
                                                    <Check className="w-3 h-3 text-primary" />
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Rating */}
                    <div>
                        <button
                            onClick={() => toggleSection("rating")}
                            className="flex items-center justify-between w-full text-sm font-medium mb-3"
                        >
                            <span className="flex items-center gap-2">
                                <Star className="w-4 h-4" />
                                Customer Rating
                            </span>
                            {expandedSections.rating ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </button>

                        {expandedSections.rating && (
                            <div className="space-y-2">
                                {mockFacets.ratings.map((rating) => (
                                    <button
                                        key={rating.id}
                                        onClick={() => handleRatingSelect(rating.value)}
                                        className={`flex items-center justify-between w-full text-sm px-2 py-1.5 rounded-lg transition-colors ${filters.rating === rating.value
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "hover:bg-secondary/50"
                                            }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="text-yellow-500">{rating.name}</span>
                                        </span>
                                        <Badge variant="secondary" className="text-xs">
                                            {rating.count}
                                        </Badge>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Availability */}
                    <div>
                        <button
                            onClick={() => toggleSection("availability")}
                            className="flex items-center justify-between w-full text-sm font-medium mb-3"
                        >
                            <span>Availability</span>
                            {expandedSections.availability ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </button>

                        {expandedSections.availability && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setFilters(prev => ({ ...prev, inStock: !prev.inStock }))}
                                        className={`flex items-center justify-between flex-1 text-sm px-2 py-1.5 rounded-lg transition-colors ${filters.inStock
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "hover:bg-secondary/50"
                                            }`}
                                    >
                                        <span>In Stock Only</span>
                                        {filters.inStock && (
                                            <Check className="w-3 h-3 text-primary" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Search History */}
                <div className="p-6 border-t border-border/50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Recent Searches
                        </h3>
                        <Button variant="ghost" size="sm" className="text-xs h-7">
                            Clear All
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {mockSearchHistory.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleQuickSearch(item.query)}
                                className="flex items-center justify-between w-full text-sm px-2 py-1.5 rounded-lg hover:bg-secondary/50 transition-colors"
                            >
                                <span className="text-muted-foreground">{item.query}</span>
                                <Badge variant="outline" className="text-xs">
                                    {item.count}
                                </Badge>
                            </button>
                        ))}
                    </div>
                </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-6 border-t border-border/50 bg-background/50">
                <Button
                    onClick={() => {
                        const updatedFilters = {
                            ...filters,
                            query: searchQuery,
                        };
                        onSearch(updatedFilters);
                    }}
                    className="w-full rounded-full"
                    size="lg"
                >
                    <Filter className="w-4 h-4 mr-2" />
                    Apply Filters
                </Button>
            </div>
        </div>
    );
}
