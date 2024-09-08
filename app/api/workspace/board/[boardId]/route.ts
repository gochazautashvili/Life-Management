import db from "@/lib/db";
import { BoardTablesInclude } from "@/types";

interface Props {
  params: { boardId: string };
}

export async function GET(req: Request, { params: { boardId } }: Props) {
  try {
    const board = await db.board.findUnique({
      where: { id: boardId },
      include: BoardTablesInclude,
    });

    if (!board) {
      return new Response("Board not found", { status: 404 });
    }

    return Response.json(board);
  } catch (error) {
    return new Response("internal server error", { status: 500 });
  }
}
