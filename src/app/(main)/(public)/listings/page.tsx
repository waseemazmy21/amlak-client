"use client"

import { useState } from "react"
import { PropertyCard } from "@/components/listings/property-card"
import { PropertyFiltersComponent } from "@/components/listings/property-filters"
import { PropertyPagination } from "@/components/listings/property-pagination"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PropertyFilters } from "@/types/property"
import { Search, SlidersHorizontal } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getProperties } from "@/service/property"
import { DeafultPropertyFilters } from "@/types/property"

export default function ListingsPage() {
    const [filters, setFilters] = useState<PropertyFilters>(DeafultPropertyFilters)
    const [showFilters, setShowFilters] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12

    const {
        data,
        isLoading: loading,
        error,
        refetch
    } = useQuery({
        queryKey: ['properties', filters, currentPage],
        queryFn: () => getProperties({
            ...filters,
            page: currentPage,
        }),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    })

    const handleFiltersChange = (newFilters: PropertyFilters) => {
        setFilters(newFilters)
        setCurrentPage(1)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (error || !data) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="p-8 text-center">
                    <p className="text-destructive">Error loading properties: {error instanceof Error ? error.message : 'Unknown error'}</p>
                    <Button onClick={() => refetch()} className="mt-4">
                        Try Again
                    </Button>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 md:py-8">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">Property Listings</h1>
                            <p className="text-muted-foreground">
                                {loading ? "Loading..." : `${data.totalItems} properties found`}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Mobile Filter Toggle */}
                            <Button
                                variant="outline"
                                size="sm"
                                className="lg:hidden bg-transparent"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                Filters
                            </Button>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {Object.keys(filters).length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {filters.search && (
                                <Badge variant="secondary" className="px-3 py-1">
                                    📍 {filters.search}
                                </Badge>
                            )}
                            {filters.propertyType && (
                                <Badge variant="secondary" className="px-3 py-1">
                                    🏠 {filters.propertyType}
                                </Badge>
                            )}
                            {filters.minPrice && (
                                <Badge variant="secondary" className="px-3 py-1">
                                    💰 ${filters.minPrice.toLocaleString()}+
                                </Badge>
                            )}
                            {filters.minBedrooms && (
                                <Badge variant="secondary" className="px-3 py-1">
                                    🛏️ {filters.minBedrooms}+ beds
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
                    {/* Filters Sidebar - Desktop */}
                    <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
                        <PropertyFiltersComponent onFiltersChange={handleFiltersChange} initialFilters={filters} />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <Card key={i} className="overflow-hidden bg-muted/20 border-0">
                                        <div className="h-48 md:h-64 bg-muted animate-pulse" />
                                        <CardContent className="p-4 md:p-6">
                                            <div className="space-y-3">
                                                <div className="h-4 bg-muted rounded animate-pulse" />
                                                <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                                                <div className="h-6 bg-muted rounded w-1/2 animate-pulse" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : data.properties.length > 0 ? (
                            <>
                                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                                    {data.properties.map((property) => (
                                        <PropertyCard key={property._id} property={property} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                <PropertyPagination
                                    currentPage={currentPage}
                                    totalPages={data.totalPages}
                                    onPageChange={handlePageChange}
                                    totalItems={data.totalItems}
                                    itemsPerPage={itemsPerPage}
                                />
                            </>
                        ) : (
                            <Card className="p-8 md:p-12 text-center bg-muted/20 border-0">
                                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="text-lg font-semibold mb-2">No properties found</h3>
                                <p className="text-muted-foreground mb-4">
                                    Try adjusting your filters or search criteria to find more properties.
                                </p>
                                <Button onClick={() => setFilters({})}>Clear Filters</Button>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
