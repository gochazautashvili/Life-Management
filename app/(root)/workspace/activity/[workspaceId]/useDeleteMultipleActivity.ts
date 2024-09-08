import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delete_multiple_activity } from "./action";
import { ActivityDataType } from "./Activity";

const useDeleteMultipleActivity = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["activity", workspaceId];

  return useMutation({
    mutationFn: delete_multiple_activity,
    onSuccess: (deletedActivities) => {
      queryClient.cancelQueries({ queryKey });

      queryClient.setQueriesData<ActivityDataType>({ queryKey }, (oldData) => {
        if (!oldData) return;

        return {
          activities: oldData.activities.filter(
            (activity) =>
              !deletedActivities.some(
                (deletedActivity) => deletedActivity.id === activity.id
              )
          ),
          pageSize: oldData.pageSize,
        };
      });
    },
  });
};

export default useDeleteMultipleActivity;
