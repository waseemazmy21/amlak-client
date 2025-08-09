import { UpdateUserFormData } from "@/lib/schemas/user"
import api from "./axios"

export const updateUser = async (data: UpdateUserFormData, id: string) => {
    const { fullName, bio, email, phone } = data
    const res = api.patch(`/users/${id}`, {
        fullName,
        email,
        phone,
        bio: bio || undefined
    })
    return res
}