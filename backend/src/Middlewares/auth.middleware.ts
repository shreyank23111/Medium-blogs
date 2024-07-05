import { Context, Next } from "hono";
import { verifyToken } from "../Utils/jwt";

export const authCheck = async(c: Context, next: Next) => {
  const authHeaders: string |undefined = c.req.header("authorization");

  if(!authHeaders || !authHeaders.startsWith("Bearer")) {
    c.status(401);
    return c.json({message: "Provide auth header"})
  }

  const token: string = authHeaders.split(" ")[1];

  try{
    const user = await verifyToken(token, c);
    if(user){
      c.set("token", user.id);
      await next();
    } else{
      c.status(403);
      return c.json({
        message: "Unauthorized, Please login.."
      })
    }
  } catch(err) {
    c.status(403);
    return c.json({
      message: "Unauthorized"
    })
  }
}