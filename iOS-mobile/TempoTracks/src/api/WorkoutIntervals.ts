import { supabase } from "../lib/supabase";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Tables } from "../lib/db.types";

interface WorkoutInterval {
  workoutInterval: Tables<"workout_intervals">;
}

export const useCreateWorkoutInterval = (onSuccess) => {
  return useMutation({
    mutationFn: async (interval) => {
      const { data, error } = await supabase
        .from("workout_intervals")
        .insert(interval);

      if (error) {
        console.log("Error creating workout interval", error);
        return null;
      }
      return data;
    },
    onSuccess: async () => {
      onSuccess();
    },
  });
};
