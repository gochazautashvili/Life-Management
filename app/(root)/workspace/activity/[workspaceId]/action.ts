"use server";
import db from "@/lib/db";

export const delete_multiple_activity = async (activityIds: string[]) => {
  try {
    const transaction = activityIds.map((activityId) =>
      db.activity.delete({
        where: { id: activityId },
      })
    );

    const deletedActivities = await db.$transaction(transaction);

    return deletedActivities;
  } catch (error) {
    throw new Error("Error: Internal server error");
  }
};

export const delete_activity = async (activityId: string) => {
  try {
    const deletedActivity = await db.activity.delete({
      where: { id: activityId },
    });

    return deletedActivity;
  } catch (error) {
    throw new Error("Error: Internal server error");
  }
};
