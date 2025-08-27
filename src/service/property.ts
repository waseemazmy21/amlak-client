import { PropertyFormData } from "@/lib/schemas/property";
import api from "./axios";
import type { Property, PropertyFilters, PropertyResponse } from '@/types/property'

export const createProperty = (data: PropertyFormData, images: File[]) => {
    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    images.forEach((image) => {
        formData.append("images", image)
    })

    return api.post("/properties", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

}


export const getProperties = async (filters?: PropertyFilters): Promise<PropertyResponse> => {
    console.log(filters)
    const res = await api.get('/properties', { params: filters })
    return res.data.data
}


export const getPropertyById = async (id: string): Promise<Property> => {
    return await api.get(`/properties/${id}`)
}
