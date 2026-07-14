/**
 * Store-scoped product search API client.
 *
 * Talks to the backend endpoints:
 *   GET /api/v1/stores/{storeId}/search
 *   GET /api/v1/stores/{storeId}/search/facets
 *
 * Base URL comes from NEXT_PUBLIC_API_BASE_URL, defaulting to http://localhost:8080.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Backend sort values accepted by the Store_Search_API. */
export type BackendSort = "price_asc" | "price_desc" | "newest";

/** UI sort control values used by the sidebar. */
export type UiSortBy =
    | "relevance"
    | "price-asc"
    | "price-desc"
    | "rating"
    | "newest"
    | "featured";

/**
 * Parameters accepted by {@link searchStoreProducts}. All fields are optional;
 * empty and default values are omitted from the outgoing query string.
 */
export interface StoreSearchParams {
    keyword?: string;
    categoryId?: string | null;
    brandIds?: string[];
    minPrice?: number;
    maxPrice?: number;
    inStockOnly?: boolean;
    /** UI sort value (e.g. "price-asc"); mapped to a backend sort value. */
    sortBy?: UiSortBy | string;
    page?: number;
    size?: number;
}

/** A single search result row combining product and store-listing fields. */
export interface StoreSearchResultItem {
    listingId: string;
    productId: string;
    name: string;
    slug: string;
    thumbnail: string | null;
    price: number;
    inStock: boolean;
    categoryId: string | null;
    brandId: string | null;
    createdAt?: string;
}

/** Spring `Page<T>` JSON shape. */
export interface PageResponse<T> {
    content: T[];
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

/** A facet option (category or brand). */
export interface FacetValue {
    id: string;
    name: string;
}

/** Price bounds for the store's active listings; null when the store is empty. */
export interface PriceBounds {
    min: number | null;
    max: number | null;
}

/** Response shape of the Store_Facet_API. */
export interface StoreFacetResponse {
    categories: FacetValue[];
    brands: FacetValue[];
    price: PriceBounds;
}

// ---------------------------------------------------------------------------
// Pure helpers (exported for unit testing)
// ---------------------------------------------------------------------------

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

/**
 * Map a UI sort value to a backend sort value.
 *
 * - "price-asc"  -> "price_asc"
 * - "price-desc" -> "price_desc"
 * - everything else ("featured", "relevance", "newest", "rating", undefined)
 *   -> "newest" (the backend default)
 */
export function mapSortBy(sortBy?: string | null): BackendSort {
    switch (sortBy) {
        case "price-asc":
            return "price_asc";
        case "price-desc":
            return "price_desc";
        default:
            return "newest";
    }
}

/**
 * Build the query string for a store search request.
 *
 * Omits empty/default values:
 * - blank/whitespace-only keyword
 * - null/empty categoryId
 * - empty brandIds array (each non-empty id is appended as a repeated param)
 * - undefined min/max price
 * - inStockOnly when false (the backend default)
 * - "newest" sort is emitted explicitly only when a sort value was provided;
 *   omitted otherwise since it is the backend default
 * - page 0 and default size are omitted
 *
 * This is a pure function so it can be unit tested in isolation.
 */
export function buildSearchParams(params: StoreSearchParams): URLSearchParams {
    const sp = new URLSearchParams();

    const keyword = params.keyword?.trim();
    if (keyword) {
        sp.append("keyword", keyword);
    }

    if (params.categoryId) {
        sp.append("categoryId", params.categoryId);
    }

    if (params.brandIds && params.brandIds.length > 0) {
        for (const brandId of params.brandIds) {
            if (brandId) {
                sp.append("brandIds", brandId);
            }
        }
    }

    if (params.minPrice !== undefined && params.minPrice !== null) {
        sp.append("minPrice", String(params.minPrice));
    }

    if (params.maxPrice !== undefined && params.maxPrice !== null) {
        sp.append("maxPrice", String(params.maxPrice));
    }

    if (params.inStockOnly) {
        sp.append("inStockOnly", "true");
    }

    // Only send a sort value when the caller specified one; the backend
    // defaults to "newest" when the param is absent.
    if (params.sortBy !== undefined && params.sortBy !== null) {
        sp.append("sort", mapSortBy(params.sortBy));
    }

    if (params.page !== undefined && params.page !== null && params.page > 0) {
        sp.append("page", String(params.page));
    }

    if (params.size !== undefined && params.size !== null) {
        sp.append("size", String(params.size));
    }

    return sp;
}

// ---------------------------------------------------------------------------
// API calls
// ---------------------------------------------------------------------------

/**
 * Search a single store's products.
 *
 * @throws Error on a non-2xx response so callers can render an error state.
 */
export async function searchStoreProducts(
    storeId: string,
    params: StoreSearchParams = {}
): Promise<PageResponse<StoreSearchResultItem>> {
    const query = buildSearchParams(params).toString();
    const url = `${API_BASE_URL}/api/v1/stores/${storeId}/search${query ? `?${query}` : ""
        }`;

    const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
    });

    if (!response.ok) {
        throw new Error(
            `Store search request failed with status ${response.status}`
        );
    }

    return (await response.json()) as PageResponse<StoreSearchResultItem>;
}

/**
 * Fetch the filter facets (categories, brands, price bounds) for a store.
 *
 * @throws Error on a non-2xx response so callers can render an error state.
 */
export async function getStoreFacets(
    storeId: string
): Promise<StoreFacetResponse> {
    const url = `${API_BASE_URL}/api/v1/stores/${storeId}/search/facets`;

    const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
    });

    if (!response.ok) {
        throw new Error(
            `Store facets request failed with status ${response.status}`
        );
    }

    return (await response.json()) as StoreFacetResponse;
}
