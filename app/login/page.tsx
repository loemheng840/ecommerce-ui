import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Package } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-background flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md px-4 sm:px-6">
          <div className="bg-card rounded-[32px] p-8 md:p-10 border border-border/50 shadow-sm">
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-inner mb-4">
                <Package className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome Back</h1>
              <p className="text-muted-foreground text-sm">Enter your details to sign in to your account</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="bg-background rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</Link>
                </div>
                <Input id="password" type="password" placeholder="••••••••" className="bg-background rounded-xl h-12" />
              </div>
              
              <Button className="w-full rounded-full h-12 text-base font-medium shadow-xl hover:scale-[1.02] transition-transform">
                Sign In
              </Button>
            </div>
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
