import { Prisma } from "@prisma/client";

export type UserJwtPayload = {
  id: string;
  email: string;
};

export type WorkspaceType = {
  id: string;
  title: string;
};

export type EditBoardValuesType = {
  title: string;
  background: string;
};

export const BoardTablesInclude = {
  tables: {
    orderBy: { order: "asc" },
    include: { tasks: { orderBy: { order: "asc" } } },
  },
} satisfies Prisma.BoardInclude;

export type BoardTablesIncludeType = Prisma.BoardGetPayload<{
  include: typeof BoardTablesInclude;
}>;

export const UserWorkspaceInclude = {
  workspaces: true,
} satisfies Prisma.UserInclude;

export type UserWorkspaceIncludeType = Prisma.UserGetPayload<{
  include: typeof UserWorkspaceInclude;
}>;
