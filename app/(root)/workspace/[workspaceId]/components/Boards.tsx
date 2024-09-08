import { notFound } from "next/navigation";
import Link from "next/link";
import MoreButton from "./MoreButton";
import BorderMoreButton from "./BorderMoreButton";
import Image from "next/image";
import { getWorkspace } from "../../actions";

interface Props {
  workspaceId: string;
}

const Boards = async ({ workspaceId }: Props) => {
  const workspaces = await getWorkspace(workspaceId);

  if (!workspaces) return notFound();

  return (
    <div>
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-base font-semibold">
          <span className="font-bold">Workspace:</span> {workspaces.title}
        </h1>
        <MoreButton workspaceId={workspaceId} title={workspaces.title} />
      </div>

      <h1 className="text-xl font-bold mt-4 mb-6">My Boards: </h1>
      <div className="flex flex-wrap justify-center gap-5">
        {workspaces.boards.map((board) => {
          return (
            <div
              key={board.id}
              className="relative group h-[180px] p-4 hover:shadow-md flex-1 basis-[300px] max-w-[400px]"
            >
              <BorderMoreButton board={board} />
              <Link
                href={`/workspace/board/${board.id}`}
                className="hover:text-black text-base font-semibold text-white h-full rounded-lg flex items-center justify-center "
              >
                <Image
                  src={board.background}
                  alt={board.title}
                  className="inset-0 w-full h-full bg-gray-400 rounded"
                  fill
                />
                <span className="relative z-10 break-words text-center">
                  {board.title}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Boards;
