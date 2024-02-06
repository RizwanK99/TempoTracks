import create from "zustand";

const useThemeStore = create((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));

const useTimingEngine = create((set, get) => ({
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
