"use client";

import { useEffect, useState } from "react";
import { getStoreFacets } from "./store-search";
import { products as localProducts, categories, brands } from "@/constants/dummy-data";
import type { SidebarFacets } from "@/components/search/sidebar-search";

/**
 * Build store facets from the local dataset as a fallback when the backend
 * facet endpoint is unavailable. Only surfaces categories/brands the store
 * actually carries, and computes real price bounds.
 */
function localFacets(storeId: string): SidebarFacets {
    const storeProducts = localProducts.filter((p) => p.storeId === storeId);

    const categoryFacets = categories
        .filter((c) => storeProducts.some((p) => p.category === c.id))
        .map((c) => ({
            id: c.id,
            name: c.name,
            count: storeProducts.filter((p) => p.category === c.id).length,
        }));

    const brandFacets = brands
        .filter((b) => storeProducts.some((p) => p.brand.toLowerCase() === b.id))
        .map((b) => ({
            id: b.id,
            name: b.name,
            count: storeProducts.filter((p) => p.brand.toLowerCase() === b.id).length,
        }));

    const prices = storeProducts.map((p) => p.price);
    const price = prices.length
        ? { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) }
        : { min: 0, max: 5000 };

    return { categories: categoryFacets, brands: brandFacets, price };
}

/**
 * Fetch store-scoped filter facets. Falls back to facets derived from the
 * local dataset when the backend is unreachable, so filters always reflect
 * only what this store carries.
 */
export function useStoreFacets(storeId: string): SidebarFacets | undefined {
    const [facets, setFacets] = useState<SidebarFacets | undefined>(undefined);

    useEffect(() => {
        let active = true;

        (async () => {
            try {
                const res = await getStoreFacets(storeId);
                if (!active) return;
                setFacets({
                    categories: res.categories,
                    brands: res.brands,
                    price:
                        res.price.min !== null && res.price.max !== null
                            ? { min: Math.floor(res.price.min), max: Math.ceil(res.price.max) }
                            : undefined,
                });
            } catch {
                if (active) setFacets(localFacets(storeId));
            }
        })();

        return () => {
            active = false;
        };
    }, [storeId]);

    return facets;
}
