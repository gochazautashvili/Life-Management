import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delete_task } from "../actions";
import { BoardTablesIncludeType } from "@/types";
import { notification } from "antd";

const useDeleteTask = (boardId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["board", boardId];
  const [api, notificationHolder] = notification.useNotification();

  const { mutate, isPending } = useMutation({
    mutationFn: delete_task,
    onSuccess: (deletedTask) => {
      queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<BoardTablesIncludeType>(queryKey, (oldData) => {
        if (!oldData) return;

        return {
          ...oldData,
          tables: oldData.tables.map((table) => ({
            ...table,
            tasks: table.tasks.filter((t) => t.id !== deletedTask.id),
          })),
        };
      });

      api.success({
        message: "Task Successfully deleted",
        showProgress: true,
        pauseOnHover: true,
      });
    },
    onError: () => {
      api.error({
        message: "Error while delete task",
        description: "Something went wrong! Please try agin.",
        showProgress: true,
        pauseOnHover: true,
      });
    },
  });

  return { mutate, isPending, notificationHolder };
};

export default useDeleteTask;
