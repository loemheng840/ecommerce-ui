"use client";

import { useState, ReactNode } from "react";
import { SidebarSearch, type SidebarFacets } from "./sidebar-search";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SearchLayoutProps {
    children: ReactNode;
    onSearch: (filters: any) => void;
    hideHeader?: boolean;
    title?: string;
    description?: string;
    contentClassName?: string;
    /** Store-scoped facets forwarded to the sidebar. */
    facets?: SidebarFacets;
    /** Store name; when set the sidebar switches to store-scoped mode. */
    scopeName?: string;
}

export function SearchLayout({
    children,
    onSearch,
    hideHeader = false,
    title = "Products",
    description = "Refine your search using the filters",
    contentClassName = "p-4 lg:p-6",
    facets,
    scopeName
}: SearchLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSearch = (filters: any) => {
        console.log("Search filters:", filters);
        onSearch(filters);

        // In real app, this would:
        // 1. Convert filters to query params
        // 2. Call your backend search API: /api/v1/search/products
        // 3. Update search results

        // Example API call structure:
        // const response = await fetch(`/api/v1/search/products?${queryParams}`);
        // const data = await response.json();
        // Update results state

        setIsSidebarOpen(false);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row min-h-screen border-x border-border/50">
                {/* Mobile Filter Button */}
                <div className="lg:hidden p-4 border-b border-border/50 bg-background sticky top-16 z-40">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold">{title}</h1>
                        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                            <SheetTrigger
                                render={
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Filter className="w-4 h-4" />
                                        Filters
                                    </Button>
                                }
                            />
                            <SheetContent side="left" className="w-full sm:max-w-sm p-0">
                                <SidebarSearch
                                    onSearch={handleSearch}
                                    onClose={() => setIsSidebarOpen(false)}
                                    isMobile
                                    facets={facets}
                                    scopeName={scopeName}
                                />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-80 border-r border-border/50 sticky top-16 h-[calc(100vh-4rem)] overflow-hidden bg-card">
                    <SidebarSearch onSearch={handleSearch} facets={facets} scopeName={scopeName} />
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-x-hidden">
                    {/* Desktop Header with Active Filters */}
                    {!hideHeader && (
                        <div className="hidden lg:block p-6 border-b border-border/50 bg-background sticky top-16 z-30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold">{title}</h1>
                                    <p className="text-sm text-muted-foreground">{description}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Filter className="w-4 h-4" />
                                        Advanced Filters
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className={contentClassName}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
