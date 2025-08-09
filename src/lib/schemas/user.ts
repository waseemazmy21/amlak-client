import * as z from "zod";

const fullName = z
    .string()
    .min(3, "Full name must be at least 3 characters long")
    .max(50, "Full name must be at most 50 characters long");

const email = z
    .email("Invalid email address");

const password = z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(30, "Password must be at most 30 characters long");

const phone = z
    .e164("Phone must start with country code");

const bio = z
    .string()
    .max(255, "Bio must be at most 255 characters long")
    .optional();

// For creating a user
export const registerSchema = z.object({
    fullName,
    email,
    password,
    confirmPassowrd: z.string().nonempty("Confirm passowrd is required"),
    phone,
    bio,
}).refine((data) => data.password === data.confirmPassowrd, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});;

export type RegisterFormData = z.infer<typeof registerSchema>;

// For logging in
export const loginSchema = z.object({
    email,
    password
});

export type LoginFormData = z.infer<typeof loginSchema>

export const updateUserSchema = z.object({
    fullName: fullName.optional(),
    email: email.optional(),
    phone: phone.optional(),
    bio,
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>

