import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create_task } from "../actions";
import { notification } from "antd";
import { BoardTablesIncludeType } from "@/types";

const useCreateTask = (boardId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["board", boardId];
  const [api, notificationHolder] = notification.useNotification();

  const { mutate, isPending } = useMutation({
    mutationFn: create_task,
    onSuccess: (newTask) => {
      queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<BoardTablesIncludeType>(queryKey, (oldData) => {
        if (!oldData) return;

        return {
          ...oldData,
          tables: oldData.tables.map((table) => {
            if (table.id === newTask.tableId) {
              return { ...table, tasks: [newTask, ...table.tasks] };
            }

            return table;
          }),
        };
      });

      api.success({
        message: "Task Successfully created",
        showProgress: true,
        pauseOnHover: true,
      });
    },
    onError: () => {
      api.error({
        message: "Error while creating task",
        description: "Something went wrong! Please try agin.",
        showProgress: true,
        pauseOnHover: true,
      });
    },
  });

  return { mutate, isPending, notificationHolder };
};

export default useCreateTask;
