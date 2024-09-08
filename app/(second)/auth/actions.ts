"use server";
import db from "@/lib/db";
import { SignInValuesType, SignUpValuesType } from "./type";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { isRedirectError } from "next/dist/client/components/redirect";
import bcrypt from "bcrypt";
import { UserJwtPayload } from "@/types";

export const sign_in = async (data: SignInValuesType) => {
  try {
    if (!data) return { error: "Data not found" };

    const { email, password, remember } = data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) return { error: "User not found" };

    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!comparePassword) return { error: "User not found" };

    const options = remember ? {} : { expiresIn: "24h" };

    const payload: UserJwtPayload = {
      id: existingUser.id,
      email: existingUser.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, options);

    cookies().set("user_token", token, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: remember ? undefined : 60 * 60 * 24,
    });

    return { success: true };
  } catch (error) {
    if (isRedirectError(error)) return;

    return { error: "Internal server error" };
  }
};

export const sign_up = async (data: SignUpValuesType) => {
  try {
    if (!data) return { error: "Data not found" };

    const existingUser = await db.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) return { error: "User already exist!" };

    const { email, password, username, remember } = data;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: { email, password: hashPassword, username },
    });

    const payload: UserJwtPayload = {
      id: user.id,
      email: user.email,
    };

    const options = remember ? {} : { expiresIn: "24h" };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, options);

    cookies().set("user_token", token, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: remember ? undefined : 60 * 60 * 24,
    });

    return { success: true };
  } catch (error) {
    if (isRedirectError(error)) return;
    return { error: "Internal server error" };
  }
};

export const sign_in_with_demo_user = async () => {
  try {
    const { email, password, remember } = {
      email: "DemoUser@gmail.com",
      password: "demouser",
      remember: false,
    };

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) return { error: "User not found" };

    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!comparePassword) return { error: "User not found" };

    const options = remember ? {} : { expiresIn: "24h" };

    const payload: UserJwtPayload = {
      id: existingUser.id,
      email: existingUser.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, options);

    cookies().set("user_token", token, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: remember ? undefined : 60 * 60 * 24,
    });

    return { success: true };
  } catch (error) {
    if (isRedirectError(error)) return;

    return { error: "Internal server error" };
  }
};

export const sign_out = async () => {
  cookies().delete("user_token");

  return { success: true };
};
