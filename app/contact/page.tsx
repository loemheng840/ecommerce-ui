import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-background min-h-[70vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-center">Contact Us</h1>
          <p className="text-lg text-muted-foreground mb-12 text-center">
            Have a question or need support? We're here to help.
          </p>
          
          <div className="bg-card rounded-[32px] p-8 md:p-10 border border-border/50 shadow-sm">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="bg-background rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="bg-background rounded-xl h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="bg-background rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea 
                  id="message" 
                  rows={5}
                  placeholder="How can we help you?"
                  className="flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              
              <Button className="w-full rounded-full h-12 text-base font-medium shadow-xl hover:scale-[1.02] transition-transform">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
