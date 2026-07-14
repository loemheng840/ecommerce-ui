"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Star, UserPlus, UserCheck, Users } from "lucide-react";
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
      <div className="h-48 md:h-72 w-full relative overflow-hidden">
        <img
          src={store.coverImage}
          alt={`${store.name} cover`}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Logo row — only the logo overlaps the cover; actions sit to the right */}
        <div className="relative flex items-end justify-between gap-4 -mt-14 md:-mt-20">
          <div className="relative shrink-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-[28px] ring-4 ring-background overflow-hidden bg-background relative z-10 shadow-xl">
              <img
                src={store.logo}
                alt={store.name}
                className="w-full h-full object-cover"
              />
            </div>
            {store.isVerified && (
              <div className="absolute -bottom-1.5 -right-1.5 z-20 bg-background rounded-full p-1 shadow-md">
                <CheckCircle2 className="w-6 h-6 text-primary fill-primary text-background" />
              </div>
            )}
          </div>

          {/* Actions align to the bottom of the logo (desktop) */}
          <div className="hidden md:flex items-center gap-3 mb-1 shrink-0">
            <Button
              className={`gap-2 rounded-full px-6 transition-all ${isFollowing ? "bg-secondary text-secondary-foreground hover:bg-secondary" : ""
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
            <Button variant="outline" size="icon" className="rounded-full shrink-0" aria-label="Chat with store">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Info — sits below the logo on the clean card background */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-1.5">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              {store.name}
            </h1>
            {store.isVerified && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">
                <CheckCircle2 className="w-3 h-3 fill-primary text-background" />
                Verified
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground max-w-xl mb-4 leading-relaxed">
            {store.description}
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 text-sm rounded-full bg-secondary/60 border border-border/50 px-3 py-1">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span className="font-semibold">{store.rating}</span>
              <span className="text-muted-foreground">Rating</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm rounded-full bg-secondary/60 border border-border/50 px-3 py-1">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-semibold tabular-nums">{(followerCount / 1000).toFixed(1)}k</span>
              <span className="text-muted-foreground">Followers</span>
            </span>
          </div>

          {/* Mobile actions — full width below the info */}
          <div className="flex md:hidden items-center gap-3 mt-5">
            <Button
              className={`flex-1 gap-2 rounded-full px-6 transition-all ${isFollowing ? "bg-secondary text-secondary-foreground hover:bg-secondary" : ""
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
            <Button variant="outline" size="icon" className="rounded-full shrink-0" aria-label="Chat with store">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
