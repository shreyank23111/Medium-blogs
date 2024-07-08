import { Hono } from "hono";
import { Comment, GetAllComment, UpdateComment } from "../Controllers/comment.controller";
import { authCheck } from "../Middlewares/auth.middleware";


const commentRouters = new Hono();

commentRouters.use("*", authCheck);

commentRouters.post("/write-comment", Comment);
commentRouters.put("/update-comment", UpdateComment)
commentRouters.get("/get-comments", GetAllComment)

export { commentRouters }