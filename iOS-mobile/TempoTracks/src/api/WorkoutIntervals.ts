import { supabase } from "../lib/supabase";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TablesInsert } from "../lib/db.types";

export const useCreateWorkoutInterval = () => {
  return useMutation({
    mutationFn: async (interval: TablesInsert<"workout_intervals">) => {
      const { data, error } = await supabase
        .from("workout_intervals")
        .insert(interval)
        .select();

      if (error) {
        console.error("Error creating workout interval", error);
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

export const useGetWorkoutIntervals = () => {
  return useQuery({
    queryKey: ["workoutIntervals"],
    queryFn: async () => {
      const { data, error } = await supabase.from("workout_intervals").select();

      if (error) {
        console.error("Error getting static intervals", error);
        return null;
      }
      return data;
    },
  });
};
