"use client"

import { useUser } from "@/contexts/user-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { UserAvatar } from "@/components/ui/user-avatar"
import { Badge } from "@/components/ui/badge"
import { BadgeCheck, Shield, Clock, DollarSign, User } from "lucide-react"

export default function ProfilePage() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">Not logged in</h1>
          <p className="text-muted-foreground">Please log in to view your profile</p>
          <Button asChild className="mt-4">
            <a href="/login">Log in</a>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  const getVerificationStatus = () => {
    if (user.verificationLevel === 3) return "Fully Verified"
    if (user.verificationLevel === 2) return "Level 2 Verified"
    return "Basic Verification"
  }

  const getVerificationBadge = () => {
    if (user.verificationLevel === 3) return <Badge className="ml-2 bg-primary text-primary-foreground">Verified</Badge>
    if (user.verificationLevel === 2) return <Badge className="ml-2 bg-amber-500/20 text-amber-500">Level 2</Badge>
    return <Badge className="ml-2 bg-muted text-muted-foreground">Level 1</Badge>
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information and settings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-7">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <UserAvatar user={user} size="lg" className="mb-4" />
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center mt-2">
                {user.role === "premium" && <Badge className="mr-2 bg-primary/20 text-primary">Premium</Badge>}
                {getVerificationBadge()}
              </div>
              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Member since {new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    Last login {new Date(user.lastLogin).toLocaleDateString()} at{" "}
                    {new Date(user.lastLogin).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Account Balance: ${user.accountBalance.toLocaleString()}</span>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BadgeCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Verification Status</span>
                  </div>
                  <span className="text-sm font-medium">{getVerificationStatus()}</span>
                </div>
                {user.verificationLevel < 3 && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/verification">Complete Verification</a>
                  </Button>
                )}
                {user.role !== "premium" && (
                  <Button className="w-full" asChild>
                    <a href="/upgrade">
                      <Shield className="h-4 w-4 mr-2" />
                      Upgrade to Premium
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-5 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue={user.name.split(" ")[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue={user.name.split(" ")[1] || ""} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="email">Email</Label>
                    <Badge className="ml-2 bg-green-500/10 text-green-500">Verified</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input id="email" type="email" defaultValue={user.email} className="flex-1" readOnly />
                    <Button variant="outline">Change</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center gap-2">
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="flex-1" />
                    <Button variant="outline">Verify</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" defaultValue="1990-01-01" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
                <CardDescription>Update your address details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" defaultValue="123 Main St" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" defaultValue="NY" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip/Postal Code</Label>
                    <Input id="zipCode" defaultValue="10001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <select
                      id="country"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    );
}

