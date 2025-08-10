"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Heart, Home, UserIcon } from 'lucide-react'
import { User } from "@/lib/types"
import useAuth from "@/hooks/useAuth"


export function ProfileSidebar() {
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
                        variant="secondary"
                        className="w-full justify-start"
                    >
                        <UserIcon className="h-4 w-4 mr-2" />
                        Overview
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                    >
                        <Heart className="h-4 w-4 mr-2" />
                        Favorites ({5})
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                    >
                        <Home className="h-4 w-4 mr-2" />
                        My Listings ({50})
                    </Button>
                </nav>
            </CardContent>
        </Card>
    )
}

export default ProfileSidebar