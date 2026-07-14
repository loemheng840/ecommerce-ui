import type { ReactNode } from "react";

/**
 * Shared page header for every dashboard screen so titles, spacing and
 * typography stay consistent across Profile, Orders, Wishlist and Settings.
 */
export function DashboardHeader({
    title,
    description,
    action,
}: {
    title: string;
    description?: string;
    action?: ReactNode;
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                {description && (
                    <p className="text-muted-foreground text-sm mt-1">{description}</p>
                )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}
