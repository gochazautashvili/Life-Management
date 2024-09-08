import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delete_activity } from "./action";
import { ActivityDataType } from "./Activity";

const useDeleteActivity = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["activity", workspaceId];

  return useMutation({
    mutationFn: delete_activity,
    onSuccess: (deletedActivity) => {
      queryClient.cancelQueries({ queryKey });

      queryClient.setQueriesData<ActivityDataType>({ queryKey }, (oldData) => {
        if (!oldData) return;

        return {
          activities: oldData.activities.filter(
            (activity) => activity.id !== deletedActivity.id
          ),
          pageSize: oldData.pageSize,
        };
      });
    },
  });
};

export default useDeleteActivity;
