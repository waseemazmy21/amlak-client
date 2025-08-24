import { PropertyFormData } from "@/lib/schemas/property";
import api from "./axios";

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