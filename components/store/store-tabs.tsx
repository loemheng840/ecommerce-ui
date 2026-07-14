"use client";

import { motion } from "framer-motion";

interface StoreTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "home", label: "Store Home" },
  { id: "products", label: "All Products" },
  { id: "categories", label: "Categories" },
];

export function StoreTabs({ activeTab, onTabChange }: StoreTabsProps) {
  // top-16 (64px) pins the tabs directly below the fixed navbar (h-16).
  return (
    <div className="border-b border-border/50 bg-card sticky top-16 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative py-4 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="store-active-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div >
  );
}
