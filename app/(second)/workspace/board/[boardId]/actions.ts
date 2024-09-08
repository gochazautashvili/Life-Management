"use server";
import db from "@/lib/db";
import { Table, Task } from "@prisma/client";
import dayjs from "dayjs";

export const create_table = async ({
  boardId,
  title,
  workspaceId,
}: CreateTableType) => {
  try {
    const table = await db.table.create({
      data: { title, boardId },
      include: { tasks: true },
    });

    await db.activity.create({
      data: {
        title: "Create Table",
        description: `You Create Table - ${table.title}. Time: ${dayjs(
          table.createdAt
        ).format("MM/DD/YYYY")}`,
        workspaceId,
      },
    });

    return table;
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const create_task = async ({
  tableId,
  values,
  workspaceId,
}: CreateTaskType) => {
  try {
    const task = await db.task.create({
      data: { ...values, tableId },
    });

    await db.activity.create({
      data: {
        title: "Create Task",
        description: `You Create Task - ${task.title}. Time: ${dayjs(
          task.createdAt
        ).format("MM/DD/YYYY")}`,
        workspaceId,
      },
    });

    return task;
  } catch (error) {
    console.log(error);

    throw new Error("Internal server error");
  }
};

export const delete_table = async ({
  tableId,
  workspaceId,
}: {
  tableId: string;
  workspaceId: string;
}) => {
  try {
    const board = await db.table.delete({
      where: { id: tableId },
    });

    await db.activity.create({
      data: {
        title: "Delete Table",
        description: `You Delete Table - ${board.title}. Time: ${dayjs(
          board.createdAt
        ).format("MM/DD/YYYY")}`,
        workspaceId: workspaceId,
      },
    });

    return board;
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const delete_task = async ({
  taskId,
  workspaceId,
}: {
  taskId: string;
  workspaceId: string;
}) => {
  try {
    const board = await db.task.delete({
      where: { id: taskId },
    });

    await db.activity.create({
      data: {
        title: "Delete Task",
        description: `You Delete Task - ${board.title}. Time: ${dayjs(
          board.createdAt
        ).format("MM/DD/YYYY")}`,
        workspaceId: workspaceId,
      },
    });

    return board;
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const drag_end_table = async (items: DragEndTableType[]) => {
  try {
    const transaction = items.map((list) =>
      db.table.update({
        where: { id: list.id },
        data: { order: list.order },
      })
    );

    await db.$transaction(transaction);

    return { items };
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const drag_end_task = async (value: DragEndTaskType) => {
  try {
    const transaction = value.items.map((list) =>
      db.task.update({
        where: { id: list.id },
        data: { order: list.order, tableId: list.tableId },
      })
    );

    await db.$transaction(transaction);

    return { items: value.items };
  } catch (error) {
    console.log(error);

    throw new Error("Internal server error");
  }
};

// types
type DragEndTableType = {
  order: number;
  tasks: Task[];
  id: string;
  title: string;
  boardId: string;
  createdAt: Date;
};

type DragEndTaskType = {
  items: Task[];
  data: TableWithTask[];
};

type TableWithTask = Table & { tasks: Task[] };

type TaskType = {
  title: string;
  description: string;
};

type CreateTaskType = {
  workspaceId: string;
  tableId: string;
  values: TaskType;
};

type CreateTableType = {
  workspaceId: string;
  boardId: string;
  title: string;
};
