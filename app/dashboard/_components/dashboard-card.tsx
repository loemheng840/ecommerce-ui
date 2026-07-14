import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared surface card for dashboard content. Keeps radius, border and padding
 * consistent across every dashboard screen.
 */
export function DashboardCard({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "bg-card rounded-3xl border border-border/50 p-6 md:p-8",
                className
            )}
        >
            {children}
        </div>
    );
}
