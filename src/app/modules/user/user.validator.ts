import z from "zod";

const fullNameValidationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
});

const addressValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
});

const orderValidationSchema = z.object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
});

const userValidationSchema = z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    fullName: fullNameValidationSchema,
    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean().default(true),
    hobbies: z.string().array(),
    address: addressValidationSchema,
    orders: orderValidationSchema.array().optional(),
    isDeleted: z.boolean().default(false),
});

export default userValidationSchema;
