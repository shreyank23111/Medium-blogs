import z from "zod";
export declare const signupInput: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    email: string;
    password: string;
    lastName?: string | undefined;
}, {
    firstName: string;
    email: string;
    password: string;
    lastName?: string | undefined;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    content: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
}, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
}>;
export declare const createCommentInput: z.ZodObject<{
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
}, {
    content: string;
}>;
export declare const updateCommentInput: z.ZodObject<{
    content: z.ZodEffects<z.ZodString, string, string>;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
    id: string;
}, {
    content: string;
    id: string;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
export type CreateCommentInput = z.infer<typeof createCommentInput>;
export type UpdateCommentInput = z.infer<typeof updateCommentInput>;
