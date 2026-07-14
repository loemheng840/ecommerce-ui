import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-background min-h-[70vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Simple Pricing</h1>
          <p className="text-xl text-muted-foreground mb-8">
            As a retail platform, all our products are priced individually.
            If you are looking for Aura Plus subscriptions, they are coming soon.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
