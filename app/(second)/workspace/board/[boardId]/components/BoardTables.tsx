"use client";
import { ArrowLeftOutlined, Loading3QuartersOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import Tables from "./Tables";
import CreateTable from "./CreateTable";
import { BoardTablesIncludeType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import useDropTable from "../hooks/useDropTable";
import useDropTask from "../hooks/useDropTask";
import axios from "axios";

interface Props {
  boardId: string;
}

const BoardTables = ({ boardId }: Props) => {
  const { data: board, isLoading } = useQuery({
    queryKey: ["board", boardId],
    queryFn: () =>
      axios
        .get<BoardTablesIncludeType>(`/api/workspace/board/${boardId}`)
        .then((res) => res.data),
  });

  const { mutate: dropTable } = useDropTable(boardId);
  const { mutate: dropTask } = useDropTask(boardId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full mt-24">
        <Loading3QuartersOutlined style={{ fontSize: 25 }} spin />
      </div>
    );
  }

  if (!board) {
    return <h1 className="text-center my-10">Tables not found</h1>;
  }

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [remove] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, remove);

    return result;
  }

  const handelOnDragEnd = (event: DropResult) => {
    const { destination, source, type } = event;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "table") {
      const items = reorder(board?.tables, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      dropTable(items);
    }

    if (type === "task") {
      let newOrderedData = [...board.tables];

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );

      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) return;

      if (!sourceList.tasks) {
        sourceList.tasks = [];
      }

      if (!destList.tasks) {
        destList.tasks = [];
      }

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.tasks,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.tasks = reorderedCards;

        dropTask({ items: reorderedCards, data: newOrderedData });
      } else {
        const [movedCard] = sourceList.tasks.splice(source.index, 1);

        movedCard.tableId = destination.droppableId;

        destList.tasks.splice(destination.index, 0, movedCard);

        sourceList.tasks.forEach((card, index) => {
          card.order = index;
        });

        destList.tasks.forEach((card, index) => {
          card.order = index;
        });

        dropTask({ items: destList.tasks, data: newOrderedData });
      }
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <header className="w-full h-16 bg-white/70 flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <Link
            className="text-blue-900 hover:text-blue-500 transition-colors"
            href={`/workspace/${board.workspaceId}`}
          >
            <ArrowLeftOutlined /> Back
          </Link>
          <h1>{board.title}</h1>
        </div>
      </header>
      <Image
        className="-z-10 object-cover"
        src={board.background}
        alt={board.title}
        fill
      />
      <DragDropContext onDragEnd={handelOnDragEnd}>
        <Droppable droppableId="tables" type="table" direction="horizontal">
          {(provider) => (
            <ol
              {...provider.droppableProps}
              ref={provider.innerRef}
              className="flex items-start gap-5 p-10 overflow-x-auto w-full h-[calc(100%-4rem)]"
            >
              {board.tables.map((table, i) => (
                <Tables
                  key={table.id}
                  table={table}
                  index={i}
                  workspaceId={board.workspaceId}
                />
              ))}
              {provider.placeholder}
              <CreateTable boardId={board.id} workspaceId={board.workspaceId} />
            </ol>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default BoardTables;
