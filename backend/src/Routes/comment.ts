import { Hono } from "hono";
import { Comment, DeleteComment, GetAllComment, UpdateComment } from "../Controllers/comment.controller";
import { authCheck } from "../Middlewares/auth.middleware";


const commentRouters = new Hono();


commentRouters.use("*", authCheck);
commentRouters.get("/get-comments", GetAllComment)
commentRouters.post("/write-comment", Comment);
commentRouters.put("/update-comment", UpdateComment)
commentRouters.delete("/delete-comment/:id", DeleteComment)


export { commentRouters }