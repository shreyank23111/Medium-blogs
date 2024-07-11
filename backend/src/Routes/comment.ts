import { Hono } from "hono";
import { Comment, GetAllComment, UpdateComment } from "../Controllers/comment.controller";
import { authCheck } from "../Middlewares/auth.middleware";


const commentRouters = new Hono();

commentRouters.get("/get-comments", GetAllComment)
commentRouters.use("*", authCheck);

commentRouters.post("/write-comment", Comment);
commentRouters.put("/update-comment", UpdateComment)


export { commentRouters }