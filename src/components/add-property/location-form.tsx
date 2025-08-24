"use client"

import { UseFormRegister, FieldErrors } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin } from "lucide-react"
import { PropertyFormData } from "@/lib/schemas/property"

interface LocationFormProps {
    register: UseFormRegister<PropertyFormData>
    errors: FieldErrors<PropertyFormData>
}

export function LocationForm({ register, errors }: LocationFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main Street" {...register("location.address")} />
                    {errors.location?.address && <p className="text-sm text-destructive">{errors.location?.address.message}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" {...register("location.city")} />
                        {errors.location?.city && <p className="text-sm text-destructive">{errors.location?.city.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="NY" {...register("location.state")} />
                        {errors.location?.state && <p className="text-sm text-destructive">{errors.location?.state.message}</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
