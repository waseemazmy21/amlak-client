export type PropertyType = "house" | "apartment" | "condo" | "townhouse" | "land"

export type Property = {
    _id: string
    title: string
    description: string
    price: number
    location: {
        address: string
        city: string
        state: string
    }
    propertyType: PropertyType
    bedrooms: number
    bathrooms: number
    area: number
    yearBuilt: number
    features: string[]
    images: string[]
    createdAt: string
    updatedAt: string
}

export interface PropertyFilters {
    search?: string
    minPrice?: number
    maxPrice?: number
    propertyType?: string
    minBedrooms?: number
    maxBedrooms?: number
    minBathrooms?: number
    maxBathrooms?: number
    page?: number
    limit?: number
}

export const DeafultPropertyFilters: PropertyFilters = {
    search: '',
    minPrice: undefined,
    maxPrice: undefined,
    propertyType: '',
    minBedrooms: undefined,
    maxBedrooms: undefined,
    minBathrooms: undefined,
    maxBathrooms: undefined,
    page: 1,
    limit: 12
}

export interface PropertyResponse {
    properties: Property[]
    totalItems: number
    totalPages: number
    currentPage: number
    itemsPerPage: number
}

export enum PropertyStatus {
    ForSale = 'for-sale',
    ForRent = 'for-rent',
    Sold = 'sold',
    Rented = 'rented',
}