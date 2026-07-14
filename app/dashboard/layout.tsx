"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShoppingBag, Heart, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { icon: User, label: "Profile", href: "/dashboard/profile" },
    { icon: ShoppingBag, label: "Orders", href: "/dashboard/orders" },
    { icon: Heart, label: "Wishlist", href: "/dashboard/wishlist" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-12">

            {/* Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="mb-8 px-4">
                  <h2 className="text-2xl font-semibold tracking-tight">My Account</h2>
                  <p className="text-muted-foreground text-sm mt-1">Welcome back, John Doe</p>
                </div>

                <nav className="flex flex-col gap-2">
                  {navItems.map((item, i) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={i}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${isActive
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    );
                  })}

                  <div className="h-px bg-border my-4 mx-4" />

                  <button className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors text-destructive hover:bg-destructive/10 text-left">
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {children}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
