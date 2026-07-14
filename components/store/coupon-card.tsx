"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ticket, Clock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Coupon {
  id: string;
  code: string;
  discount: string;
  minSpend: number;
  expiryDate: string;
}

interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const [isClaimed, setIsClaimed] = useState(false);

  const handleClaim = () => {
    if (isClaimed) return;
    setIsClaimed(true);
    toast.success(`Coupon ${coupon.code} claimed successfully!`);
  };

  const daysLeft = Math.ceil(
    (new Date(coupon.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex w-[320px] shrink-0 h-[120px] rounded-2xl overflow-hidden border border-border/50 bg-card shadow-sm"
    >
      {/* Left part - Discount Info */}
      <div className="flex-1 p-4 flex flex-col justify-center border-r border-dashed border-border relative bg-gradient-to-br from-primary/5 to-transparent">
        {/* Semi-circle cutouts for ticket effect */}
        <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-background border-b border-l border-border/50" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-background border-t border-l border-border/50" />
        
        <div className="flex items-center gap-2 text-primary mb-1">
          <Ticket className="w-4 h-4" />
          <span className="font-bold text-sm tracking-wider uppercase">Voucher</span>
        </div>
        <h3 className="text-2xl font-black text-foreground leading-none mb-1.5">
          {coupon.discount}
        </h3>
        <p className="text-xs text-muted-foreground">
          Min. spend ${coupon.minSpend}
        </p>
      </div>

      {/* Right part - Action */}
      <div className="w-[100px] p-3 flex flex-col items-center justify-center bg-secondary/20 relative">
        <div className="flex flex-col items-center gap-1 mb-3 text-center">
          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground font-medium uppercase leading-tight">
            {daysLeft > 0 ? `${daysLeft} Days Left` : "Expires Soon"}
          </span>
        </div>
        <Button
          size="sm"
          variant={isClaimed ? "secondary" : "default"}
          className={`w-full rounded-full h-8 text-xs font-bold transition-all ${
            isClaimed ? "bg-secondary text-secondary-foreground hover:bg-secondary cursor-default" : ""
          }`}
          onClick={handleClaim}
        >
          {isClaimed ? "Claimed" : "Claim"}
        </Button>
      </div>
    </motion.div>
  );
}
