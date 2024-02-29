import { useState, useRef } from "react";

interface TimingData {
  duration: number;
  playbackRate: number;
}

export const useTimingEngine = (params: {
  timingData: TimingData[];
  onSuccess?: () => void;
}) => {
  const { timingData, onSuccess } = params;

  const [testVar, setTestVar] = useState<number>(1.0);
  // const [isPaused, setIsPaused] = useState<boolean>(false);
  // const [pausedTime, setPausedTime] = useState<number | null>(null);
  const lastActionTime = useRef<number | null>(null);
  const lastAction = useRef<"play" | "pause" | "end" | null>(null);
  const currentTimingDataIndex = useRef<number>(0);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const remainingTimeRef = useRef<number | null>(null);
  // const isEndingRef = useRef<boolean>(false);

  const setPlaybackRateAfterDuration = (duration: number, rate: number) => {
    return new Promise<void>((resolve) => {
      timerIdRef.current = setTimeout(() => {
        setTestVar(rate);
        console.log(duration);
        resolve();
      }, remainingTimeRef.current ?? duration);
    });
  };

  // const iterateAndSetPlaybackRate = async () => {
  //   for (let i = currentTimingDataIndex.current; i < timingData.length; i++) {
  //     if (isPaused || isEndingRef.current) {
  //       return;
  //     }
  //     const data = timingData[i];
  //     await setPlaybackRateAfterDuration(data.duration, data.playbackRate);
  //     remainingTimeRef.current = null; // Reset remaining time after each iteration
  //     currentTimingDataIndex.current++;
  //   }
  // };

  /**
   * Internal function to handle starting the timer
   */
  const _handleStartTimer = (params: {
    duration: number;
    playbackRate: number;
  }) => {
    const { duration, playbackRate } = params;

    // Keep track of last taken action
    lastAction.current = "play";
    lastActionTime.current = Date.now();

    console.log("_handleStartTimer: creating timer for duration", duration);

    return new Promise<void>((resolve) => {
      timerIdRef.current = setTimeout(() => {
        // reset timeIdRef
        timerIdRef.current = null;

        console.log(
          "_handleStartTimer: setting playback rate to",
          playbackRate,
          timerIdRef
        );
        setTestVar(playbackRate);

        resolve();
        // if we reach the end of the timer, play next timing data item
        currentTimingDataIndex.current += 1;
        if (currentTimingDataIndex.current < timingData.length) {
          const data = timingData[currentTimingDataIndex.current];
          _handleStartTimer(data);
        } else {
          console.log("_handleStartTimer: reached end of timingData");
          onSuccess?.();
          endTimer();
        }
      }, duration);
    });
  };

  const startTimer = () => {
    if (timerIdRef.current) {
      console.log("Timer already started!");
      return;
    }

    if (currentTimingDataIndex.current >= timingData.length) {
      console.log("Reached end of workout!");
      return;
    }
    const data = timingData[currentTimingDataIndex.current];

    console.log("Starttimer: remainingTime", remainingTimeRef.current);

    // if there is remaining time, start the timer with the remaining time
    if (remainingTimeRef.current && remainingTimeRef.current > 0) {
      _handleStartTimer({
        duration: remainingTimeRef.current,
        playbackRate: data.playbackRate,
      });
    } else {
      _handleStartTimer(data);
    }
  };

  const pauseTimer = () => {
    if (timerIdRef.current) {
      console.log("pauseTimer: pausing");
      const currentTime = Date.now();
      clearTimeout(timerIdRef.current);

      // Track amount of time remaining
      if (
        lastAction.current === "play" &&
        lastActionTime.current &&
        currentTimingDataIndex.current < timingData.length
      ) {
        console.log(
          "pauseTimer: remainingTime is",
          timingData[currentTimingDataIndex.current].duration -
            (currentTime - lastActionTime.current)
        );

        remainingTimeRef.current =
          timingData[currentTimingDataIndex.current].duration -
          (currentTime - lastActionTime.current);

        lastAction.current = "pause";
        lastActionTime.current = currentTime;
      }
    }
  };

  const endTimer = () => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }
    lastAction.current = "end";
    lastActionTime.current = Date.now();
    remainingTimeRef.current = null;
    currentTimingDataIndex.current = 0;
  };

  // const resumePlayback = () => {
  //   setIsPaused(false);
  //   setPausedTime(Date.now() - (pausedTime ?? 0)); // Adjust paused time based on elapsed time
  //   iterateAndSetPlaybackRate();
  // };

  // const pausePlayback = () => {
  //   setIsPaused(true);
  //   setPausedTime(Date.now()); // Store the paused time
  //   if (timerIdRef.current) {
  //     clearTimeout(timerIdRef.current);
  //     remainingTimeRef.current =
  //       (timingData[currentTimingDataIndex.current]?.duration ?? 0) -
  //       (Date.now() - (pausedTime ?? 0)); // Store remaining time
  //   }
  // };

  // const endPlayback = () => {
  //   isEndingRef.current = true;
  //   if (timerIdRef.current) {
  //     clearTimeout(timerIdRef.current);
  //   }
  // };

  return {
    playbackRate: testVar,
    startTimer,
    pauseTimer,
    endTimer,
  };
};
