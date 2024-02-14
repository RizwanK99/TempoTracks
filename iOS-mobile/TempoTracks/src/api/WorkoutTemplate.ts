import { supabase } from "./../lib/supabase";
import { WorkoutTemplate } from "./../models/WorkoutTemplate";

const createWorkoutTemplate = async (template?: WorkoutTemplate) => {
  try {
    const { data, error } = await supabase
      .from("workout_templates")
      .insert(template);
    console.log("ran", error);
  } catch (error) {
    console.log("Error", error.message);
    return null;
  }
};

export { createWorkoutTemplate };
