import { supabase } from "../lib/supabase";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Tables } from "../lib/db.types";

interface WorkoutInterval {
  workoutInterval: Tables<"workout_intervals">;
}

export const useCreateWorkoutInterval = () => {
  return useMutation({
    mutationFn: async (interval) => {
      const { data, error } = await supabase
        .from("workout_intervals")
        .insert(interval)
        .select();

      if (error) {
        console.log("Error creating workout interval", error);
        return null;
      }
      return data;
    },
  });
};

export const useGetWorkoutIntervals = () => {
  return useQuery({
    queryKey: ["workoutIntervals"],
    queryFn: async () => {
      const { data, error } = await supabase.from("workout_intervals").select();

      if (error) {
        console.log("Error getting static intervals", error);
        return null;
      }
      return data;
    },
  });
};
