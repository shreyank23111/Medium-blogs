import { Hono } from "hono"
import { CreateBlog, DeleteBlog, GetBlog, GetBulkBlog, UpdateBlog } from "../Controllers/blog.controllers";
import { authCheck } from "../Middlewares/auth.middleware";

const blogRouter = new Hono();

blogRouter.use("*", authCheck);

blogRouter.post("/create-blog", CreateBlog);
blogRouter.put("/update-blog", UpdateBlog);
blogRouter.get("/get-blog/:id", GetBlog);
blogRouter.get("/bulk-posts", GetBulkBlog);
blogRouter.delete("/delete-post/:id", DeleteBlog)

export { blogRouter };