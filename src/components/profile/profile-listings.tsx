import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/listings/property-card"
import type { Property } from "@/types/property"
import { Edit, Eye, Home, Plus } from 'lucide-react'

interface ProfileListingsProps {
    listings?: Property[]
}

export function ProfileListings({ listings = [] }: ProfileListingsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        My Property Listings
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary">{listings.length} properties</Badge>
                        <Button size="sm" asChild>
                            <Link href="/add-property">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Property
                            </Link>
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {listings.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {listings.map((property) => (
                            <div key={property._id} className="relative">
                                <PropertyCard property={property} />
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <Button size="sm" variant="secondary" className="h-8 px-2">
                                        <Edit className="h-3 w-3" />
                                    </Button>
                                    <Button size="sm" variant="secondary" className="h-8 px-2">
                                        <Eye className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Home className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                        <h3 className="font-semibold mb-2">No properties listed yet</h3>
                        <p className="text-muted-foreground mb-4">
                            Start by listing your first property to reach potential buyers
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
