import { supabase } from "../lib/supabase";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Tables, TablesInsert } from "../lib/db.types";

export const useCreateWorkoutTemplate = () => {
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

export const useGetWorkoutTemplates = (userId: string) => {
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
        .select(
          "*, workout_intervals(*, workout_intensities(*)), playlists(*, playlist_items(*, songs(*)))"
        )
        .eq("id", id.replace(/"/g, ""))
        .single();

      const templateWithFormattedSongs = data
        ? {
            ...data,
            workout_intervals: data.workout_intervals
              ? (data.workout_intervals.filter(
                  (interval) => !!interval.workout_intensities
                ) as (Tables<"workout_intervals"> & {
                  workout_intensities: Tables<"workout_intensities">;
                })[])
              : [],
            playlists: data.playlists
              ? {
                  ...data.playlists,
                  songs: data.playlists.playlist_items
                    .map((item) => item.songs)
                    .filter((x) => !!x) as Tables<"songs">[],
                }
              : null,
          }
        : null;

      if (error) {
        console.log("Error fetching workout templates", error);
        return null;
      }

      return templateWithFormattedSongs;
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
