import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delete_table } from "../actions";
import { BoardTablesIncludeType } from "@/types";
import { notification } from "antd";

const useDeleteTable = (boardId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["board", boardId];
  const [api, notificationHolder] = notification.useNotification();

  const { mutate, isPending } = useMutation({
    mutationFn: delete_table,
    onSuccess: (deletedTable) => {
      queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<BoardTablesIncludeType>(queryKey, (oldData) => {
        if (!oldData) return;

        return {
          ...oldData,
          tables: oldData.tables.filter((t) => t.id !== deletedTable.id),
        };
      });

      api.success({
        message: "Table Successfully deleted",
        showProgress: true,
        pauseOnHover: true,
      });
    },
    onError: () => {
      api.error({
        message: "Error while delete table",
        description: "Something went wrong! Please try agin.",
        showProgress: true,
        pauseOnHover: true,
      });
    },
  });

  return { mutate, isPending, notificationHolder };
};

export default useDeleteTable;
