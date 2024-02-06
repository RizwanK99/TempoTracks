import create from "zustand";

const useTimingEngine = create((set, get) => ({
  workout_id: "",
  created_at: new Date(),
  status: "",
  time_start: new Date(),
  time_end: new Date(),
  time_duration: "",
  workout_type: "",
  playlist_id: "",
  workout_name: "",
  intervalId: null,
  isPaused: false,
  startTimer: () => {
    const intervalId = get().intervalId;
    const isPaused = get().isPaused;

    // Check if there is already an interval running
    if (!intervalId && !isPaused) {
      const newIntervalId = setInterval(() => {
        console.log("Call function here");
      }, 2500);

      set({ intervalId: newIntervalId, isPaused: false });
    }
  },

  pauseTimer: () => {
    set((state) => ({ ...state, isPaused: true }));
  },

  stopTimer: () => {
    set((state) => {
      const { intervalId } = state;

      // Check if there is an interval to clear
      if (intervalId) {
        clearInterval(intervalId);
        return { ...state, intervalId: null, isPaused: false };
      }

      return state;
    });
  },
}));

export default useTimingEngine;
