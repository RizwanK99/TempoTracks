import React, { useState, useMemo, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { Button as PaperButton } from "react-native-paper";
import {
  usePauseWorkout,
  useResumeWorkout,
  useEndWorkout,
} from "../../api/WorkoutsNew";
import { useStopwatch } from "react-timer-hook";

// Watch Manager
import {
  IS_WATCH_ENABLED,
  EventListener,
  WatchManager,
} from "../../module/WatchManager";
import { useAppTheme } from "../../provider/PaperProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TimingEngineResult } from "../../hooks/useTimingEngine";
import { MusicManager } from "../../module/MusicManager";

interface TimeProps {
  value: number;
  unit: string;
  showColon?: boolean;
}

const Time: React.FC<TimeProps> = ({ value, unit, showColon = true }) => {
  const theme = useTheme();
  return (
    <Text style={{ color: theme.colors.primary, fontSize: 68 }} key={unit}>
      {showColon && ":"}
      {value < 10 ? `0${value}` : value}
    </Text>
  );
};

interface StatProps {
  unit: string;
  value: number;
}

const Stat: React.FC<StatProps> = ({ unit, value }) => {
  const theme = useAppTheme();
  return (
    <Text style={{ color: theme.colors.text, fontSize: 34 }}>
      {value} {unit}
    </Text>
  );
};

interface WorkoutInProgressDetailsProps {
  workoutId: string;
  templateId: string;
  timingEngine: TimingEngineResult;
  navigation: any;
  totalSeconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  reset: (
    offsetTimestamp?: Date | undefined,
    autoStart?: boolean | undefined
  ) => void;
  start: () => void;
  pause: () => void;
  paused: boolean;
  togglePaused: () => void;
}

export const WorkoutInProgressDetails: React.FC<
  WorkoutInProgressDetailsProps
> = ({
  workoutId,
  templateId,
  timingEngine,
  navigation,
  totalSeconds,
  minutes,
  seconds,
  hours,
  reset,
  start,
  pause,
  paused,
  togglePaused,
}) => {
  const theme = useAppTheme();
  const { mutate: pauseWorkout } = usePauseWorkout();
  const { mutate: resumeWorkout } = useResumeWorkout();
  const { mutate: endWorkout } = useEndWorkout();
  const [calories, setCalories] = useState<number>(100);
  const [bpm, setBpm] = useState<number>(120);
  const [distance, setDistance] = useState<number>(5);

  // Needed since calling reset after mutation
  const duration = useMemo(() => {
    return totalSeconds;
  }, [totalSeconds]);

  const handleWorkoutEnd = () => {
    endWorkout({ workoutId, templateId, duration });
    reset();
    navigation.navigate("WorkoutSummaryPage", {
      workoutId: workoutId,
      duration: duration,
      calories: calories,
      bpm: bpm,
      distance: distance,
    });
  };

  if (IS_WATCH_ENABLED) {
    const [pauseEventData, setPauseEventData] = useState(null);
    const [endEventData, setEndEventData] = useState(null);

    useEffect(() => {
      if (EventListener.getCount("togglePauseWorkout") == 0) {
        const unsubscribePause = EventListener.subscribe(
          "togglePauseWorkout",
          (data) => {
            setPauseEventData(data);
          }
        );
        const unsubscribeStop = EventListener.subscribe(
          "endWorkout",
          (data) => {
            setEndEventData(data);
          }
        );

        return () => {
          unsubscribePause();
          unsubscribeStop();
        };
      }

      return;
    }, []);

    useEffect(() => {
      if (!pauseEventData) return;

      if (pauseEventData == "true") {
        pauseWorkout(workoutId);
        pause();
      } else {
        resumeWorkout(workoutId);
        start();
      }

      togglePaused();

      setPauseEventData(null);
    }, [pauseEventData]);

    useEffect(() => {
      if (!endEventData) return;

      handleWorkoutEnd();
    }, [endEventData]);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 24,
        gap: 10,
        flexDirection: "column",
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 8,
          alignSelf: "center",
        }}
      >
        <Time unit="hours" value={hours} showColon={false} />
        <Time unit="minutes" value={minutes} />
        <Time unit="seconds" value={seconds} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <Stat unit="CAL" value={calories} />
        <Stat unit="BPM" value={bpm} />
        <Stat unit="FT" value={distance} />
      </View>
      <View style={{ flexDirection: "row", marginTop: "70%" }}>
        <View
          style={{
            flexDirection: "column",
            width: "50%",
            alignItems: "center",
            gap: 8,
          }}
        >
          <TouchableOpacity
            style={{
              width: "50%",
              backgroundColor: theme.colors.redPrimaryForeground,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 24,
              padding: 4,
            }}
            onPress={async () => {
              if (IS_WATCH_ENABLED) {
                WatchManager.endWorkout(workoutId);
              }
              console.log("ending workout");
              await timingEngine.endTimer();
              MusicManager.pause();
              handleWorkoutEnd();
            }}
          >
            <MaterialCommunityIcons
              name="stop"
              size={38}
              color={theme.colors.redPrimary}
            />
          </TouchableOpacity>
          <Text style={{ color: theme.colors.text, fontSize: 20 }}>Stop</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "50%",
            alignItems: "center",
            gap: 8,
          }}
        >
          {!paused ? (
            <>
              <TouchableOpacity
                style={{
                  width: "50%",
                  backgroundColor: theme.colors.primaryForeground,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 24,
                  padding: 4,
                }}
                onPress={() => {
                  //WatchManager.togglePauseWorkout(workoutId);
                  MusicManager.pause();
                  timingEngine.pauseTimer();
                  if (IS_WATCH_ENABLED) {
                    WatchManager.togglePauseWorkout(workoutId);
                  }
                  pauseWorkout(workoutId);
                  pause();
                  togglePaused();
                }}
              >
                <MaterialCommunityIcons
                  name="pause"
                  size={38}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
              <Text style={{ color: theme.colors.text, fontSize: 20 }}>
                Pause
              </Text>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  width: "50%",
                  backgroundColor: theme.colors.primaryForeground,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 24,
                  padding: 4,
                }}
                onPress={() => {
                  //WatchManager.togglePauseWorkout(workoutId);
                  MusicManager.play();
                  timingEngine.startTimer();
                  if (IS_WATCH_ENABLED) {
                    WatchManager.togglePauseWorkout(workoutId);
                  }
                  resumeWorkout(workoutId);
                  start();
                  togglePaused();
                }}
              >
                <MaterialCommunityIcons
                  name="play"
                  size={38}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
              <Text style={{ color: theme.colors.text, fontSize: 20 }}>
                Resume
              </Text>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
