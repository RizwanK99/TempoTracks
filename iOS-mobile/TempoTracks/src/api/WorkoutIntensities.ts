import { supabase } from "../lib/supabase";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Tables } from "../lib/db.types";

export interface WorkoutIntensity {
  workoutIntensity: Tables<"workout_intensities">;
}

export const useGetWorkoutIntensities = () => {
  return useQuery({
    queryKey: ["workout_intensities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workout_intensities")
        .select();

      if (error) {
        console.log("Error fetching workout templates", error);
        return null;
      }
      return data;
    },
  });
};
