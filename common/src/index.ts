import z from "zod";

export const signupInput = z.object({
  firstName: z.string().nonempty({message: "First Name is required"}),
  lastName: z.string().optional(),
  email: z.string().email({message: "Provide a valid email"}).nonempty({message: "Email is required"}),
  password: z.string({message: "Password is required"}).min(6, {message: "Password must be at least 6 characters long"})
})

export const signinInput = z.object({
  email: z.string({message: "Email is required"}).email({message: "Provide a valid email address"}),
  password: z.string({message: "Password is requires"}).min(6)
})

export const createBlogInput = z.object({
  title: z.string().nonempty({message: 'Title is required'}),
  content: z.string().nonempty({message: "Content is required"})
})

export const updateBlogInput = z.object({
  title: z.string().optional().refine(val => val !== "", {
    message: "Title can't be  empty"
  }),
  content: z.string().optional().refine(val => val !== "",{
    message: "Content can't be empty"
  } ),
  id: z.string().min(1, {message: "Id cannot be empty"})
})

export const createCommentInput = z.object({
  content: z.string().nonempty({message: "Comment is required"})
})

export const updateCommentInput = z.object({
  content: z.string().refine(val => val !== "", {
    message: "Comment can't be empty"
  }),
  id: z.string().min(1, {message: "Id cannot be empty"})
})


export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
export type CreateCommentInput = z.infer<typeof createCommentInput>;
export type UpdateCommentInput = z.infer<typeof updateCommentInput>;