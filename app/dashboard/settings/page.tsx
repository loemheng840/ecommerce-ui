"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "../_components/dashboard-header";
import { DashboardCard } from "../_components/dashboard-card";

type ToggleSetting = {
    id: string;
    label: string;
    description: string;
    defaultOn?: boolean;
};

const notificationSettings: ToggleSetting[] = [
    { id: "order-updates", label: "Order updates", description: "Shipping, delivery and return notifications.", defaultOn: true },
    { id: "promotions", label: "Promotions", description: "Deals, discounts and seasonal offers." },
    { id: "newsletter", label: "Newsletter", description: "Product news and curated picks.", defaultOn: true },
];

const privacySettings: ToggleSetting[] = [
    { id: "profile-visibility", label: "Public profile", description: "Let others see your reviews and lists." },
    { id: "personalization", label: "Personalized recommendations", description: "Use your activity to tailor suggestions.", defaultOn: true },
];

function Toggle({ setting }: { setting: ToggleSetting }) {
    const [on, setOn] = useState(Boolean(setting.defaultOn));
    return (
        <div className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0">
                <p className="text-sm font-medium">{setting.label}</p>
                <p className="text-sm text-muted-foreground">{setting.description}</p>
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-label={setting.label}
                onClick={() => setOn((prev) => !prev)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors cursor-pointer ${on ? "bg-primary" : "bg-border"
                    }`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${on ? "translate-x-5" : "translate-x-0"
                        }`}
                />
            </button>
        </div>
    );
}

export default function SettingsPage() {
    return (
        <div>
            <DashboardHeader
                title="Settings"
                description="Control your notifications and privacy preferences."
            />

            <div className="space-y-6">
                <DashboardCard>
                    <h2 className="text-lg font-semibold tracking-tight mb-2">Notifications</h2>
                    <div className="divide-y divide-border/60">
                        {notificationSettings.map((setting) => (
                            <Toggle key={setting.id} setting={setting} />
                        ))}
                    </div>
                </DashboardCard>

                <DashboardCard>
                    <h2 className="text-lg font-semibold tracking-tight mb-2">Privacy</h2>
                    <div className="divide-y divide-border/60">
                        {privacySettings.map((setting) => (
                            <Toggle key={setting.id} setting={setting} />
                        ))}
                    </div>
                </DashboardCard>

                <DashboardCard>
                    <h2 className="text-lg font-semibold tracking-tight mb-1">Delete account</h2>
                    <p className="text-sm text-muted-foreground mb-5">
                        Permanently remove your account and all associated data. This action cannot be undone.
                    </p>
                    <Button
                        variant="outline"
                        className="rounded-full h-11 px-6 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                    >
                        Delete account
                    </Button>
                </DashboardCard>
            </div>
        </div>
    );
}
