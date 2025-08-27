"use client"

import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/add-property/image-upload"
import { BasicInformation } from "@/components/add-property/basic-information"
import { LocationForm } from "@/components/add-property/location-form"
import { PropertyDetails } from "@/components/add-property/property-details"
import { FeaturesAmenities } from "@/components/add-property/features-amenities"
import { PropertyPreview } from "@/components/add-property/property-preview"
import { Camera } from "lucide-react"
import { PropertyFormData, propertySchema } from "@/lib/schemas/property"
import { toast } from "sonner"
import { createProperty } from "@/service/property"
import { handleError } from "@/lib/utils"

export default function AddPropertyPage() {
    const [images, setImages] = useState<File[]>([])
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<PropertyFormData>({
        resolver: zodResolver(propertySchema),
    })

    const watchedFormData = watch()

    const handleFeatureToggle = (feature: string) => {
        const updatedFeatures = selectedFeatures.includes(feature)
            ? selectedFeatures.filter((f) => f !== feature)
            : [...selectedFeatures, feature]

        setSelectedFeatures(updatedFeatures)
        setValue("features", updatedFeatures)
    }

    const handleRemoveFeature = (feature: string) => {
        const updatedFeatures = selectedFeatures.filter((f) => f !== feature)
        setSelectedFeatures(updatedFeatures)
        setValue("features", updatedFeatures)
    }

    const { mutate, isPending } = useMutation({
        mutationFn: async ({ data, images }: { data: PropertyFormData, images: File[] }) => {
            const res = await createProperty(data, images)
            return res
        },
        onSuccess: () => {
            toast.success("Property created successfully")
            router.push("/properties")
        },
        onError: (error) => {
            toast.error(handleError(error))
        }
    })

    const onSubmit: SubmitHandler<PropertyFormData> = async (data: PropertyFormData) => {
        mutate({ data, images })
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">List Your Property</h1>
                    <p className="text-muted-foreground">Fill out the details below to list your property on our platform</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Form */}
                        <div className="lg:col-span-2 space-y-8">
                            <BasicInformation
                                register={register}
                                errors={errors}
                                setValue={setValue}
                            />

                            <LocationForm
                                register={register}
                                errors={errors}
                            />

                            <PropertyDetails
                                register={register}
                                errors={errors}
                            />

                            <FeaturesAmenities
                                selectedFeatures={selectedFeatures}
                                onFeatureToggle={handleFeatureToggle}
                                onRemoveFeature={handleRemoveFeature}
                                errors={errors.features?.message}
                            />

                            {/* Images */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Camera className="h-5 w-5" />
                                        Property Images
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ImageUpload onImagesChange={setImages} maxImages={10} images={images} />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <PropertyPreview
                                formData={watchedFormData}
                                images={images}
                            />

                            {/* Submit */}
                            <Card className="sticky top-20">
                                <CardContent className="p-6">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        size="lg"
                                        disabled={isPending}
                                    >
                                        {isPending ? "Publishing Property..." : "Publish Property"}
                                    </Button>
                                    <p className="text-xs text-muted-foreground text-center mt-2">
                                        By publishing, you agree to our terms and conditions
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
