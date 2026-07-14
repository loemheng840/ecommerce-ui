export interface Store {
    id: string;
    name: string;
    logo: string;
    coverImage: string;
    rating: number;
    followers: number;
    isVerified: boolean;
    description: string;
}

export interface Coupon {
    id: string;
    storeId: string;
    code: string;
    discount: string;
    minSpend: number;
    expiryDate: string;
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    oldPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    images: string[];
    isNew: boolean;
    isBestseller: boolean;
    stock: number;
    description: string;
    colors: string[];
    variants: string[];
    storeId?: string;
}

export interface Category {
    id: string;
    name: string;
    image: string;
    count: number;
}

export interface Review {
    id: number;
    user: string;
    rating: number;
    text: string;
    date: string;
}

export interface SearchFilters {
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

export interface SearchApiResponse {
    products: Product[];
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
