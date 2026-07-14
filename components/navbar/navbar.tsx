"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Menu,
  Package,
  User,
  Bell,
  Heart,
  ShoppingBag,
  ChevronDown,
  LogOut,
  Settings,
  UserCircle,
  Home,
  Truck,
  ArrowRight,
  Store,
  Tag,
  Grid,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartSheet } from "./cart-sheet";
import { categories, products, stores, brands } from "@/constants/dummy-data";
import Image from "next/image";

// Mock user state - in real app, this would come from auth context
const mockUser = {
  isAuthenticated: true,
  name: "John Doe",
  email: "john@example.com",
  avatar: null,
  notifications: 3,
  wishlistCount: 12,
};

// Search suggestions
const searchSuggestions = [
  "MacBook Pro",
  "AirPods Pro",
  "Wireless Headphones",
  "Smart Watch",
  "Gaming Keyboard",
  "Coffee Mug",
  "Leather Wallet",
  "T-Shirts",
  "Fitness Tracker",
];

// Apple-style navigation menu structure
type NavLink = { label: string; href: string; hint?: string };
type NavItem = {
  id: string;
  label: string;
  columns: { heading: string; links: NavLink[] }[];
  featured?: { label: string; href: string };
};

const navItems: NavItem[] = [
  {
    id: "shop",
    label: "Shop",
    columns: [
      {
        heading: "Shop by Category",
        links: categories.map((c) => ({
          label: c.name,
          href: `/products?category=${c.id}`,
          hint: `${c.count}`,
        })),
      },
      {
        heading: "Quick Links",
        links: [
          { label: "All Products", href: "/products" },
          { label: "Featured", href: "/products?featured=true" },
          { label: "New Arrivals", href: "/products?sort=newest" },
          { label: "Best Sellers", href: "/products?sort=popular" },
        ],
      },
    ],
    featured: { label: "Browse all products", href: "/products" },
  },
  {
    id: "discover",
    label: "Discover",
    columns: [
      {
        heading: "Explore",
        links: [
          { label: "Deals of the Day", href: "/products?deals=true" },
          { label: "Flash Sale", href: "/products?flash=true" },
          { label: "Pricing", href: "/pricing" },
          { label: "Blog", href: "/blog" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    featured: { label: "See today's deals", href: "/products?deals=true" },
  },
];

// Unified search across products, stores, brands and categories
type SearchResultType = "product" | "store" | "brand" | "category";
type SearchResult = {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  image?: string;
  href: string;
};

const searchIndex: SearchResult[] = [
  ...products.map((p) => ({
    id: `product-${p.id}`,
    type: "product" as const,
    title: p.name,
    subtitle: p.brand,
    image: p.image,
    href: `/product/${p.id}`,
  })),
  ...stores.map((s) => ({
    id: `store-${s.id}`,
    type: "store" as const,
    title: s.name,
    subtitle: s.description,
    image: s.logo,
    href: `/store/${s.id}`,
  })),
  ...brands.map((b) => ({
    id: `brand-${b.id}`,
    type: "brand" as const,
    title: b.name,
    subtitle: `${b.count} ${b.count === 1 ? "product" : "products"}`,
    href: `/products?brand=${b.id}`,
  })),
  ...categories.map((c) => ({
    id: `category-${c.id}`,
    type: "category" as const,
    title: c.name,
    subtitle: `${c.count} items`,
    image: c.image,
    href: `/products?category=${c.id}`,
  })),
];

const typeMeta: Record<SearchResultType, { label: string; icon: typeof Store }> = {
  product: { label: "Products", icon: Package },
  store: { label: "Stores", icon: Store },
  brand: { label: "Brands", icon: Tag },
  category: { label: "Categories", icon: Grid },
};

function searchAll(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q)
    )
    .slice(0, 8);
}

export function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchToggleRef = useRef<HTMLButtonElement>(null);

  const activeItem = navItems.find((item) => item.id === activeItemId) ?? null;
  const searchResults = searchAll(searchQuery);

  // Mock authentication state
  const [user, setUser] = useState(mockUser);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        searchRef.current &&
        !searchRef.current.contains(target) &&
        searchToggleRef.current &&
        !searchToggleRef.current.contains(target)
      ) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus the input when the search panel opens; close on Escape
  useEffect(() => {
    if (showSearch) {
      searchInputRef.current?.focus();
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowSearch(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showSearch]);

  const closeSearch = () => {
    setShowSearch(false);
    setSearchQuery("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
    }
  };

  const handleResultClick = (href: string) => {
    router.push(href);
    closeSearch();
  };

  const handleSearchSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    router.push(`/products?search=${encodeURIComponent(suggestion)}`);
    closeSearch();
  };

  const handleLogout = () => {
    setUser({ ...user, isAuthenticated: false });
    // In real app, call logout API
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <nav
      onMouseLeave={() => setActiveItemId(null)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm"
        : "bg-background/80 backdrop-blur-lg border-b border-border/50"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Mobile Menu Button */}
            <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="md:hidden" />
                }
              >
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-sm">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Aura</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col space-y-6">
                  {user.isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary">
                        <Avatar>
                          <AvatarFallback>
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                      <Link href="/dashboard" onClick={() => setShowMobileMenu(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <UserCircle className="w-4 h-4 mr-3" />
                          My Account
                        </Button>
                      </Link>
                      <Link href="/dashboard/orders" onClick={() => setShowMobileMenu(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <ShoppingBag className="w-4 h-4 mr-3" />
                          My Orders
                        </Button>
                      </Link>
                      <Link href="/dashboard/wishlist" onClick={() => setShowMobileMenu(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <Heart className="w-4 h-4 mr-3" />
                          Wishlist
                          {user.wishlistCount > 0 && (
                            <Badge className="ml-auto bg-primary text-primary-foreground">
                              {user.wishlistCount}
                            </Badge>
                          )}
                        </Button>
                      </Link>
                      <DropdownMenuSeparator />
                    </>
                  ) : null}

                  <Link href="/" onClick={() => setShowMobileMenu(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="w-4 h-4 mr-3" />
                      Home
                    </Button>
                  </Link>

                  {/* Categories in mobile menu */}
                  <div>
                    <p className="text-sm font-medium px-3 mb-2 text-muted-foreground">Shop by Category</p>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/products?category=${category.id}`}
                          onClick={() => setShowMobileMenu(false)}
                        >
                          <Button variant="ghost" className="w-full justify-start text-sm font-normal">
                            {category.name}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link href="/contact" onClick={() => setShowMobileMenu(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Contact
                    </Button>
                  </Link>

                  {user.isAuthenticated ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={() => {
                        handleLogout();
                        setShowMobileMenu(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </Button>
                  ) : (
                    <Button
                      className="w-full mt-4 rounded-full"
                      onClick={() => {
                        handleLogin();
                        setShowMobileMenu(false);
                      }}
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/logo/logo.png"
                alt="Logo"
                width={100}
                height={100}
                priority
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeItemId === item.id;
                const isDimmed = activeItemId !== null && !isActive;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActiveItemId(item.id)}
                    onFocus={() => setActiveItemId(item.id)}
                    className={`inline-flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium tracking-tight
                      rounded-full transition-colors duration-300 cursor-pointer outline-none
                      ${isActive
                        ? "text-foreground"
                        : isDimmed
                          ? "text-foreground/30"
                          : "text-foreground/80 hover:text-foreground"}`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ease-out ${isActive ? "rotate-180 text-foreground/60" : "text-foreground/40"}`}
                    />
                  </button>
                );
              })}

              <Link
                href="/products"
                onMouseEnter={() => setActiveItemId(null)}
                className={`px-3.5 py-2 text-[13px] font-medium tracking-tight rounded-full transition-colors duration-300
                  ${activeItemId !== null ? "text-foreground/30" : "text-foreground/80 hover:text-foreground"}`}
              >
                All Products
              </Link>

              <Link
                href="/contact"
                onMouseEnter={() => setActiveItemId(null)}
                className={`px-3.5 py-2 text-[13px] font-medium tracking-tight rounded-full transition-colors duration-300
                  ${activeItemId !== null ? "text-foreground/30" : "text-foreground/80 hover:text-foreground"}`}
              >
                Contact
              </Link>
            </div>
          </div>
          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop Search Button */}
            <Button
              ref={searchToggleRef}
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
              aria-label="Search"
              onClick={() => {
                setActiveItemId(null);
                setShowSearch((prev) => !prev);
              }}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Mobile Search Button */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Search className="w-5 h-5" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-[calc(100vw-2rem)] max-w-sm p-4">
                <form onSubmit={handleSearch}>
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search products, stores, brands..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 rounded-full h-10"
                    />
                  </div>
                  <Button type="submit" size="sm" className="w-full rounded-full">
                    Search
                  </Button>
                </form>
                <DropdownMenuSeparator className="my-3" />
                {searchQuery.trim() === "" ? (
                  <>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Trending searches:</p>
                    <div className="flex flex-wrap gap-2">
                      {searchSuggestions.slice(0, 6).map((suggestion, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer rounded-full px-3 py-1 text-xs"
                          onClick={() => handleSearchSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  </>
                ) : searchResults.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-2">
                    No results for &ldquo;{searchQuery}&rdquo;
                  </p>
                ) : (
                  <div className="max-h-72 overflow-y-auto -mx-1">
                    {searchResults.map((result) => {
                      const Icon = typeMeta[result.type].icon;
                      return (
                        <button
                          key={result.id}
                          type="button"
                          onClick={() => handleResultClick(result.href)}
                          className="w-full flex items-center gap-3 px-1 py-2 rounded-lg text-left hover:bg-secondary/60 transition-colors cursor-pointer"
                        >
                          <div className="relative w-9 h-9 rounded-md overflow-hidden bg-secondary shrink-0 flex items-center justify-center">
                            {result.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={result.image} alt={result.title} className="w-full h-full object-cover" />
                            ) : (
                              <Icon className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{result.title}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {typeMeta[result.type].label.replace(/s$/, "")}
                              {result.subtitle ? ` · ${result.subtitle}` : ""}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Cart */}
            <CartSheet />

            {/* User Account */}
            <div className="relative hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                aria-label={user.isAuthenticated ? "Go to dashboard" : "Sign in"}
                className="rounded-full cursor-pointer hover:bg-accent transition-colors"
                onClick={() => router.push(user.isAuthenticated ? "/dashboard" : "/login")}
              >
                <Avatar className="w-8 h-8 pointer-events-none">
                  <AvatarFallback>
                    {user.isAuthenticated ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>

            {/* Mobile User Button */}
            {!user.isAuthenticated && (
              <Button
                size="sm"
                className="rounded-full md:hidden"
                onClick={handleLogin}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Desktop Search Panel (drops from header, searches products, stores, brands, categories) */}
        <div
          ref={searchRef}
          className={`hidden md:block overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${showSearch ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="animate-in fade-in slide-in-from-top-1 duration-300 py-6">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground/60" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, stores, brands..."
                className="w-full bg-transparent border-0 outline-none pl-10 pr-10 text-2xl font-medium tracking-tight
                  placeholder:text-muted-foreground/40 text-foreground"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-muted-foreground/60
                    hover:text-foreground hover:bg-foreground/[0.06] transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </form>

            <div className="mt-5 border-t border-border/50 pt-5">
              {searchQuery.trim() === "" ? (
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground/70 tracking-wide mb-3">
                    Trending searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {searchSuggestions.slice(0, 8).map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => handleSearchSuggestionClick(suggestion)}
                        className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-foreground/80
                          bg-foreground/[0.04] hover:bg-foreground/[0.08] hover:text-foreground transition-colors cursor-pointer"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4">
                  No results for &ldquo;{searchQuery}&rdquo;
                </p>
              ) : (
                <div className="max-h-80 overflow-y-auto -mx-2 pr-1">
                  {searchResults.map((result) => {
                    const Icon = typeMeta[result.type].icon;
                    return (
                      <button
                        key={result.id}
                        type="button"
                        onClick={() => handleResultClick(result.href)}
                        className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl text-left
                          hover:bg-foreground/[0.06] transition-colors cursor-pointer group/result"
                      >
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-secondary shrink-0 flex items-center justify-center">
                          {result.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={result.image}
                              alt={result.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Icon className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-foreground truncate">
                            {result.title}
                          </p>
                          {result.subtitle && (
                            <p className="text-[12px] text-muted-foreground truncate">
                              {result.subtitle}
                            </p>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground/60 shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                          {typeMeta[result.type].label.replace(/s$/, "")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Apple-style Mega Menu Panel (grows in normal flow, pushes content down) */}
        <div
          className={`hidden md:block overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${activeItem ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          {activeItem && (
            <div
              key={activeItem.id}
              className="animate-in fade-in slide-in-from-top-1 duration-300 py-8"
            >
              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-12 gap-y-8 max-w-4xl">
                {activeItem.columns.map((column) => (
                  <div key={column.heading} className="flex flex-col gap-3">
                    <p className="text-[11px] font-medium text-muted-foreground/70 tracking-wide">
                      {column.heading}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {column.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setActiveItemId(null)}
                          className="group/link flex items-center justify-between text-[19px] font-medium tracking-tight
                            text-foreground/60 hover:text-foreground transition-colors duration-200"
                        >
                          <span>{link.label}</span>
                          {link.hint && (
                            <span className="text-[11px] font-normal text-muted-foreground/50 tabular-nums">
                              {link.hint}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {activeItem.featured && (
                <Link
                  href={activeItem.featured.href}
                  onClick={() => setActiveItemId(null)}
                  className="group/featured mt-8 inline-flex items-center gap-1.5 text-[13px] font-medium
                    text-primary hover:opacity-80 transition-opacity duration-200"
                >
                  {activeItem.featured.label}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/featured:translate-x-0.5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
