// TimingProvider.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface TimingData {
  duration: number;
  playbackRate: number;
}

interface TimingEngineState {
  currentIndex: number;
  currentTime: number;
  isPaused: boolean;
}

interface TimingContextType {
  timingData: TimingData[];
  timingEngineState: TimingEngineState;
  setTimingEngineState: React.Dispatch<React.SetStateAction<TimingEngineState>>;
  startTiming: () => void;
  pauseTiming: () => void;
  resumeTiming: () => void;
  stopTiming: () => void;
}

const TimingContext = createContext<TimingContextType | undefined>(undefined);

const TimingProvider: React.FC<{ timingData: TimingData[] }> = ({
  timingData,
  children,
}) => {
  const initialTimingEngineState: TimingEngineState = {
    currentIndex: 0,
    currentTime: 0,
    isPaused: true,
  };

  const [timingEngineState, setTimingEngineState] = useState<TimingEngineState>(
    initialTimingEngineState
  );

  useEffect(() => {
    let playbackInterval: NodeJS.Timeout;

    if (!timingEngineState.isPaused) {
      playbackInterval = setInterval(() => {
        const { currentIndex, currentTime } = timingEngineState;
        if (currentIndex < timingData.length) {
          const currentEntry = timingData[currentIndex];
          if (currentTime >= currentEntry.duration) {
            setTimingEngineState((prevState) => ({
              ...prevState,
              currentIndex: prevState.currentIndex + 1,
              currentTime: 0,
            }));
            if (currentIndex >= timingData.length) {
              clearInterval(playbackInterval);
              // All timing data processed
              return;
            }
          }
          // Call your function to set playback rate here
          console.log(`Playback rate: ${currentEntry.playbackRate}`);
          setTimingEngineState((prevState) => ({
            ...prevState,
            currentTime: prevState.currentTime + 1,
          }));
        }
      }, 1000); // Adjust interval as needed, here it checks every second
    }

    return () => clearInterval(playbackInterval);
  }, [timingData, timingEngineState]);

  const startTiming = () => {
    setTimingEngineState((prevState) => ({
      ...prevState,
      isPaused: false,
    }));
  };

  const pauseTiming = () => {
    setTimingEngineState((prevState) => ({
      ...prevState,
      isPaused: true,
    }));
  };

  const resumeTiming = () => {
    setTimingEngineState((prevState) => ({
      ...prevState,
      isPaused: false,
    }));
  };

  const stopTiming = () => {
    setTimingEngineState(initialTimingEngineState);
  };

  return (
    <TimingContext.Provider
      value={{
        timingData,
        timingEngineState,
        setTimingEngineState,
        startTiming,
        pauseTiming,
        resumeTiming,
        stopTiming,
      }}
    >
      {children}
    </TimingContext.Provider>
  );
};

const useTiming = () => {
  const context = useContext(TimingContext);
  if (context === undefined) {
    throw new Error("useTiming must be used within a TimingProvider");
  }
  return context;
};

export { TimingProvider, useTiming };
