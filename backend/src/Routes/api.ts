import { Hono } from "hono";
import { authRouters } from "./user";
import { blogRouter } from "./blog";
import { prismaAccleration } from "../Middlewares/prisma.accleration";
import { commentRouters } from "./comment";

const api = new Hono();

api.use("*", prismaAccleration)

api.route("/user", authRouters);
api.route("/blogs", blogRouter);
api.route("/comment", commentRouters);

export { api };