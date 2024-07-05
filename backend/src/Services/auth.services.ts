import { signinInput, signupInput } from "@shreyank23/medium-common";
import { Context } from "hono";
import { AuthResponse, loginData, signupData } from "../Types/auth.types";
import { PrismaClient } from '@prisma/client/edge'
import { generateToken } from "../Utils/jwt";



export const createUser = async(c: Context, data: signupData): Promise<AuthResponse | {error: string}> => {
  const prisma = c.get("prisma") as PrismaClient;
  const validate = signupInput.safeParse(data);

  if(!validate.success){
    return {error: "Invalid Data"}
  } 


  const {firstName, lastName, email, password} = validate.data;

  const existing = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if(existing){
    return {error: "Email already used"}
  }

 const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password
    }
  })

  const token = await generateToken(user, c);

  return {user, token};
}

export const loginUser = async(c: Context, data: loginData): Promise<AuthResponse | {error: string}> => {
  const prisma = c.get("prisma") as PrismaClient;
  const validate = signinInput.safeParse(data);

  if(!validate.success){
    return {error: "Invalid Data"}
  }

  const { email, password} = validate.data;

  const user = await prisma.user.findFirst({
    where: {
      email,
      password
    }
  })

  if(!user){
    c.status(403)
    return ({
      error: "Incorrect Credentials"
    })
  }

  const token = await generateToken(user, c);

  return {user, token};
}