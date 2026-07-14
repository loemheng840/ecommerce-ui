import Link from "next/link";
import { Globe, Mail, MessageSquare, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border pt-16 pb-24 md:pb-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-inner">
                <span className="text-primary-foreground font-bold text-lg leading-none">A</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">Aura</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm">
              The premier destination for premium tech, fashion, and lifestyle products. 
              Designed with minimalism and accessibility in mind.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Link href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"><Globe className="w-5 h-5" /></Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"><Mail className="w-5 h-5" /></Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"><MessageSquare className="w-5 h-5" /></Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground mb-2">Shop</h4>
            <Link href="/category/electronics" className="text-sm text-muted-foreground hover:text-primary transition-colors">Electronics</Link>
            <Link href="/category/fashion" className="text-sm text-muted-foreground hover:text-primary transition-colors">Fashion</Link>
            <Link href="/category/home" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home & Living</Link>
            <Link href="/category/sports" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sports</Link>
            <Link href="/category/beauty" className="text-sm text-muted-foreground hover:text-primary transition-colors">Beauty</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground mb-2">Support</h4>
            <Link href="/track" className="text-sm text-muted-foreground hover:text-primary transition-colors">Track Order</Link>
            <Link href="/returns" className="text-sm text-muted-foreground hover:text-primary transition-colors">Returns & Exchanges</Link>
            <Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping Info</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
            <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground mb-2">Legal</h4>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/cookie" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aura Commerce. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground mr-2">Secure Payments</span>
              <CreditCard className="w-6 h-6 text-muted-foreground" />
              <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-[10px] font-bold">ABA</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
