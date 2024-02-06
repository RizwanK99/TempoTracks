import create from "zustand";
import workoutModel from "./model/workoutModel";
import StatusEnum from "./enum/StatusEnum";

const useTimeEngine = create((set) => ({
  workout_id: "",
  created_at: new Date(),
  status: "",
  time_start: new Date(),
  time_end: new Date(),
  time_duration: "",
  workout_type: "",
  playlist_id: "",
  workout_name: "",
  setPause: () =>
    set((state) => ({ status: state.status == StatusEnum.STARTED ? StatusEnum.PAUSED : StatusEnum.STARTED })),
}));

export default useTimeEngine;