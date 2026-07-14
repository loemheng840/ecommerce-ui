import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardHeader } from "../_components/dashboard-header";
import { DashboardCard } from "../_components/dashboard-card";

export default function ProfilePage() {
  return (
    <div>
      <DashboardHeader
        title="Profile"
        description="Manage your personal information and password."
      />

      <div className="space-y-6">
        <DashboardCard>
          <h2 className="text-lg font-semibold tracking-tight mb-6">Personal Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" className="bg-background rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" className="bg-background rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" className="bg-background rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 000-0000" className="bg-background rounded-xl h-12" />
            </div>
          </div>

          <Button className="rounded-full h-12 px-8">Save Changes</Button>
        </DashboardCard>

        <DashboardCard>
          <h2 className="text-lg font-semibold tracking-tight mb-6">Change Password</h2>

          <div className="max-w-md space-y-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" placeholder="••••••••" className="bg-background rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" placeholder="••••••••" className="bg-background rounded-xl h-12" />
            </div>
          </div>

          <Button variant="outline" className="rounded-full h-12 px-8">Update Password</Button>
        </DashboardCard>
      </div>
    </div>
  );
}
