import { Context } from "hono";
import { commentResponse, createCommentData, updateCommentData } from "../Types/comment.types";
import { PrismaClient } from "@prisma/client";
import { createCommentInput, updateCommentInput } from "@shreyank23/medium-common";

export const makeComment = async(c: Context, data: createCommentData): Promise<commentResponse | {error: string}> => {
  const prisma = c.get("prisma") as PrismaClient;
  const userId = c.get("token");

  // const postId = c.get("postId"); id is coming as undefined
  // const postId = c.req.param("id"); id is coming as undefined

  const validate = createCommentInput.safeParse(data);

  if(!validate.success) {
    return {error: "invalid inputs"}
  }

  const comment = await prisma.comment.create({
    data: {
      content: data.content,
      userId: userId,
      postId: data.postId,
      likes: 0
    }
  })

  return {comment};
} 

export const updateComment = async(c: Context, data: updateCommentData): Promise< commentResponse | {error: string}> => {
  const prisma = c.get("prisma") as PrismaClient;
  const userId = c.get("token");
  const validate = updateCommentInput.safeParse(data)

  if(!validate.success){
    return {error: 'Invalid Data'};
  }

  const comment = await prisma.comment.update({
    where: {id: validate.data.id},
    data: {
      content: data.content,
      userId: userId
    }
  });

  return {comment}
}