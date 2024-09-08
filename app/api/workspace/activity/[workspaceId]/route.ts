import db from "@/lib/db";
import { NextRequest } from "next/server";

interface Props {
  params: { workspaceId: string };
}

export async function GET(req: NextRequest, { params }: Props) {
  const page = Number(req.nextUrl.searchParams.get("page")) - 1;

  if (page < 0) {
    return new Response("Error: Page is invalid", { status: 500 });
  }

  try {
    const activities = await db.activity.findMany({
      where: { workspaceId: params.workspaceId },
      orderBy: { createdAt: "desc" },
      skip: 6 * page,
      take: 6,
    });

    const activitiesCount = await db.activity.count({
      where: { workspaceId: params.workspaceId },
    });

    return Response.json({ activities, pageSize: activitiesCount });
  } catch (error) {
    return new Response("Error: Internal server error", { status: 500 });
  }
}
