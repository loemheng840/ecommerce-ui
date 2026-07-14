"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Star, UserPlus, UserCheck } from "lucide-react";
import { toast } from "sonner";

interface StoreHeaderProps {
  store: {
    name: string;
    logo: string;
    coverImage: string;
    rating: number;
    followers: number;
    isVerified: boolean;
    description: string;
  };
}

export function StoreHeader({ store }: StoreHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(store.followers);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount((prev) => (isFollowing ? prev - 1 : prev + 1));
    toast.success(
      isFollowing ? `Unfollowed ${store.name}` : `Now following ${store.name}`
    );
  };

  return (
    <div className="bg-card border-b border-border/50">
      {/* Cover Image */}
      <div className="h-48 md:h-64 w-full relative">
        <img
          src={store.coverImage}
          alt={`${store.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col md:flex-row gap-6 -mt-12 md:-mt-16 pb-8 items-start md:items-end">
          {/* Logo */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background overflow-hidden bg-background relative z-10 shadow-lg">
              <img
                src={store.logo}
                alt={store.name}
                className="w-full h-full object-cover"
              />
            </div>
            {store.isVerified && (
              <div className="absolute bottom-2 right-2 z-20 bg-background rounded-full p-0.5 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-primary fill-primary text-background" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 mt-4 md:mt-0 z-10 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-1 text-foreground md:text-foreground">
                  {store.name}
                </h1>
                <p className="text-sm text-muted-foreground max-w-xl mb-3">
                  {store.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold">{store.rating}</span>
                    <span className="text-muted-foreground">Rating</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-border" />
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold">{(followerCount / 1000).toFixed(1)}k</span>
                    <span className="text-muted-foreground">Followers</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0 shrink-0">
                <Button
                  className={`flex-1 md:flex-none gap-2 rounded-full px-6 ${isFollowing ? "bg-secondary text-secondary-foreground hover:bg-secondary" : ""
                    }`}
                  onClick={handleFollow}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-4 h-4" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Follow
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1 md:flex-none gap-2 rounded-full px-6">
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
