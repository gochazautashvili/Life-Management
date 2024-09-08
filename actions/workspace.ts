"use server";

import { getUser } from "@/data/getUser";
import db from "@/lib/db";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

export const create_workspace = async (title: string | undefined) => {
  try {
    if (!title) return { error: "Title is required" };

    const user = await getUser();

    if (!user) throw new Error("User not found");

    const workspace = await db.workspace.findMany({
      where: { userId: user.id },
    });

    if (workspace.length >= 3) {
      return {
        error:
          "you already have 5 workspace, if you wont to create more buy VIP",
      };
    }

    const newWorkspace = await db.workspace.create({
      data: { userId: user.id, title },
    });

    await db.activity.create({
      data: {
        title: "Create Workspace",
        description: `You Create Workspace - ${
          newWorkspace.title
        }. Time: ${dayjs(newWorkspace.createdAt).format("MM/DD/YYYY")}`,
        workspaceId: newWorkspace.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Internal server error" };
  }
};

export const delete_workspace = async (workspaceId: string) => {
  try {
    if (!workspaceId) return { error: "WorkspaceId not found" };

    const user = await getUser();

    if (!user) throw new Error("User not found");

    const deletedWork = await db.workspace.delete({
      where: { id: workspaceId, userId: user.id },
    });

    await db.activity.create({
      data: {
        title: "Delete Workspace",
        description: `You Delete Workspace - ${
          deletedWork.title
        }. Time: ${dayjs(deletedWork.createdAt).format("MM/DD/YYYY")}`,
        workspaceId: "DeletedWorkspace",
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Internal server error!" };
  }
};

export const update_workspace = async (title: string, workspaceId: string) => {
  try {
    if (!workspaceId) return { error: "WorkspaceId not found" };

    const user = await getUser();

    if (!user) throw new Error("User not found");

    const updatedWork = await db.workspace.update({
      where: { id: workspaceId, userId: user.id },
      data: { title },
    });

    await db.activity.create({
      data: {
        title: "Update Workspace",
        description: `You Update Workspace - ${
          updatedWork.title
        }. Time: ${dayjs(updatedWork.createdAt).format("MM/DD/YYYY")}`,
        workspaceId: updatedWork.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Internal server error!" };
  }
};
