import { Task } from "@prisma/client";
import dayjs from "dayjs";
import { Draggable } from "@hello-pangea/dnd";
import TaskMoreButton from "./TaskMoreButton";

interface Props {
  task: Task;
  index: number;
  boardId: string;
  workspaceId: string;
}

const Tasks = ({ task, index, boardId, workspaceId }: Props) => {
  return (
    <Draggable index={index} draggableId={task.id}>
      {(provider, active) => (
        <li
          {...provider.draggableProps}
          {...provider.dragHandleProps}
          ref={provider.innerRef}
          className={`${
            active.isDragging ? "outline-2" : "outline-0"
          } outline-dashed bg-white/30 outline-cyan-500 w-full rounded px-4 py-2 group select-none backdrop-blur-sm relative`}
        >
          <TaskMoreButton
            workspaceId={workspaceId}
            boardId={boardId}
            taskId={task.id}
          />
          <h1 className="text-base font-bold">{task.title}</h1>
          <p className="mt-1 break-words text-sm">{task.description}</p>
          {task.deadline && (
            <p className="mt-2 font-semibold text-sm">
              Deadline:
              <span className="text-xs">
                {dayjs(task.deadline).format("MM/DD/YYYY")}
              </span>
            </p>
          )}
        </li>
      )}
    </Draggable>
  );
};

export default Tasks;
