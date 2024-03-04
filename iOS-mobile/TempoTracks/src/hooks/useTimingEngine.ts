import { useRef, useEffect } from "react";

interface TimingData<T> {
  duration: number;
  value: T;
}

export interface TimingEngineResult {
  startTimer: () => Promise<void>;
  pauseTimer: () => Promise<void>;
  endTimer: () => Promise<void>;
}

export const useTimingEngine = <T>(params: {
  timingData: TimingData<T>[];
  autoStart?: boolean;
  resetToDefaultOnEnd?: T;
  timeoutIdStorageKey: "music_timer";
  callback: (val: T, isEnd: boolean) => void;
  onSuccess?: () => void;
}): TimingEngineResult => {
  const { timingData, autoStart, resetToDefaultOnEnd, callback, onSuccess } =
    params;

  // const [isPaused, setIsPaused] = useState<boolean>(false);
  // const [pausedTime, setPausedTime] = useState<number | null>(null);
  const lastActionTime = useRef<number | null>(null);
  const lastAction = useRef<"play" | "pause" | "end" | null>(null);
  const currentTimingDataIndex = useRef<number>(0);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const remainingTimeRef = useRef<number | null>(null);
  const initializedRef = useRef<boolean>(false);

  useEffect(() => {
    if (autoStart && !initializedRef.current) {
      initializedRef.current = true;
      startTimer();
    }

    return () => {
      endTimer();
    };
  }, []);

  // const isEndingRef = useRef<boolean>(false);

  // const setPlaybackRateAfterDuration = (duration: number, rate: number) => {
  //   return new Promise<void>((resolve) => {
  //     timerIdRef.current = setTimeout(() => {
  //       setTestVar(rate);
  //       console.log(duration);
  //       resolve();
  //     }, remainingTimeRef.current ?? duration);
  //   });
  // };

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
   * Internal function to handle refetching the stored timer id
   */
  const _handleRefetchStoredTimerId = async () => {
    // if (storedTimerId) {
    //   if (timerIdRef.current !== storedTimerId) {
    //     console.log("_handleRefetchStoredTimerId: updating timerIdRef");
    //     timerIdRef.current = storedTimerId;
    //   } else {
    //     clearTimeout(storedTimerId);
    //   }
    // }
  };

  /**
   * Internal function to handle starting the timer
   */
  const _handleStartTimer = async (params: TimingData<T>) => {
    const { duration, value } = params;

    // Keep track of last taken action
    lastAction.current = "play";
    lastActionTime.current = Date.now();

    // console.log("_handleStartTimer: creating timer for duration", duration);
    // console.log("_handleStartTimer: setting value to", value);
    // console.log("_handleStartTimer: timerIdRef", timerIdRef.current);
    callback(value, false);

    return new Promise<void>(async (resolve) => {
      timerIdRef.current = setTimeout(async () => {
        // reset timeIdRef
        timerIdRef.current = null;

        resolve();
        // if we reach the end of the timer, play next timing data item
        currentTimingDataIndex.current += 1;
        if (currentTimingDataIndex.current < timingData.length) {
          const data = timingData[currentTimingDataIndex.current];
          _handleStartTimer(data);
        } else {
          // console.log("_handleStartTimer: reached end of timingData");
          onSuccess?.();
          endTimer();
        }
      }, duration);

      // console.log(
      //   "_handleStartTimer: setting timerIdRef to",
      //   timerIdRef.current
      // );
    });
  };

  const startTimer = async () => {
    await _handleRefetchStoredTimerId();

    if (timerIdRef.current) {
      // console.log("Timer already started!");
      return;
    }

    if (currentTimingDataIndex.current >= timingData.length) {
      // console.log("Reached end of workout!");
      return;
    }
    const data = timingData[currentTimingDataIndex.current];

    // console.log("Starttimer: remainingTime", remainingTimeRef.current);

    // if there is remaining time, start the timer with the remaining time
    if (remainingTimeRef.current && remainingTimeRef.current > 0) {
      _handleStartTimer({
        duration: remainingTimeRef.current,
        value: data.value,
      });
    } else {
      _handleStartTimer(data);
    }
  };

  const pauseTimer = async () => {
    _handleRefetchStoredTimerId();

    if (timerIdRef.current) {
      // console.log("pauseTimer: pausing");
      const currentTime = Date.now();
      clearTimeout(timerIdRef.current);

      // Track amount of time remaining
      if (
        lastAction.current === "play" &&
        lastActionTime.current &&
        currentTimingDataIndex.current < timingData.length
      ) {
        // console.log(
        //   "pauseTimer: remainingTime is",
        //   timingData[currentTimingDataIndex.current].duration -
        //     (currentTime - lastActionTime.current)
        // );

        remainingTimeRef.current =
          timingData[currentTimingDataIndex.current].duration -
          (currentTime - lastActionTime.current);

        lastAction.current = "pause";
        lastActionTime.current = currentTime;
      }
    }
  };

  const endTimer = async () => {
    await _handleRefetchStoredTimerId();

    // console.log("endTimer: ending timer", timerIdRef.current?.toString());
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }

    if (!!resetToDefaultOnEnd) {
      callback(resetToDefaultOnEnd, true);
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
    startTimer,
    pauseTimer,
    endTimer,
  };
};
