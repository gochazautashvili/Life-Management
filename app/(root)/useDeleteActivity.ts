import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delete_activity } from "@/actions/activities";
import { ActivityDataType } from "./components/ActivityTable";

const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  const queryKey = ["activities"];

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
