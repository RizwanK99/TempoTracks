import { supabase } from "../lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables, TablesInsert } from "../lib/db.types";

export const useCreateWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (workout: TablesInsert<"workouts">) => {
      const { data, error } = await supabase
        .from("workouts")
        .insert(workout)
        .select()
        .single();

      if (error) {
        console.log("Error creating workout", error);
        return null;
      }
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["createdWorkout", { id: variables.template_id }],
        data
      );
    },
  });
};

export const usePauseWorkout = () => {
  return useMutation({
    mutationFn: async (workoutId: string) => {
      const { data, error } = await supabase
        .from("workouts")
        .update({
          is_paused: true,
          paused_at: new Date().toISOString(),
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

export const useResumeWorkout = () => {
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

export const useEndWorkout = () => {
  return useMutation({
    mutationFn: async (params: {
      workoutId: string;
      templateId: string;
      duration: number | null;
      rawHealthData: any | null;
    }) => {
      console.log("Ending workout", params);

      const { workoutId, templateId, duration, rawHealthData } = params;
      // const { refetch } = useGetWorkoutById(workoutId);

      console.log("rawHealthData", rawHealthData);

      if (rawHealthData) {
        const parsedHealthData = (() => {
          try {
            return JSON.parse(rawHealthData) as {
              id: string;
              averageHeartRate: number;
              heartRate: number;
              activeEnergy: number;
              distance: number;
            };
          } catch (e) {
            console.log("Error parsing health data", e);
            return null;
          }
        })();
        console.log("rawHealthData", rawHealthData, parsedHealthData);

        if (!parsedHealthData) {
          return null;
        }

        const healthData: Partial<Tables<"workouts">> = {
          workout_id: parsedHealthData.id,
          total_distance: parsedHealthData.distance,
          total_energy_burned: parsedHealthData.activeEnergy,
          average_heart_rate: parsedHealthData.averageHeartRate,
        };

        const { data: resultData } = await supabase
          .from("workouts")
          .update({
            is_paused: false,
            paused_at: null,
            status: "COMPLETED",
            time_end: new Date().toISOString(),

            ...healthData,
          })
          .eq("workout_id", workoutId)
          .select()
          .single();

        if (!resultData) {
          console.log("Error saving workout health data");
          return null;
        }

        await supabase
          .from("workout_templates")
          .update({
            last_completed: new Date().toISOString(),
          })
          .eq("id", templateId);

        // refetch();
        return resultData;
      }

      const { data, error } = await supabase
        .from("workouts")
        .update({
          is_paused: false,
          paused_at: null,
          status: "COMPLETED",
          time_end: new Date().toISOString(),
          ...(duration ? { total_duration: duration } : {}), // only update duration if it's provided
        })
        .eq("workout_id", workoutId);

      const { data: updatedTemplate } = await supabase
        .from("workout_templates")
        .update({
          last_completed: new Date().toISOString(),
        })
        .eq("id", templateId);

      if (error) {
        console.log("Error ending workout", error);
        return null;
      }
      return data;
    },
  });
};

export const useGetWorkoutById = (workoutId: string) => {
  return useQuery({
    queryKey: ["workoutId", workoutId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workouts")
        .select()
        .eq("workout_id", workoutId)
        .single();

      if (error) {
        console.log("Error ending workout", error);
        return null;
      }
      return data;
    },
  });
};

export const useGetCompletedWorkouts = (userId: string) => {
  return useQuery({
    queryKey: ["completedWorkouts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workouts")
        .select()
        .eq("status", "COMPLETED")
        .eq("user_id", userId);

      if (error) {
        console.log("Error getting completed workouts", error);
        return null;
      }
      return data;
    },
  });
};
