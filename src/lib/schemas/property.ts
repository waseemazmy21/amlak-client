import * as z from "zod"
import { PropertyStatus } from "../types";

const VALIDATION_LIMITS = {
    MIN_YEAR_BUILT: 1800,
    MAX_YEAR_BUILT: new Date().getFullYear(),
    MIN_TITLE_LENGTH: 5,
    MIN_DESCRIPTION_LENGTH: 20,
    MIN_FEATURES: 0,
}

export const propertySchema = z.object({
    title: z
        .string()
        .min(VALIDATION_LIMITS.MIN_TITLE_LENGTH, "Title must be at least 5 characters"),

    description: z
        .string()
        .min(VALIDATION_LIMITS.MIN_DESCRIPTION_LENGTH, "Description must be at least 20 characters"),

    price: z
        .number()
        .min(1, "Price must be greater than 0"),

    location: z.object({
        address: z
            .string(),
        city: z
            .string(),
        state: z
            .string(),
    }),

    propertyType: z.enum(["house", "apartment", "condo", "townhouse", "land"]),

    propertyStatus: z.enum(PropertyStatus),

    bedrooms: z
        .number()
        .min(0, "Bedrooms must be 0 or more"),

    bathrooms: z
        .number()
        .min(0, "Bathrooms must be 0 or more"),

    area: z
        .number()
        .min(1, "Square footage must be greater than 0"),

    yearBuilt: z
        .number()
        .min(VALIDATION_LIMITS.MIN_YEAR_BUILT, "Year built must be valid")
        .max(VALIDATION_LIMITS.MAX_YEAR_BUILT, "Year cannot be in the future"),

    features: z
        .array(z.string())
        .min(VALIDATION_LIMITS.MIN_FEATURES, "At least one feature is required"),
});


export type PropertyFormData = z.infer<typeof propertySchema>
