"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/lib/store/useCartStore";
import {
    CreditCard,
    Truck,
    MapPin,
    Tag,
    Check,
    Lock,
    ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const mockAddresses = [
    {
        id: "addr-1",
        label: "Home",
        name: "John Doe",
        street: "123 Main Street",
        city: "Phnom Penh",
        state: "Cambodia",
        zip: "12000",
        phone: "+855 12 345 678",
    },
    {
        id: "addr-2",
        label: "Office",
        name: "John Doe",
        street: "456 Business Ave, Floor 5",
        city: "Phnom Penh",
        state: "Cambodia",
        zip: "12100",
        phone: "+855 98 765 432",
    },
];

const paymentMethods = [
    { id: "card", label: "Credit/Debit Card", icon: CreditCard },
    { id: "aba", label: "ABA Pay (QR)", icon: CreditCard },
    { id: "cod", label: "Cash on Delivery", icon: Truck },
];

export default function CheckoutPage() {
    const { items, getTotal, clearCart } = useCartStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0].id);
    const [selectedPayment, setSelectedPayment] = useState("card");
    const [couponCode, setCouponCode] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <>
                <Navbar />
                <main className="flex-1 pt-24 pb-16 bg-background">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="animate-pulse space-y-6">
                            <div className="h-8 bg-muted rounded w-48" />
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="h-48 bg-muted rounded-[24px]" />
                                    <div className="h-48 bg-muted rounded-[24px]" />
                                </div>
                                <div className="h-64 bg-muted rounded-[32px]" />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const subtotal = getTotal();
    const discount = couponApplied ? subtotal * 0.1 : 0;
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = (subtotal - discount) * 0.1;
    const total = subtotal - discount + shipping + tax;

    const handleApplyCoupon = () => {
        if (couponCode.toLowerCase() === "save10") {
            setCouponApplied(true);
            toast.success("Coupon applied! 10% discount");
        } else {
            toast.error("Invalid coupon code");
        }
    };

    const handlePlaceOrder = () => {
        setIsProcessing(true);
        // Simulate order processing
        setTimeout(() => {
            clearCart();
            router.push("/order-success");
        }, 2000);
    };

    if (items.length === 0) {
        return (
            <>
                <Navbar />
                <main className="flex-1 pt-24 pb-16 bg-background flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                        <p className="text-muted-foreground mb-6">Add items before checking out.</p>
                        <Link href="/products">
                            <Button className="rounded-full h-12 px-8">Browse Products</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="flex-1 pt-24 pb-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">Checkout</h1>
                        <p className="text-muted-foreground">Complete your order</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Shipping Address */}
                            <div className="p-6 md:p-8 rounded-[24px] bg-card border border-border/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg">Shipping Address</h2>
                                        <p className="text-sm text-muted-foreground">Select delivery address</p>
                                    </div>
                                </div>

                                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress} className="space-y-3">
                                    {mockAddresses.map((address) => (
                                        <div
                                            key={address.id}
                                            className={`relative flex items-start gap-4 p-4 rounded-[16px] border cursor-pointer transition-all ${selectedAddress === address.id
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border/50 hover:border-primary/30"
                                                }`}
                                            onClick={() => setSelectedAddress(address.id)}
                                        >
                                            <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-semibold text-sm">{address.label}</span>
                                                    {selectedAddress === address.id && (
                                                        <Check className="w-4 h-4 text-primary" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground">{address.name}</p>
                                                <p className="text-sm text-muted-foreground">{address.street}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {address.city}, {address.state} {address.zip}
                                                </p>
                                                <p className="text-sm text-muted-foreground">{address.phone}</p>
                                            </div>
                                        </div>
                                    ))}
                                </RadioGroup>

                                <Button variant="outline" className="mt-4 rounded-full text-sm">
                                    + Add New Address
                                </Button>
                            </div>

                            {/* Payment Method */}
                            <div className="p-6 md:p-8 rounded-[24px] bg-card border border-border/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <CreditCard className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg">Payment Method</h2>
                                        <p className="text-sm text-muted-foreground">Choose how you want to pay</p>
                                    </div>
                                </div>

                                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-3">
                                    {paymentMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            className={`relative flex items-center gap-4 p-4 rounded-[16px] border cursor-pointer transition-all ${selectedPayment === method.id
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border/50 hover:border-primary/30"
                                                }`}
                                            onClick={() => setSelectedPayment(method.id)}
                                        >
                                            <RadioGroupItem value={method.id} id={method.id} />
                                            <method.icon className="w-5 h-5 text-muted-foreground" />
                                            <span className="font-medium text-sm">{method.label}</span>
                                        </div>
                                    ))}
                                </RadioGroup>

                                {selectedPayment === "card" && (
                                    <div className="mt-6 space-y-4 p-4 rounded-[16px] bg-secondary/30 border border-border/50">
                                        <div className="space-y-2">
                                            <Label htmlFor="cardNumber" className="text-sm">Card Number</Label>
                                            <Input
                                                id="cardNumber"
                                                placeholder="4242 4242 4242 4242"
                                                className="rounded-xl h-11 bg-background"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry" className="text-sm">Expiry Date</Label>
                                                <Input
                                                    id="expiry"
                                                    placeholder="MM/YY"
                                                    className="rounded-xl h-11 bg-background"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cvc" className="text-sm">CVC</Label>
                                                <Input
                                                    id="cvc"
                                                    placeholder="123"
                                                    className="rounded-xl h-11 bg-background"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Coupon */}
                            <div className="p-6 md:p-8 rounded-[24px] bg-card border border-border/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Tag className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg">Coupon Code</h2>
                                        <p className="text-sm text-muted-foreground">Have a discount code? Apply it here</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Input
                                        placeholder="Enter coupon code (try: SAVE10)"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="rounded-full h-11 bg-background"
                                        disabled={couponApplied}
                                    />
                                    <Button
                                        variant="outline"
                                        className="rounded-full h-11 px-6 shrink-0"
                                        onClick={handleApplyCoupon}
                                        disabled={couponApplied || !couponCode}
                                    >
                                        {couponApplied ? (
                                            <span className="flex items-center gap-1 text-success">
                                                <Check className="w-4 h-4" /> Applied
                                            </span>
                                        ) : (
                                            "Apply"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 p-6 md:p-8 rounded-[32px] bg-card border border-border/50">
                                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                                {/* Items */}
                                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-3">
                                            <div className="w-14 h-14 rounded-xl bg-muted overflow-hidden shrink-0">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{item.product.name}</p>
                                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="text-sm font-medium shrink-0">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="h-px bg-border mb-4" />

                                {/* Pricing */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                                    </div>
                                    {couponApplied && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-success">Discount (10%)</span>
                                            <span className="font-medium text-success">-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="font-medium">
                                            {shipping === 0 ? (
                                                <span className="text-success">Free</span>
                                            ) : (
                                                `$${shipping.toFixed(2)}`
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tax (10%)</span>
                                        <span className="font-medium">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="h-px bg-border" />
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-bold text-xl">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={handlePlaceOrder}
                                    disabled={isProcessing}
                                    className="w-full rounded-full h-14 text-base font-medium gap-2 shadow-xl hover:scale-[1.02] transition-transform"
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                            Processing...
                                        </span>
                                    ) : (
                                        <>
                                            <Lock className="w-4 h-4" />
                                            Place Order
                                        </>
                                    )}
                                </Button>

                                <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1">
                                    <Lock className="w-3 h-3" />
                                    Secure checkout with SSL encryption
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
