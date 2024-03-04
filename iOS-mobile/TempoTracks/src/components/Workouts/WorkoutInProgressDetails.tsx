import React, { useState, useMemo, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import {
  usePauseWorkout,
  useResumeWorkout,
  useEndWorkout,
} from "../../api/WorkoutsNew";

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
import { _formatNumber } from "../../pages/WorkoutSummaryPage";

interface TimeProps {
  value: number;
  unit: string;
  showColon?: boolean;
}

const Time: React.FC<TimeProps> = ({ value, unit, showColon = true }) => {
  const theme = useAppTheme();
  return (
    <Text
      style={{ color: theme.colors.primary, fontSize: 68 }}
      key={`${value}-${unit}`}
    >
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
      {_formatNumber(value)} {unit}
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
  // const duration = useMemo(() => {
  //   return totalSeconds;
  // }, [totalSeconds]);

  const handleWorkoutEnd = (fromLocal: boolean, data: any = null) => {
    if (fromLocal && IS_WATCH_ENABLED) {
      WatchManager.endWorkout(workoutId);
    }

    endWorkout({
      workoutId,
      templateId,
      duration: totalSeconds > 0 ? totalSeconds : null,
      rawHealthData: data,
    });
    reset();
    navigation.navigate("WorkoutSummaryPage", {
      workoutId: workoutId,
    });
  };

  useEffect(() => {
    if (IS_WATCH_ENABLED) {
      if (EventListener.getCount("togglePauseWorkout") == 0) {
        const unsubscribePause = EventListener.subscribe(
          "togglePauseWorkout",
          (pauseEventData) => {
            if (!pauseEventData) return;

            if (pauseEventData == "true") {
              pauseWorkout(workoutId);
              pause();
            } else {
              resumeWorkout(workoutId);
              start();
            }

            togglePaused();
          }
        );
        const unsubscribeStop = EventListener.subscribe(
          "endWorkout",
          (data) => {
            data ? handleWorkoutEnd(false, data) : null;
          }
        );

        const unsubscribeLiveData = EventListener.subscribe(
          "updateLiveWorkout",
          (data) => {
            console.log("updateLiveWorkout event received", data);
            if (data) {
              const parsedData = (() => {
                try {
                  return JSON.parse(data);
                } catch (e) {
                  console.log("Error parsing live data", e);
                  return null;
                }
              })();

              if (parsedData) {
                setCalories(parsedData.activeEnergy);
                setBpm(parsedData.heartRate);
                setDistance(parsedData.distance);
              }
            }
          }
        );

        return () => {
          unsubscribePause();
          unsubscribeStop();
          unsubscribeLiveData();
        };
      }
    }
    return;
  }, []);

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
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* HEALTHKIT - may not be possible to update in real time? */}
        <Stat unit="CAL" value={calories} />
        <Stat unit="BPM" value={bpm} />
        <Stat unit="M" value={distance} />
      </View>
      <View style={{ flexDirection: "row", marginTop: "30%" }}>
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
              console.log("ending workout");
              await timingEngine.endTimer();
              MusicManager.pause();
              handleWorkoutEnd(true);
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
