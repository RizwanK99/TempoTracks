import { supabase } from "../lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TablesInsert } from "../lib/db.types";
import { useNavigation } from "@react-navigation/native";

export const useCreateWorkoutTemplate = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation({
    mutationFn: async (template: TablesInsert<"workout_templates">) => {
      const { data, error } = await supabase
        .from("workout_templates")
        .insert(template)
        .select();

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
    queryKey: ["workout_templates", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workout_templates")
        .select()
        .eq("user_id", userId);

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
    queryKey: ["workoutTemplate", id],
    queryFn: async () => {
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

/**
 * THIS PROB IS NOT NEEDED, WORKOUT INTERVALS SHOULD BE NEVER BE NEEDED ON THEIR OWN
 * WE SHOULD JOIN INTERVALS WITH THE OTHER "ACTUAL" DATA, i.e THE TEMPALTE
 */
export const useGetWorkoutIntervals = (ids: number[]) => {
  return useQuery({
    queryKey: ["workout_intervals"],
    queryFn: async () => {
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
