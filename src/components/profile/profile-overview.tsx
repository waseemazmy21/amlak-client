'use client';

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User } from '@/lib/types'
import { UserIcon, Mail, Phone, Eye, Heart, Home, TrendingUp, Edit, Save, X } from 'lucide-react'
import { useForm, SubmitHandler } from "react-hook-form"
import { UpdateUserFormData, updateUserSchema } from '@/lib/schemas/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUser } from '@/service/user'
import useAuth from '@/hooks/useAuth'
import { handleError } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner'



const ProfileOverview = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const [isEditing, setIsEditing] = useState<boolean>(false)

    if (!user) return null;


    const { handleSubmit, register, reset, formState: { isSubmitting, errors } } = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: user
    })

    const { mutate: mutateUpdateUser, isPending } = useMutation({
        mutationFn: async (data: UpdateUserFormData) => {
            const res = await updateUser(data, user._id);
            return res.data.data.user as User
        },
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user); // Update cached user
            reset(user); // update form default values
            toast.success('Profile updated successfully');
            setIsEditing(false);
        },
        onError: (err: unknown) => {
            toast.error(handleError(err));
        }
    });

    const onSubmit: SubmitHandler<UpdateUserFormData> = async (data) => {
        mutateUpdateUser(data)
    };


    return (
        <div className="space-y-6">
            {/* Profile Information */}
            <Card className='border-border'>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Profile Information</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} disabled={isSubmitting}>
                        {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                </CardHeader>
                <CardContent>
                    {isEditing ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName" {...register("fullName")} />
                                    {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" {...register("email")} />
                                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" {...register("phone")} />
                                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio (Optional)</Label>
                                <Textarea id="bio" rows={3} {...register("bio")} />
                                {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={isPending} className='disabled:bg-primary/80'>
                                    <Save className="h-4 w-4 mr-2" />
                                    {isPending ? "Saving..." : "Save Changes"}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => { setIsEditing(false) }}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Full Name</p>
                                            <p className="font-medium">{user.fullName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="font-medium">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Phone</p>
                                            <p className="font-medium">{user.phone || "Not provided"}</p>
                                        </div>
                                    </div>
                                    {user.bio && (
                                        <div className="flex items-center gap-3">
                                            <UserIcon className="h-4 w-4 text-muted-foreground" /> {/* Reusing UserIcon for bio */}
                                            <div>
                                                <p className="text-sm text-muted-foreground">Bio</p>
                                                <p className="font-medium leading-relaxed">{user.bio}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6 text-center">
                        <Eye className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">24</p>
                        <p className="text-sm text-muted-foreground">Properties Viewed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 text-center">
                        <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">{5}</p>
                        <p className="text-sm text-muted-foreground">Saved Properties</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 text-center">
                        <Home className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">{50}</p>
                        <p className="text-sm text-muted-foreground">Listed Properties</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 text-center">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-sm text-muted-foreground">Inquiries Sent</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ProfileOverview