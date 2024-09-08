import { getUser } from "@/data/getUser";
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
    const user = await getUser();

    if (!user) {
      return new Response("Error: User not found", { status: 500 });
    }

    const activities = await db.activity.findMany({
      where: { workspace: { userId: user.id } },
    });

    const activitiesCount = await db.activity.count({
      where: { workspace: { userId: user.id } },
    });

    return Response.json({ activities, pageSize: activitiesCount });
  } catch (error) {
    return new Response("Error: Internal server error", { status: 500 });
  }
}
