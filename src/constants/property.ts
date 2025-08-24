import { PropertyType } from "@/types/property"

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condo" },
    { value: "townhouse", label: "Townhouse" },
    { value: "land", label: "Land" },
]

export const COMMON_FEATURES = [
    "Hardwood Floors",
    "Stainless Steel Appliances",
    "Granite Countertops",
    "Walk-in Closet",
    "Balcony/Patio",
    "In-unit Laundry",
    "Dishwasher",
    "Air Conditioning",
    "Heating",
    "Fireplace",
    "Garage",
    "Parking",
    "Garden/Yard",
    "Swimming Pool",
    "Gym/Fitness Center",
    "Elevator",
    "Doorman/Concierge",
    "Pet Friendly",
    "Storage Unit",
    "High Ceilings",
    "Large Windows",
    "City Views",
    "Water Views",
    "Recently Renovated",
    "New Construction",
]

export const PROPERTY_FORM_DEFAULTS = {
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: 1000,
    yearBuilt: 2020,
    features: [],
}

export const VALIDATION_LIMITS = {
    MIN_YEAR_BUILT: 1800,
    MAX_YEAR_BUILT: new Date().getFullYear(),
    MIN_TITLE_LENGTH: 5,
    MIN_DESCRIPTION_LENGTH: 20,
    MIN_ADDRESS_LENGTH: 5,
    MIN_CITY_LENGTH: 2,
    MIN_STATE_LENGTH: 2,
    MIN_ZIP_LENGTH: 5,
    MIN_FEATURES: 1,
}
