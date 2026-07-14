import { describe, it, expect } from "vitest";
import {
    buildSearchParams,
    mapSortBy,
    type StoreSearchParams,
} from "./store-search";

describe("mapSortBy", () => {
    // Validates: Requirements 4.3, 4.4, 4.5, 6.2
    it("maps price-asc to price_asc", () => {
        expect(mapSortBy("price-asc")).toBe("price_asc");
    });

    it("maps price-desc to price_desc", () => {
        expect(mapSortBy("price-desc")).toBe("price_desc");
    });

    it("maps featured to the newest default", () => {
        expect(mapSortBy("featured")).toBe("newest");
    });

    it("maps relevance/rating/newest and unknown values to newest", () => {
        expect(mapSortBy("relevance")).toBe("newest");
        expect(mapSortBy("rating")).toBe("newest");
        expect(mapSortBy("newest")).toBe("newest");
        expect(mapSortBy("something-else")).toBe("newest");
    });

    it("maps undefined/null to newest", () => {
        expect(mapSortBy(undefined)).toBe("newest");
        expect(mapSortBy(null)).toBe("newest");
    });
});

describe("buildSearchParams", () => {
    const build = (p: StoreSearchParams) => buildSearchParams(p).toString();

    it("returns an empty query for empty params", () => {
        expect(build({})).toBe("");
    });

    it("serializes a trimmed keyword and omits blank keywords", () => {
        expect(build({ keyword: "  shoes  " })).toBe("keyword=shoes");
        expect(build({ keyword: "   " })).toBe("");
        expect(build({ keyword: "" })).toBe("");
    });

    it("includes categoryId when set and omits null/empty", () => {
        expect(build({ categoryId: "cat-1" })).toBe("categoryId=cat-1");
        expect(build({ categoryId: null })).toBe("");
        expect(build({ categoryId: "" })).toBe("");
    });

    it("appends each brandId as a repeated param and skips empties", () => {
        const sp = buildSearchParams({ brandIds: ["b1", "b2"] });
        expect(sp.getAll("brandIds")).toEqual(["b1", "b2"]);

        expect(build({ brandIds: [] })).toBe("");
        expect(buildSearchParams({ brandIds: ["b1", "", "b2"] }).getAll("brandIds")).toEqual([
            "b1",
            "b2",
        ]);
    });

    it("serializes min and max price, including zero", () => {
        expect(build({ minPrice: 10, maxPrice: 200 })).toBe(
            "minPrice=10&maxPrice=200"
        );
        expect(build({ minPrice: 0 })).toBe("minPrice=0");
    });

    it("includes inStockOnly only when true", () => {
        expect(build({ inStockOnly: true })).toBe("inStockOnly=true");
        expect(build({ inStockOnly: false })).toBe("");
    });

    it("maps sortBy into the backend sort param", () => {
        expect(build({ sortBy: "price-asc" })).toBe("sort=price_asc");
        expect(build({ sortBy: "price-desc" })).toBe("sort=price_desc");
        expect(build({ sortBy: "featured" })).toBe("sort=newest");
    });

    it("omits sort entirely when no sortBy is provided", () => {
        expect(build({})).toBe("");
    });

    it("omits page 0 but includes positive pages", () => {
        expect(build({ page: 0 })).toBe("");
        expect(build({ page: 2 })).toBe("page=2");
    });

    it("includes size when provided", () => {
        expect(build({ size: 20 })).toBe("size=20");
    });

    it("serializes a full combined query correctly", () => {
        const sp = buildSearchParams({
            keyword: "laptop",
            categoryId: "cat-9",
            brandIds: ["b1", "b2"],
            minPrice: 100,
            maxPrice: 2000,
            inStockOnly: true,
            sortBy: "price-desc",
            page: 3,
            size: 24,
        });

        expect(sp.get("keyword")).toBe("laptop");
        expect(sp.get("categoryId")).toBe("cat-9");
        expect(sp.getAll("brandIds")).toEqual(["b1", "b2"]);
        expect(sp.get("minPrice")).toBe("100");
        expect(sp.get("maxPrice")).toBe("2000");
        expect(sp.get("inStockOnly")).toBe("true");
        expect(sp.get("sort")).toBe("price_desc");
        expect(sp.get("page")).toBe("3");
        expect(sp.get("size")).toBe("24");
    });
});
