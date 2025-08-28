"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Home, UserIcon } from 'lucide-react'
import useAuth from "@/hooks/useAuth"
import { ProfileTabs } from "@/constants/profile"

interface ProfileSidebarProps {
    tab: ProfileTabs
    setTab: (tab: ProfileTabs) => void
}

export function ProfileSidebar({ tab, setTab }: ProfileSidebarProps) {
    const { user } = useAuth()

    if (!user) return <></>

    return (
        <Card className="sticky top-20 border-border">
            <CardContent className="p-6">
                <div className="text-center mb-6">
                    <div className="relative inline-block">
                        <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-2xl">
                                {user.fullName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                            <Camera className="h-4 w-4" />
                        </Button>
                    </div>
                    <h3 className="font-semibold text-lg mt-4">{user.fullName}</h3>
                    <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>

                <nav className="space-y-2">
                    <Button
                        variant={tab === 'overview' ? 'default' : 'ghost'}
                        className='w-full justify-start'
                        onClick={() => setTab('overview')}
                    >
                        <UserIcon className="h-4 w-4 mr-2" />
                        Overview
                    </Button>
                    <Button
                        variant={tab === 'listings' ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setTab('listings')}
                    >
                        <Home className="h-4 w-4 mr-2" />
                        My Listings
                    </Button>
                </nav>
            </CardContent>
        </Card>
    )
}

export default ProfileSidebar