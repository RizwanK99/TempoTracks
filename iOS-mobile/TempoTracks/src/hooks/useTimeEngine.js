import create from "zustand";
import workoutModel from "./model/workoutModel";

const useTimeEngine = create((set) => ({
  workout_id: "",
  created_at: new Date(),
  status: "",
  time_start: new Date(),
  time_end: new Date(),
  time_duration: "",
  workout_type: "",
  playlist_id: "",
  workout_name: ""
}));

export default useTimeEngine;