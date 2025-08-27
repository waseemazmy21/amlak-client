"use client"

import { useState } from "react"
import type { Property } from "@/types/property"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation } from "lucide-react"

interface EnhancedMapProps {
    properties: Property[]
    selectedProperty?: Property | null
    onPropertySelect?: (property: Property) => void
    className?: string
}

export function EnhancedMap({ properties, selectedProperty, onPropertySelect, className }: EnhancedMapProps) {
    const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
        }).format(price)
    }

    return (
        <Card className={`overflow-h_idden bg-muted/20 border-0 ${className}`}>
            <CardContent className="p-0 relative">
                <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 h-full flex items-center justify-center min-h-[400px]">
                    {/* Map Placeholder with Property Markers */}
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center p-8">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Navigation className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                                <p className="text-muted-foreground text-sm mb-4">Showing {properties.length} properties</p>
                                <div className="text-xs text-muted-foreground">
                                    Google Maps / Mapbox integration would be implemented here
                                </div>
                            </div>
                        </div>

                        {/* Property Markers Simulation */}
                        <div className="absolute inset-0 p-8">
                            {properties.slice(0, 6).map((property, index) => (
                                <div
                                    key={property._id}
                                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${selectedProperty?._id === property._id ? "z-20" : "z-10"
                                        }`}
                                    style={{
                                        left: `${20 + (index % 3) * 30}%`,
                                        top: `${30 + Math.floor(index / 3) * 40}%`,
                                    }}
                                    onClick={() => onPropertySelect?.(property)}
                                    onMouseEnter={() => setHoveredProperty(property)}
                                    onMouseLeave={() => setHoveredProperty(null)}
                                >
                                    <div
                                        className={`relative transition-all duration-200 ${selectedProperty?._id === property._id || hoveredProperty?._id === property._id
                                            ? "scale-110"
                                            : "hover:scale-105"
                                            }`}
                                    >
                                        <div
                                            className={`px-3 py-2 rounded-lg shadow-lg border-2 text-sm font-medium ${selectedProperty?._id === property._id
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "bg-background border-border hover:border-primary/50"
                                                }`}
                                        >
                                            {formatPrice(property.price)}
                                        </div>
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                                            <MapPin
                                                className={`h-6 w-6 ${selectedProperty?._id === property._id ? "text-primary" : "text-muted-foreground"
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    {/* Property Info Popup */}
                                    {hoveredProperty?._id === property._id && (
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-8 w-64 z-30">
                                            <Card className="shadow-xl bg-muted/90 backdrop-blur border-0">
                                                <CardContent className="p-4">
                                                    <h4 className="font-semibold text-sm line-clamp-1">{property.title}</h4>
                                                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{property.location.address}</p>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className="text-sm font-bold text-primary">{formatPrice(property.price)}</span>
                                                        <Badge variant="secondary" className="text-xs">
                                                            {property.bedrooms}bd {property.bathrooms}ba
                                                        </Badge>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {selectedProperty && (
                    <div className="absolute bottom-4 left-4 right-4">
                        <Card className="bg-muted/90 backdrop-blur border-0 shadow-lg">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-sm line-clamp-1">{selectedProperty.title}</h4>
                                        <p className="text-xs text-muted-foreground">
                                            {selectedProperty.location.address}, {selectedProperty.location.city}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-primary">{formatPrice(selectedProperty.price)}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {selectedProperty.bedrooms}bd • {selectedProperty.bathrooms}ba
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
