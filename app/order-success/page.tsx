"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

    return (
        <>
            <Navbar />
            <main className="flex-1 pt-24 pb-16 bg-background flex items-center justify-center min-h-[70vh]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center p-8 md:p-12 rounded-[32px] bg-card border border-border/50"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
                        >
                            <CheckCircle className="w-10 h-10 text-success" />
                        </motion.div>

                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                            Order Placed Successfully!
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            Thank you for your purchase. Your order is being processed.
                        </p>

                        <div className="p-4 rounded-[16px] bg-secondary/50 border border-border/50 mb-8 inline-block">
                            <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                            <p className="font-bold text-lg">{orderNumber}</p>
                        </div>

                        <div className="space-y-4 text-left p-6 rounded-[20px] bg-secondary/30 mb-8">
                            <div className="flex items-center gap-3">
                                <Package className="w-5 h-5 text-primary shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">Estimated Delivery</p>
                                    <p className="text-xs text-muted-foreground">3-5 business days</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-success shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">Confirmation Email Sent</p>
                                    <p className="text-xs text-muted-foreground">Check your inbox for details</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/dashboard/orders" className="flex-1">
                                <Button variant="outline" className="w-full rounded-full h-12">
                                    View My Orders
                                </Button>
                            </Link>
                            <Link href="/products" className="flex-1">
                                <Button className="w-full rounded-full h-12 gap-2">
                                    Continue Shopping
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
