"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tag, Plus, X } from "lucide-react"
import { COMMON_FEATURES } from "@/constants/property"

interface FeaturesAmenitiesProps {
    selectedFeatures: string[]
    onFeatureToggle: (feature: string) => void
    onRemoveFeature: (feature: string) => void
    errors?: string
}

export function FeaturesAmenities({
    selectedFeatures,
    onFeatureToggle,
    onRemoveFeature,
    errors
}: FeaturesAmenitiesProps) {
    const [customFeature, setCustomFeature] = useState("")

    const handleAddCustomFeature = () => {
        if (customFeature.trim() && !selectedFeatures.includes(customFeature.trim())) {
            onFeatureToggle(customFeature.trim())
            setCustomFeature("")
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Features & Amenities
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Selected Features */}
                {selectedFeatures.length > 0 && (
                    <div>
                        <Label className="text-sm font-medium">Selected Features</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {selectedFeatures.map((feature, index) => (
                                <Badge key={index} variant="secondary" className="px-3 py-1">
                                    {feature}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
                                        onClick={() => onRemoveFeature(feature)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Common Features */}
                <div>
                    <Label className="text-sm font-medium">Common Features</Label>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                        {COMMON_FEATURES.map((feature) => (
                            <div key={feature} className="flex items-center space-x-2">
                                <Checkbox
                                    id={feature}
                                    checked={selectedFeatures.includes(feature)}
                                    onCheckedChange={() => onFeatureToggle(feature)}
                                />
                                <Label htmlFor={feature} className="text-sm cursor-pointer">
                                    {feature}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Custom Feature */}
                <div>
                    <Label className="text-sm font-medium">Add Custom Feature</Label>
                    <div className="flex gap-2 mt-2">
                        <Input
                            placeholder="Enter custom feature"
                            value={customFeature}
                            onChange={(e) => setCustomFeature(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCustomFeature())}
                        />
                        <Button type="button" onClick={handleAddCustomFeature} disabled={!customFeature.trim()}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {errors && <p className="text-sm text-destructive">{errors}</p>}
            </CardContent>
        </Card>
    )
}
