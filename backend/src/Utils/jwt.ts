import { User } from "@prisma/client";
import { Context } from "hono";
import { sign, verify } from "hono/jwt";

export const generateToken = async(user: User, c: Context): Promise<string>  => {
  return await sign({
    id: user.id
  }, c.env.JWT_SECRET);
}

export const verifyToken = async(token: string, c: Context): Promise<any> => {
  return await verify(token, c.env.JWT_SECRET)
}