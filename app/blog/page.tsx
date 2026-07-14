import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-background min-h-[70vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Our Blog</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Latest news, updates, and stories from the Aura team.
          </p>
          <div className="bg-card rounded-[24px] p-8 border border-border/50 text-center text-muted-foreground">
            More content coming soon!
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
