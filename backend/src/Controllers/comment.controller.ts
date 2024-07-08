import { Context } from "hono";
import { makeComment } from "../Services/comment.services";


export const Comment = async(c: Context) => {
  const data = await c.req.json();

  try{
    const result = await makeComment(c, data);
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