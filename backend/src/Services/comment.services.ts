import { Context } from "hono";
import { commentResponse, createCommentData, getAllComments, updateCommentData } from "../Types/comment.types";
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

  const {content,  id} = validate.data;

  const comment = await prisma.comment.update({
    where: {id: data.id},
    data: {
      content: data.content,
      userId: userId,
      // postId: data.postId
    }
  });

  return {comment}
}

// interface Contexts {
//   get: (key: string) => any;
//   query: { postId?: string };
// }

export const allComments = async(c: Context, data: {postId: string}): Promise<getAllComments | {error: string}> => {
  const prisma = c.get("prisma") as PrismaClient;
  const {postId} = data;

  if (!postId) {
    return { error: "postId is required" };
  }

  const comments = await prisma.comment.findMany({
    where: {postId: postId},
    select: {
      id: true,
      content: true,
      postId: true,
      userId: true,
      createdAt: true,
      author: {
        select: {
          firstName: true
        }
      }
    }
  })
  
  if (comments.length === 0) {
    return { error: "No comments found for the specified postId" };
  }

  return {comments}
}