"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserJwtPayload } from "@/types";
import db from "@/lib/db";
import { cache } from "react";

export const getUser = cache(async () => {
  try {
    const token = cookies().get("user_token")?.value;

    if (!token) return null;

    const userPayload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as UserJwtPayload;

    const user = await db.user.findUnique({
      where: { id: userPayload.id },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    return null;
  }
});
