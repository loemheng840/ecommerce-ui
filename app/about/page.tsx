import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-background min-h-[70vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight mb-6">About Aura</h1>
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-xl text-muted-foreground mb-8">
              Aura is the premier destination for premium tech, fashion, and lifestyle products. We believe that technology and design should seamlessly blend into your life, enhancing every moment.
            </p>
            <p className="text-muted-foreground mb-6">
              Founded in 2026, Aura started with a simple vision: to curate the world's most beautifully designed products and make them accessible to everyone. We carefully select every item in our store, ensuring it meets our strict standards for quality, aesthetics, and functionality.
            </p>
            <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              To provide a seamless, premium shopping experience that matches the quality of the products we sell. We strive for excellence in customer service, fast shipping, and a curated selection that you won't find anywhere else.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
