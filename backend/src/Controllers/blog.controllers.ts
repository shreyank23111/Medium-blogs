import { Context } from "hono";
import { createBlog, updateBlog, getBlog , getBulkBlog, deleteBlog} from "../Services/blog.services";

export const CreateBlog = async(c: Context) => {
  const data = await c.req.json();

  try{ 
    const result = await createBlog(c, data);
    if("error" in result){
      return c.json({message: result.error})
    }
    return c.json({
      message: "Created Blog",
      blog: result.blog
    }, 200)
  } catch(err){
    console.log(err);
    return c.json({error: "Unable to Create Blog"}, 422);
  }
}

export const UpdateBlog = async(c: Context) => {
  const data = await c.req.json();

  try{
    const result = await updateBlog(c, data);
    if("error" in result){
      return c.json({message: result.error})
    }
    return c.json({
      message: "Updated Blog",
      blog: result.blog
    }, 200)

  } catch(err){
    console.log(err);
    return c.json({error: "Unable to Update Blog"}, 422);
  }
}

export const GetBlog= async(c: Context) => {
  try{
    const result = await getBlog(c);
    if("error" in result){
      return c.json({message: result.error}, 400)
    }
    return c.json({
      message: result
    }, 200)
  } catch(err) {
    console.log(err);
    return c.json({error: "Unable to find Blog"}, 422);
  }
}

export const GetBulkBlog = async(c: Context) => {

  try{
    const result = await getBulkBlog(c);
    if("error" in result){
      return c.json({message: result.error});
    }
    return c.json(
       result
    , 200)
  } catch(err) {
    console.log(err);
    return c.json({error: "Unable to find Blogs"}, 422);
  }
} 

export const DeleteBlog = async(c: Context) => {
  const postId = c.req.param("id");

  try{
    const result = await deleteBlog(c, postId);
    return c.json(result, 200);
  }  catch(err) {
    console.log(err);
    return c.json({error: "Unable to find Blogs"}, 422);
  }
}