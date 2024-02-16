import { supabase } from "../lib/supabase";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Tables } from "../lib/db.types";
import { WorkoutTemplate } from "./../models/WorkoutTemplate";

interface WorkoutTemplate {
  workoutTemplate: Tables<"workout_templates">;
}

export const useCreateWorkoutTemplate = (template: WorkoutTemplate) => {
  return useMutation({
    mutationFn: async (template) => {
      const { data, error } = await supabase
        .from("workout_templates")
        .insert(template);

      if (error) {
        console.log("Error creating workout template", error);
        return null;
      }
      return data;
    },
  });
};

export const useGetWorkoutTemplates = (userId?: number) => {
  return useQuery({
    queryKey: ["workout_templates"],
    queryFn: async (userId) => {
      const { data, error } = await supabase.from("workout_templates").select();
      // .eq("user_id", userId);

      if (error) {
        console.log("Error fetching workout templates", error);
        return null;
      }
      console.log(data);
      return data;
    },
  });
};

export const useGetWorkoutTemplateById = (id: string) => {
  return useQuery({
    queryKey: ["workout_templates"],
    queryFn: async (userId) => {
      const { data, error } = await supabase
        .from("workout_templates")
        .select()
        .eq("id", id.replace(/"/g, ""));

      if (error) {
        console.log("Error fetching workout templates", error);
        return null;
      }
      return data;
    },
  });
};

export const useGetWorkoutIntervals = (ids: number[]) => {
  return useQuery({
    queryKey: ["workout_intervals"],
    queryFn: async (ids) => {
      const { data, error } = await supabase
        .from("workout_intervals")
        .select()
        .in("id", ids);

      console.log("ids", ids);

      if (error) {
        console.log("Error fetching workout intervals", error);
        return null;
      }
      console.log(data);
      return data;
    },
  });
};
