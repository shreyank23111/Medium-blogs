import { PrismaClient } from "@prisma/client";
import { createBlogInput, updateBlogInput } from "@shreyank23/medium-common";
import { Context } from "hono";
import { blogResponse, createBlogData, getBlogResponse, getBulkBlogResponse, updateBlogData } from "../Types/blog.types";

export const createBlog = async(c: Context, data: createBlogData): Promise<blogResponse | {error: string}> => {
  const prisma = c.get("prisma") as PrismaClient;
  const userId = c.get("token");
  const validate = createBlogInput.safeParse(data);

  if(!validate.success){
    return {error: "Invalid Inputs"}
  }

  const {title, content} = validate.data;

  const blog = await prisma.post.create({
    data: {
      title,
      content,
      authorId: userId
    }
  })

  return { blog }

}

export const updateBlog = async(c: Context, data: updateBlogData): Promise< blogResponse| {error: string}> => {
  const prisma = c.get("prisma") as PrismaClient;
  const userId = c.get("token");
  const validate = updateBlogInput.safeParse(data);

  if(!validate.success){
    return {error: 'Invalid Data'};
  }

  const {title, content, id} = validate.data;

  const blog = await prisma.post.update({
    where: {id: id},
    data: {
      title,
      content,
      authorId: userId
    }
  });

  return {blog};
}


export const getBlog = async(c: Context): Promise<getBlogResponse | {error: string}> => {
  const prisma = c.get("prisma") as PrismaClient;
  const id = c.req.param("id");

  const blog = await prisma.post.findFirst({
    where: {id: id},
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          firstName: true
        }
      }
    }
  })

  if(!blog){
    return {error: "Blog not found"};
  }

  return { blog };
  
}

export const getBulkBlog = async(c: Context): Promise<getBulkBlogResponse | {error: string}> => {
  const prisma = c.get("prisma") as PrismaClient;

  const blogs = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      id: true,
      createdAt: true,
      author: {
        select: {
          firstName: true
        }
      }
    }
  })

  if(!blogs){
    return {error: "Unable to find blogs"};
  }

  return {blogs}
}