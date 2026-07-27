import { z } from "zod"

export const signUpSchema = z
    .object({
        name: z.string().min(2, { error: "Name must be at least 2 characters"}).max(100),
        email: z.email({error: "Enter a valid email address"}),
        password: z
            .string().min(8, {error: "Password must be at least 8 characters"})
            .max(128, {error: "Password must be at most 128 characters"}),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: "Passwords do not match",
        path: ["confirmPassword"]
    })

    export const signInSchema = z.object({
        email: z.email({error: "Enter a valid email address"}),
        password: z.string().min(1, {error: "Password is required"})
    })

    export type SignUpInput = z.infer<typeof signUpSchema>
    export type SignInInput = z.infer<typeof signInSchema>