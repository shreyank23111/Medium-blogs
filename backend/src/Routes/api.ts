import { Hono } from "hono";
import { authRouters } from "./user";
import { blogRouter } from "./blog";
import { prismaAccleration } from "../Middlewares/prisma.accleration";

const api = new Hono();

api.use("*", prismaAccleration)

api.route("/user", authRouters);
api.route("/blogs", blogRouter);

export { api };