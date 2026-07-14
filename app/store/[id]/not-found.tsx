import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";
import Link from "next/link";

export default function StoreNotFound() {
    return (
        <>
            <Navbar />
            <main className="flex-1 pt-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
                        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                            <Store className="w-8 h-8 text-muted-foreground/50" strokeWidth={1.25} />
                        </div>
                        <h1 className="text-2xl font-semibold tracking-tight mb-2">Store not found</h1>
                        <p className="text-muted-foreground max-w-sm mb-6">
                            The store you&apos;re looking for doesn&apos;t exist or may have been removed.
                        </p>
                        <Link href="/products">
                            <Button className="rounded-full h-12 px-8">Browse Products</Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
