export type PropertyType = "house" | "apartment" | "condo" | "townhouse" | "land"

export interface PropertyFormData {
    title: string
    description: string
    price: number
    address: string
    city: string
    state: string
    zipCode: string
    propertyType: PropertyType
    bedrooms: number
    bathrooms: number
    squareFootage: number
    yearBuilt: number
    features: string[]
}

export interface PropertyFormProps {
    onSubmit: (data: PropertyFormData) => void
    isSubmitting?: boolean
}

export interface FeatureManagementProps {
    selectedFeatures: string[]
    onFeatureToggle: (feature: string) => void
    onAddCustomFeature: (feature: string) => void
    onRemoveFeature: (feature: string) => void
    errors?: string
}

export interface PropertyPreviewProps {
    formData: Partial<PropertyFormData>
    images: File[]
}
