// // import create from "zustand";

// // const useTimingEngine = create((set, get) => ({
// //   intervalId: null,
// //   isPaused: false,
// //   startTimer: () => {
// //     const intervalId = get().intervalId;
// //     const isPaused = get().isPaused;

// //     // Check if there is already an interval running
// //     if (!intervalId && !isPaused) {
// //       const newIntervalId = setInterval(() => {
// //         console.log("Call function here");
// //       }, 2500);

// //       set({ intervalId: newIntervalId, isPaused: false });
// //     }
// //   },

// //   pauseTimer: () => {
// //     set((state) => ({ ...state, isPaused: true }));
// //   },

// //   stopTimer: () => {
// //     set((state) => {
// //       const { intervalId } = state;

// //       // Check if there is an interval to clear
// //       if (intervalId) {
// //         clearInterval(intervalId);
// //         return { ...state, intervalId: null, isPaused: false };
// //       }

// //       return state;
// //     });
// //   },
// // }));

// // export default useTimingEngine;

// // workoutStore.ts

// import create from "zustand";

// interface WorkoutState {
//   timingData: Array<{ duration: number; playbackRate: number }>;
//   currentIndex: number;
//   isPlaying: boolean;
//   remainingTime: number;
//   start: () => void;
//   pause: () => void;
//   reset: () => void;
// }

// export const useWorkoutStore = create<WorkoutState>((set) => ({
//   timingData: [],
//   currentIndex: 0,
//   isPlaying: false,
//   remainingTime: 0,
//   start: () => set({ isPlaying: true }, () => tick(set)),
//   pause: () => set({ isPlaying: false, remainingTime: 0 }),
//   reset: () => set({ currentIndex: 0, isPlaying: false, remainingTime: 0 }),
// }));

// // Additional function to set timing data
// export const setTimingData = (timingData: WorkoutState["timingData"]) => {
//   useWorkoutStore.setState({ timingData });
// };

// const tick = (set: (state: WorkoutState) => void) => {
//   const state = useWorkoutStore.getState();
//   const currentInterval = state.timingData[state.currentIndex];
//   const { duration, playbackRate } = currentInterval;

//   if (state.remainingTime <= 0) {
//     set({ currentIndex: state.currentIndex + 1, remainingTime: duration });
//     if (state.currentIndex < state.timingData.length) {
//       setTimeout(() => tick(set), (duration * 1000) / playbackRate);
//     } else {
//       set({ isPlaying: false, currentIndex: 0, remainingTime: 0 });
//     }
//   } else {
//     set({ remainingTime: state.remainingTime - 1 });
//     setTimeout(() => tick(set), 1000 / playbackRate);
//   }
// };

import { useEffect, useState } from "react";

interface TimingData {
  duration: number;
  playbackRate: number;
}

const useTimingEngine = (
  data: TimingData[],
  startTiming: boolean,
  pauseTiming: boolean,
  endTiming: boolean
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (
      startTiming &&
      !pauseTiming &&
      !endTiming &&
      currentIndex < data.length
    ) {
      timer = setTimeout(() => {
        // Update playback rate
        setPlaybackRate(data[currentIndex].playbackRate);

        // Move to the next entry in data after the specified duration
        setTimeout(() => {
          console.log(data[currentIndex].duration * 100);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, data[currentIndex].duration * 100);
      }, 0); // Start immediately
    }

    return () => clearTimeout(timer);
  }, [startTiming, pauseTiming, endTiming, currentIndex, data]);

  const setPlaybackRate = (playbackRate: number) => {
    // Your function to set playback rate
    // For example:
    // audioPlayer.setPlaybackRate(playbackRate);
    console.log("Setting playback rate:", playbackRate);
  };

  useEffect(() => {
    setIsPaused(pauseTiming);
  }, [pauseTiming]);

  useEffect(() => {
    if (endTiming) {
      setCurrentIndex(0);
      setIsPaused(false);
    }
  }, [endTiming]);

  return {
    currentIndex,
    isPaused,
  };
};

export default useTimingEngine;
