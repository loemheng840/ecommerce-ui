import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Package } from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "../_components/dashboard-header";

export default function OrdersPage() {
  const orders = [
    { id: "ORD-123456", date: "Oct 24, 2026", status: "Processing", total: 3778.92, items: 3 },
    { id: "ORD-987654", date: "Sep 12, 2026", status: "Delivered", total: 249.00, items: 1 },
    { id: "ORD-456789", date: "Jul 05, 2026", status: "Delivered", total: 129.00, items: 1 },
  ];

  return (
    <div>
      <DashboardHeader
        title="Orders"
        description="Track and review your past purchases."
      />

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-card rounded-[24px] p-6 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-[16px] bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Package className="w-7 h-7" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold tracking-tight">{order.id}</h3>
                  <Badge variant={order.status === "Delivered" ? "secondary" : "default"} className="rounded-full">
                    {order.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{order.date} · {order.items} items</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-48">
              <span className="font-semibold text-lg tabular-nums">${order.total.toFixed(2)}</span>
              <Link href={`/dashboard/orders/${order.id}`}>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
