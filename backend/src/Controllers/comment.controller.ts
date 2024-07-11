import { Context } from "hono";
import { allComments, deleteComment, makeComment, updateComment } from "../Services/comment.services";


export const Comment = async(c: Context) => {
  const data = await c.req.json();
  const userId = c.get("token");

  

  if (!userId) {
    return c.json({ message: "Unauthorized" }, 401);
  }


  try{
    const result = await makeComment(c, data ,userId);
    if("error" in result){
      return c.json({message: result.error})
    }

    return c.json({
      message: "Posted Comment",
      comment: result.comment
    }, 200)

  } catch(err) {
    console.log(err);
    return c.json({error: "Unable to Comment"}, 422);
  }
}

export const UpdateComment = async(c: Context) => {
  const data = await c.req.json();

  try{
    const result = await updateComment(c, data);
    if("error" in result){
      return c.json({message: result.error});
    }

    return c.json({
      message: "Updated Comment",
      comment: result.comment
    }, 200)
  } catch(err) {
    console.log(err);
    return c.json({error: "Unable to update Comment"}, 422);
  }
}

export const GetAllComment = async(c: Context) => {
  const postId = c.req.query("postId");

  if (!postId) {
    return c.json({ error: "postId is required" }, 400);
  }

  try{
    const result = await allComments(c, {postId});
    if("error" in result){
      return c.json({message: result.error});
    }

    return c.json({
      comment: result.comments
    }, 200)
  } catch(err) {
    console.log(err);
    return c.json({error: "Unable to get Comment"}, 422);
  }
}

export const DeleteComment = async(c: Context) => {
  const commentId = c.req.param("id");

  if (!commentId) {
    return c.json({ error: "commentId is required" }, 400);
  }

  try{
    const result = await deleteComment(c, commentId);
    return c.json(result, 200);
  }  catch(err) {
    console.log(err);
    return c.json({error: "Unable to delete comment"}, 422);
  }

}