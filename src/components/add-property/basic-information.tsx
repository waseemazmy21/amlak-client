"use client"

import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, DollarSign } from "lucide-react"
import { PropertyFormData } from "@/lib/schemas/property"
import { PROPERTY_STATUS, PROPERTY_TYPES } from "@/constants/property"
import { PropertyType } from "@/types/property"
import { PropertyStatus } from "@/lib/types"


interface BasicInformationProps {
    register: UseFormRegister<PropertyFormData>
    errors: FieldErrors<PropertyFormData>
    setValue: UseFormSetValue<PropertyFormData>
}

export function BasicInformation({ register, errors, setValue }: BasicInformationProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Basic Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Property Title</Label>
                    <Input
                        id="title"
                        placeholder="e.g., Modern Downtown Apartment with City Views"
                        {...register("title")}
                    />
                    {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        rows={4}
                        placeholder="Describe your property in detail..."
                        {...register("description")}
                    />
                    {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                </div>

                <div className="grid md:grid-cols-3 gap-4 jus">
                    <div className="space-y-2">
                        <Label htmlFor="propertyType">Property Type</Label>
                        <Select onValueChange={(value: PropertyType) => setValue("propertyType", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                            <SelectContent>
                                {PROPERTY_TYPES.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.propertyType && <p className="text-sm text-destructive">{errors.propertyType.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="propertyStatus">Property Status</Label>
                        <Select onValueChange={(value: PropertyStatus) => setValue("propertyStatus", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select property status" />
                            </SelectTrigger>
                            <SelectContent>
                                {PROPERTY_STATUS.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.propertyStatus && <p className="text-sm text-destructive">{errors.propertyStatus.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                id="price"
                                type="number"
                                placeholder="750000"
                                className="pl-10"
                                {...register("price", { valueAsNumber: true })}
                            />
                        </div>
                        {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
