import { supabase } from "../lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables } from "../lib/db.types";

interface Workout {
  workout: Tables<"workouts">;
}

export const useCreateWorkout = (workout: Workout) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (workout: Workout) => {
      const { data, error } = await supabase
        .from("workouts")
        .insert(workout)
        .select("*");

      console.log("data in api", data);
      if (error) {
        console.log("Error creating workout", error);
        return null;
      }
      return data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(
        ["createdWorkout", { id: variables.template_id }],
        data
      );
    },
  });
};
