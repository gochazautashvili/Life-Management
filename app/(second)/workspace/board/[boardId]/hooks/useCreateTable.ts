import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create_table } from "../actions";
import { BoardTablesIncludeType } from "@/types";
import { notification } from "antd";

const useCreateTable = (boardId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["board", boardId];
  const [api, notificationHolder] = notification.useNotification();

  const { mutate, isPending } = useMutation({
    mutationFn: create_table,
    onSuccess: (newTable) => {
      queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<BoardTablesIncludeType>(queryKey, (oldData) => {
        if (!oldData) return;

        return {
          ...oldData,
          tables: [...oldData.tables, newTable],
        };
      });

      api.success({
        message: "Table Successfully created",
        showProgress: true,
        pauseOnHover: true,
      });
    },
    onError: () => {
      api.error({
        message: "Error while creating table",
        description: "Something went wrong! Please try agin.",
        showProgress: true,
        pauseOnHover: true,
      });
    },
  });

  return { mutate, isPending, notificationHolder };
};

export default useCreateTable;
