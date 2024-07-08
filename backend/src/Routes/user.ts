import { Hono } from "hono";
import { Login, Signup } from "../Controllers/auth.controller";

const authRouters = new Hono();

authRouters.post("/signup",Signup);
authRouters.post("/login", Login)

export { authRouters };