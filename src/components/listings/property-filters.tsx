"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { DeafultPropertyFilters, type PropertyFilters } from "@/types/property"
import { Search, X, SlidersHorizontal } from "lucide-react"
import { PropertyType } from "@/lib/types"

interface PropertyFiltersProps {
  onFiltersChange: (filters: PropertyFilters) => void
  initialFilters?: PropertyFilters
}

export function PropertyFiltersComponent({ onFiltersChange, initialFilters = DeafultPropertyFilters }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters)
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 5000000])

  const handleFilterChange = (key: keyof PropertyFilters, value: string | number | undefined) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
  }

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
    setFilters({ ...filters, minPrice: values[0], maxPrice: values[1] })
  }

  const applyFilters = () => {
    onFiltersChange(filters)
  }

  const clearFilters = () => {
    setFilters(DeafultPropertyFilters)
    setPriceRange([0, 5000000])
    onFiltersChange(DeafultPropertyFilters)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="sticky top-20 bg-muted/20 border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </div>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location */}
        <div>
          <Label htmlFor="location" className="text-sm font-medium">
            Location
          </Label>
          <Input
            id="location"
            placeholder="City, State, or ZIP"
            value={filters.search || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="mt-2"
          />
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="mt-4 mb-4">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              max={5000000}
              min={0}
              step={10000}
              className="w-full"
              minStepsBetweenThumbs={1}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <Label className="text-sm font-medium">Property Type</Label>
          <Select
            value={filters.propertyType || "any"}
            onValueChange={(value) => handleFilterChange("propertyType", value === "any" ? undefined : value)}
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any type</SelectItem>
              {Object.values(PropertyType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div>
          <Label className="text-sm font-medium">Bedrooms</Label>
          <Select
            value={filters.minBedrooms?.toString() || "any"}
            onValueChange={(value) => handleFilterChange("minBedrooms", value === "any" ? undefined : Number(value))}
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div>
          <Label className="text-sm font-medium">Bathrooms</Label>
          <Select

            value={filters.minBathrooms?.toString() || "any"}
            onValueChange={(value) => handleFilterChange("minBathrooms", value === "any" ? undefined : Number(value))}
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={applyFilters} className="w-full cursor-pointer">
          <Search className="h-4 w-4 mr-2" />
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}
