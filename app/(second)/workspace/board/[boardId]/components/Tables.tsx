"use client";
import { Table, Task } from "@prisma/client";
import Tasks from "./Tasks";
import CreateTask from "./CreateTask";
import TableMoreButton from "./TableMoreButton";
import { Draggable, Droppable } from "@hello-pangea/dnd";

interface Props {
  index: number;
  workspaceId: string;
  table: Table & { tasks: Task[] };
}

const Tables = ({ table, index, workspaceId }: Props) => {
  return (
    <Draggable index={index} draggableId={table.id}>
      {(provider) => (
        <li
          {...provider.draggableProps}
          {...provider.dragHandleProps}
          ref={provider.innerRef}
          className="w-[300px] bg-white/30 rounded-md shrink-0 select-none"
        >
          <h1 className="text-base px-4 font-semibold w-full h-10 border-b border-black flex items-center justify-between sticky top-0 z-50 backdrop-blur-lg">
            {table.title}
            <TableMoreButton
              workspaceId={workspaceId}
              boardId={table.boardId}
              tableId={table.id}
            />
          </h1>
          <Droppable droppableId={table.id} type="task">
            {(provider) => (
              <ol
                ref={provider.innerRef}
                {...provider.droppableProps}
                className="flex flex-col gap-5 mt-4 py-2 px-4"
              >
                {table.tasks?.map((task, i) => (
                  <Tasks
                    workspaceId={workspaceId}
                    boardId={table.boardId}
                    key={task.id}
                    task={task}
                    index={i}
                  />
                ))}

                {provider.placeholder}

                {!table.tasks?.length && (
                  <CreateTask
                    boardId={table.boardId}
                    tableId={table.id}
                    workspaceId={workspaceId}
                  />
                )}
              </ol>
            )}
          </Droppable>
        </li>
      )}
    </Draggable>
  );
};

export default Tables;
