"use server";

import db from "@/lib/db";
import { EditBoardValuesType } from "@/types";
import { revalidatePath } from "next/cache";
import { backgrounds } from "../../../../lib/utils";
import dayjs from "dayjs";

export const create_board = async (
  title: string | undefined,
  workspaceId: string
) => {
  try {
    if (!title) return { error: "Title is required" };

    const board = await db.board.findMany({
      where: { workspaceId },
    });

    if (board.length >= 5) {
      return { error: "Board limit is 5, if you wont to create more buy VPN" };
    }

    const newBoard = await db.board.create({
      data: {
        title,
        workspaceId,
        background: backgrounds[Math.round(Math.random() * 5)].image,
      },
    });

    await db.activity.create({
      data: {
        title: "Create Board",
        description: `You Create Board - ${newBoard.title}. Time: ${dayjs(
          newBoard.createdAt
        ).format("MM/DD/YYYY")}`,
        workspaceId: workspaceId,
      },
    });

    revalidatePath(`/workspace/${workspaceId}`);
    return { success: true };
  } catch (error) {
    return { error: "Internal server error" };
  }
};

export const delete_board = async (boardId: string, workspaceId: string) => {
  try {
    const deletedBoard = await db.board.delete({
      where: { id: boardId },
    });

    await db.activity.create({
      data: {
        title: "Delete Board",
        description: `You Delete Board - ${deletedBoard.title}. Time: ${dayjs(
          deletedBoard.createdAt
        ).format("MM/DD/YYYY")}`,
        workspaceId: workspaceId,
      },
    });

    revalidatePath(`/workspace/${workspaceId}`);
    return { success: true };
  } catch (error) {
    return { error: "Internal server error" };
  }
};

export const edit_board = async (
  boardId: string,
  workspaceId: string,
  value: EditBoardValuesType
) => {
  try {
    const { createdAt, title } = await db.board.update({
      where: { id: boardId },
      data: { ...value },
    });

    await db.activity.create({
      data: {
        title: "Update Board",
        description: `You Update Board - ${title}. Time: ${dayjs(
          createdAt
        ).format("MM/DD/YYYY")}`,
        workspaceId: workspaceId,
      },
    });

    revalidatePath(`/workspace/${workspaceId}`);
    return { success: true };
  } catch (error) {
    return { error: "Internal server error" };
  }
};
