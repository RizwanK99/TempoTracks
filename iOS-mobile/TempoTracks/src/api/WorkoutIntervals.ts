import { supabase } from "../lib/supabase";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TablesInsert } from "../lib/db.types";

export const useCreateWorkoutIntervals = () => {
  return useMutation({
    mutationFn: async (intervals: TablesInsert<"workout_intervals">[]) => {
      const { data, error } = await supabase
        .from("workout_intervals")
        .insert(intervals)
        .select();

      if (error) {
        console.error("Error creating workout intervals", error);
        return null;
      }
      return data;
    },
  });
};

export const useDeleteWorkoutInterval = () => {
  return useMutation({
    mutationFn: async (obj: any) => {
      const { intervalId } = obj;
      console.log("inside the api", intervalId);
      const { data, error } = await supabase
        .from("workout_intervals")
        .delete()
        .eq("id", intervalId);

      if (error) {
        console.error("Error creating workout interval", error);
        return null;
      }
      return data;
    },
  });
};

export const useGetStaticWorkoutIntervals = () => {
  return useQuery({
    queryKey: ["staticWorkoutIntervals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("static_workout_intervals")
        .select();

      if (error) {
        console.error("Error getting static intervals", error);
        return null;
      }
      return data;
    },
  });
};

export const useGetTemplateWorkoutIntervals = (templateId: string) => {
  return useQuery({
    queryKey: ["workoutIntervals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workout_intervals")
        .select()
        .eq("template_id", templateId);

      if (error) {
        console.error("Error getting template workout intervals", error);
        return null;
      }
      return data;
    },
  });
};
