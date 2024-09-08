"use server";
import { getUser } from "@/data/getUser";
import db from "@/lib/db";
import { UserWorkspaceInclude } from "@/types";

export const getWorkspace = async (workspaceId: string) => {
  const user = await getUser();

  if (!user) throw new Error("User not found");

  const workspaces = await db.workspace.findUnique({
    where: { id: workspaceId, userId: user.id },
    include: { boards: { orderBy: { createdAt: "asc" } } },
  });

  return workspaces;
};

export const getUserWithWorkspaces = async () => {
  const loggedInUser = await getUser();

  if (!loggedInUser) return null;

  const user = await db.user.findUnique({
    where: { id: loggedInUser.id },
    include: UserWorkspaceInclude,
  });

  if (!user) return null;

  return user;
};
