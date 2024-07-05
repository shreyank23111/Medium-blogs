import { Context } from "hono";
import { createUser, loginUser } from "../Services/auth.services";

export const Signup = async(c: Context) => {
  const data = await c.req.json();
  
  try{
    const result = await createUser(c, data)
    if("error" in result){
      return c.json({message: result.error}, 400)
    }
    return c.json({
      message: "Signup Success",
      user: result.user,
      token: result.token
    })
  } catch(err) {
    console.log(err);
    return c.json({error: "Unable to Signup"}, 422);
  }
}



export const Login = async (c: Context) => {
  const data = await c.req.json();
  console.log(data);

  try {
    const result = await loginUser(c, data);
    if ('error' in result) {
      return c.json({ message: result.error }, 400);
    }
    return c.json({
      message: "Login Success",
      user: result.user,
      token: result.token,
    }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Unable to Login" }, 422);
  }
};