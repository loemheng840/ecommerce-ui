export const brands = [
  { id: "apple", name: "Apple", count: 2 },
  { id: "sony", name: "Sony", count: 1 },
  { id: "keychron", name: "Keychron", count: 1 },
  { id: "garmin", name: "Garmin", count: 1 },
  { id: "bellroy", name: "Bellroy", count: 1 },
  { id: "artisan", name: "Artisan", count: 1 },
  { id: "essentials", name: "Essentials", count: 1 },
];

export const categories = [
  { id: "electronics", name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&auto=format&fit=crop", count: 1240 },
  { id: "fashion", name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop", count: 850 },
  { id: "home", name: "Home & Living", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=600&auto=format&fit=crop", count: 640 },
  { id: "sports", name: "Sports", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop", count: 320 },
  { id: "beauty", name: "Beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop", count: 420 },
];

export const products = [
  {
    id: "p1",
    name: "MacBook Pro 16-inch M3 Max",
    brand: "Apple",
    category: "electronics",
    price: 3499.00,
    oldPrice: 3699.00,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop"],
    isNew: true,
    isBestseller: true,
    stock: 45,
    description: "The most advanced Mac ever built. Featuring the M3 Max chip for unparalleled performance.",
    colors: ["#C0C0C0", "#2C2C2C"],
    variants: ["512GB", "1TB", "2TB"],
    storeId: "store-1"
  },
  {
    id: "p2",
    name: "AirPods Pro (2nd generation)",
    brand: "Apple",
    category: "electronics",
    price: 249.00,
    rating: 4.8,
    reviews: 3042,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800&auto=format&fit=crop"],
    isNew: false,
    isBestseller: true,
    stock: 200,
    description: "Active Noise Cancellation reduces unwanted background noise. Adaptive Transparency lets outside sounds in while reducing loud environmental noise.",
    colors: ["#FFFFFF"],
    variants: [],
    storeId: "store-1"
  },
  {
    id: "p3",
    name: "Sony WH-1000XM5 Wireless",
    brand: "Sony",
    category: "electronics",
    price: 398.00,
    oldPrice: 420.00,
    rating: 4.7,
    reviews: 840,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop"],
    isNew: false,
    isBestseller: true,
    stock: 12,
    description: "Industry leading noise canceling headphones with Auto NC Optimizer.",
    colors: ["#000000", "#F4F4F4", "#1F2232"],
    variants: [],
    storeId: "store-2"
  },
  {
    id: "p4",
    name: "Minimalist Ceramic Coffee Mug",
    brand: "Artisan",
    category: "home",
    price: 24.00,
    rating: 4.9,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop"],
    isNew: true,
    isBestseller: false,
    stock: 150,
    description: "Handcrafted ceramic mug with a matte finish. Perfect for your morning coffee.",
    colors: ["#DCD7C9", "#A27B5C", "#3F4E4F"],
    variants: [],
    storeId: "store-3"
  },
  {
    id: "p5",
    name: "Premium Cotton T-Shirt",
    brand: "Essentials",
    category: "fashion",
    price: 35.00,
    rating: 4.5,
    reviews: 430,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop"],
    isNew: false,
    isBestseller: true,
    stock: 500,
    description: "Ultra-soft, breathable 100% organic cotton t-shirt.",
    colors: ["#FFFFFF", "#000000", "#5E5E5E"],
    variants: ["S", "M", "L", "XL"],
    storeId: "store-4"
  },
  {
    id: "p6",
    name: "Mechanical Keyboard Pro",
    brand: "Keychron",
    category: "electronics",
    price: 129.00,
    oldPrice: 149.00,
    rating: 4.8,
    reviews: 125,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop"],
    isNew: true,
    isBestseller: false,
    stock: 60,
    description: "Wireless mechanical keyboard with tactile switches and RGB backlight.",
    colors: ["#2C2C2C"],
    variants: ["Brown Switch", "Red Switch", "Blue Switch"],
    storeId: "store-1"
  },
  {
    id: "p7",
    name: "Smart Fitness Watch",
    brand: "Garmin",
    category: "sports",
    price: 199.00,
    rating: 4.6,
    reviews: 512,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop"],
    isNew: false,
    isBestseller: true,
    stock: 85,
    description: "Track your workouts, heart rate, and sleep with precision.",
    colors: ["#000000", "#FFFFFF", "#FF5733"],
    variants: [],
    storeId: "store-2"
  },
  {
    id: "p8",
    name: "Luxury Leather Wallet",
    brand: "Bellroy",
    category: "fashion",
    price: 89.00,
    oldPrice: 110.00,
    rating: 4.9,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop"],
    isNew: false,
    isBestseller: false,
    stock: 40,
    description: "Slim, premium leather wallet with RFID protection.",
    colors: ["#8B4513", "#000000"],
    variants: [],
    storeId: "store-4"
  }
];

export const stores = [
  {
    id: "store-1",
    name: "Tech Haven",
    logo: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=150&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop",
    rating: 4.9,
    followers: 12500,
    isVerified: true,
    description: "Your ultimate destination for premium electronics and gadgets.",
  },
  {
    id: "store-2",
    name: "Gadget World",
    logo: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?q=80&w=150&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1600&auto=format&fit=crop",
    rating: 4.7,
    followers: 8400,
    isVerified: true,
    description: "Top-tier audio and smart sports accessories.",
  },
  {
    id: "store-3",
    name: "Artisan Living",
    logo: "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=150&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
    rating: 4.8,
    followers: 3200,
    isVerified: false,
    description: "Handcrafted home goods for a minimalist lifestyle.",
  },
  {
    id: "store-4",
    name: "Urban Essentials",
    logo: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=150&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
    rating: 4.6,
    followers: 18900,
    isVerified: true,
    description: "Premium fashion essentials and accessories for the modern urbanite.",
  }
];

export const coupons = [
  {
    id: "c1",
    storeId: "store-1",
    code: "TECH20",
    discount: "20% OFF",
    minSpend: 50,
    expiryDate: "2026-08-15"
  },
  {
    id: "c2",
    storeId: "store-1",
    code: "WELCOME10",
    discount: "$10 OFF",
    minSpend: 0,
    expiryDate: "2026-12-31"
  },
  {
    id: "c3",
    storeId: "store-2",
    code: "AUDIO15",
    discount: "15% OFF",
    minSpend: 100,
    expiryDate: "2026-09-01"
  },
  {
    id: "c4",
    storeId: "store-4",
    code: "URBANFREESHIP",
    discount: "FREE SHIPPING",
    minSpend: 75,
    expiryDate: "2026-11-20"
  }
];

export const statistics = {
  products: "5,000+",
  customers: "120,000+",
  orders: "850,000+",
  brands: "350+",
  countries: "20+",
  satisfaction: "98%"
};

export const reviews = [
  { id: 1, user: "Alex M.", rating: 5, text: "Incredible build quality and fast shipping. Highly recommend!", date: "2 days ago" },
  { id: 2, user: "Sarah J.", rating: 4, text: "Great product, but the packaging was slightly damaged.", date: "1 week ago" },
  { id: 3, user: "David C.", rating: 5, text: "The UI of this store is beautiful and checkout was a breeze.", date: "2 weeks ago" },
];
