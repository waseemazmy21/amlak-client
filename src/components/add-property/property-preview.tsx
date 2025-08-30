"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Bed, Bath, Square } from "lucide-react"
import { PropertyFormData } from "@/lib/schemas/property"

type PropertyPreviewProps = {
    formData: PropertyFormData
    images: File[]
}

export function PropertyPreview({ formData, images }: PropertyPreviewProps) {
    return (
        <Card >
            <CardHeader>
                <CardTitle>Listing Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    {images.length > 0 ? (
                        <Image
                            src={URL.createObjectURL(images[0]) || "/placeholder.svg"}
                            alt="Property preview"
                            className="w-full h-full object-cover rounded-lg"
                            width={500}
                            height={500}
                        />
                    ) : (
                        <div className="text-center">
                            <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">No images uploaded</p>
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="font-semibold line-clamp-2">{formData.title || "Property Title"}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        {formData.location?.city && formData.location?.state ? `${formData.location.city}, ${formData.location.state}` : "Location"}
                    </p>
                    <p className="text-lg font-bold text-primary mt-2">
                        {formData.price ? `$${formData.price}` : "$0"}
                    </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{formData.bedrooms || 0}</span>
                    </div>
                    <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{formData.bathrooms || 0}</span>
                    </div>
                    <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{formData.area || 0}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
