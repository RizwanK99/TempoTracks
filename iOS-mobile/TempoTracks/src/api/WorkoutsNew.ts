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

export const usePauseWorkout = (workoutId: string) => {
  return useMutation({
    mutationFn: async (workoutId: string) => {
      const { data, error } = await supabase
        .from("workouts")
        .update({
          is_paused: true,
          paused_at: new Date(),
          status: "PAUSED",
        })
        .eq("workout_id", workoutId);

      if (error) {
        console.log("Error pausing workout", error);
        return null;
      }
      return data;
    },
  });
};

export const useResumeWorkout = (workoutId: string) => {
  return useMutation({
    mutationFn: async (workoutId: string) => {
      const { data, error } = await supabase
        .from("workouts")
        .update({
          is_paused: false,
          paused_at: null,
          status: "IN_PROGRESS",
        })
        .eq("workout_id", workoutId);

      if (error) {
        console.log("Error pausing workout", error);
        return null;
      }
      return data;
    },
  });
};

export const useEndWorkout = (workoutId: string, duration: number) => {
  return useMutation({
    mutationFn: async (object: any) => {
      const { workoutId, duration } = object;
      const { data, error } = await supabase
        .from("workouts")
        .update({
          is_paused: false,
          paused_at: null,
          status: "COMPLETED",
          time_end: new Date(),
          total_duration: duration,
        })
        .eq("workout_id", workoutId);

      if (error) {
        console.log("Error ending workout", error);
        return null;
      }
      return data;
    },
  });
};