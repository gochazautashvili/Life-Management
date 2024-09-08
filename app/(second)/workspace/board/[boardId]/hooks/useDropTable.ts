import { useMutation, useQueryClient } from "@tanstack/react-query";
import { drag_end_table } from "../actions";
import { BoardTablesIncludeType } from "@/types";

const useDropTable = (boardId: string) => {
  const queryClient = useQueryClient();

  const queryKey = ["board", boardId];

  return useMutation({
    mutationFn: drag_end_table,
    onMutate: (items) => {
      queryClient.cancelQueries({ queryKey });

      const prevData =
        queryClient.getQueryData<BoardTablesIncludeType>(queryKey);

      queryClient.setQueryData<BoardTablesIncludeType>(
        ["board", boardId],
        (oldData) => {
          if (!oldData) return;

          return {
            ...oldData,
            tables: items,
          };
        }
      );

      return { prevData };
    },
    onError(error, variables, context) {
      queryClient.setQueryData<BoardTablesIncludeType>(
        ["board", boardId],
        context?.prevData
      );
    },
  });
};

export default useDropTable;
