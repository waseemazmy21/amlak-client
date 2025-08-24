"use client"

import { UseFormRegister, FieldErrors } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bed, Bath, Square, Calendar } from "lucide-react"
import { PropertyFormData } from "@/lib/schemas/property"

interface PropertyDetailsProps {
    register: UseFormRegister<PropertyFormData>
    errors: FieldErrors<PropertyFormData>
}

export function PropertyDetails({ register, errors }: PropertyDetailsProps) {
    const currentYear = new Date().getFullYear()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <div className="relative">
                            <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                id="bedrooms"
                                type="number"
                                min="0"
                                className="pl-10"
                                {...register("bedrooms", { valueAsNumber: true })}
                            />
                        </div>
                        {errors.bedrooms && <p className="text-sm text-destructive">{errors.bedrooms.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <div className="relative">
                            <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                id="bathrooms"
                                type="number"
                                min="0"
                                step="0.5"
                                className="pl-10"
                                {...register("bathrooms", { valueAsNumber: true })}
                            />
                        </div>
                        {errors.bathrooms && <p className="text-sm text-destructive">{errors.bathrooms.message}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="area">Square Footage</Label>
                        <div className="relative">
                            <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                id="area"
                                type="number"
                                min="1"
                                className="pl-10"
                                {...register("area", { valueAsNumber: true })}
                            />
                        </div>
                        {errors.area && (
                            <p className="text-sm text-destructive">{errors.area.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="yearBuilt">Year Built</Label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                id="yearBuilt"
                                type="number"
                                min="1800"
                                max={currentYear}
                                className="pl-10"
                                {...register("yearBuilt", { valueAsNumber: true })}
                            />
                        </div>
                        {errors.yearBuilt && <p className="text-sm text-destructive">{errors.yearBuilt.message}</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
