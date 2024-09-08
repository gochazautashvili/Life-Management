"use server";

import { getUser } from "@/data/getUser";
import db from "@/lib/db";

export const getTasksCount = async () => {
  const user = await getUser();

  if (!user) return [];

  const data = await db.$transaction([
    db.task.count({
      where: { table: { board: { workspace: { userId: user.id } } } },
    }),

    db.table.count({
      where: { board: { workspace: { userId: user.id } } },
    }),

    db.workspace.count({ where: { userId: user.id } }),

    db.board.count({
      where: { workspace: { userId: user.id } },
    }),

    db.activity.count({
      where: { workspace: { userId: user.id } },
    }),
  ]);

  const names = ["Tasks", "Tables", "Workspaces", "Boards", "Activities"];

  const values = data.map((item, i) => {
    return { count: item, name: names[i] };
  });

  return values;
};
