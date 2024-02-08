import { useState, useRef } from "react";

interface TimingData {
  duration: number;
  rate: number;
}

export const usePlaybackRateSetter = (timingData: TimingData[]) => {
  const [playbackRate, setPlaybackRateState] = useState<number>(1.0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [pausedTime, setPausedTime] = useState<number | null>(null);
  const currentTimingDataIndex = useRef<number>(0);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const remainingTimeRef = useRef<number | null>(null);
  const isEndingRef = useRef<boolean>(false);

  const setPlaybackRateAfterDuration = (duration: number, rate: number) => {
    return new Promise<void>((resolve) => {
      timerIdRef.current = setTimeout(() => {
        setPlaybackRateState(rate);
        console.log(duration);
        resolve();
      }, remainingTimeRef.current ?? duration);
    });
  };

  const iterateAndSetPlaybackRate = async () => {
    for (let i = currentTimingDataIndex.current; i < timingData.length; i++) {
      if (isPaused || isEndingRef.current) {
        return;
      }
      const data = timingData[i];
      await setPlaybackRateAfterDuration(data.duration, data.rate);
      remainingTimeRef.current = null; // Reset remaining time after each iteration
      currentTimingDataIndex.current++;
    }
  };

  const resumePlayback = () => {
    setIsPaused(false);
    setPausedTime(Date.now() - (pausedTime ?? 0)); // Adjust paused time based on elapsed time
    iterateAndSetPlaybackRate();
  };

  const pausePlayback = () => {
    setIsPaused(true);
    setPausedTime(Date.now()); // Store the paused time
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      remainingTimeRef.current =
        (timingData[currentTimingDataIndex.current]?.duration ?? 0) -
        (Date.now() - (pausedTime ?? 0)); // Store remaining time
    }
  };

  const endPlayback = () => {
    isEndingRef.current = true;
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }
  };

  return { playbackRate, pausePlayback, resumePlayback, endPlayback };
};
