import { delete_multiple_activity } from "@/actions/activities";
import { ActivityDataType } from "@/app/(root)/components/ActivityTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteMultipleActivity = () => {
  const queryClient = useQueryClient();
  const queryKey = ["activities"];

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
