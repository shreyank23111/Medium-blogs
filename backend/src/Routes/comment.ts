import { Hono } from "hono";
import { Comment } from "../Controllers/comment.controller";
import { authCheck } from "../Middlewares/auth.middleware";

const commentRouters = new Hono();

commentRouters.use("*", authCheck);

commentRouters.post("/write-comment", Comment);

export { commentRouters }