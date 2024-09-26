import { z } from "zod";

const userValidationSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3).max(40),
    phone: z.optional(z.string()),
    address: z.optional(z.string()),
})

export default userValidationSchema