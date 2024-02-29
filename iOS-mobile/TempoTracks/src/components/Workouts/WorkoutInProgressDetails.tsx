import React, { useState, useMemo } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Button as PaperButton } from "react-native-paper";
import {
  usePauseWorkout,
  useResumeWorkout,
  useEndWorkout,
} from "../../api/WorkoutsNew";
import { useStopwatch } from "react-timer-hook";

// Watch Manager
import { EventListener, WatchManager } from "../../module/WatchManager";
import { useAppTheme } from "../../provider/PaperProvider";

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
  navigation: any;
}

export const WorkoutInProgressDetails: React.FC<
  WorkoutInProgressDetailsProps
> = ({ workoutId, templateId, navigation }) => {
  const theme = useAppTheme();
  const { mutate: pauseWorkout } = usePauseWorkout();
  const { mutate: resumeWorkout } = useResumeWorkout();
  const { mutate: endWorkout } = useEndWorkout();
  const [paused, setPaused] = useState<boolean>(false);
  const [calories, setCalories] = useState<number>(100);
  const [bpm, setBpm] = useState<number>(120);
  const [distance, setDistance] = useState<number>(5);
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

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

  //COMMENT OUT FOR EXPO BUILDS (WATCH)

  /*START
  const [pauseEventData, setPauseEventData] = useState(null);
  const [endEventData, setEndEventData] = useState(null);

  useEffect(() => {
    if (EventListener.getCount('togglePauseWorkout') == 0){
      const unsubscribePause = EventListener.subscribe('togglePauseWorkout', (data) => {
        setPauseEventData(data);
      });
      const unsubscribeStop = EventListener.subscribe('endWorkout', (data) => {
        setEndEventData(data);
      });

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
      setPaused(true);
    }
    else {
      resumeWorkout(workoutId);
      start();
      setPaused(false);
    }
  }, [pauseEventData])

  useEffect(() => {
    if (!endEventData) return;

    handleWorkoutEnd();
  }, [endEventData])
  END*/

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
      <View style={{ flexDirection: "row", gap: 32, marginTop: "70%" }}>
        <View
          style={{
            flexDirection: "column",
            width: "28%",
            alignItems: "center",
            gap: 8,
          }}
        >
          <PaperButton
            style={{
              borderRadius: 24,
              width: "100%",
              height: 48,
              backgroundColor: theme.colors.redPrimaryForeground,
              opacity: 0.8,
            }}
            textColor={theme.colors.redPrimary}
            labelStyle={{
              fontSize: 36,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              marginLeft: 4,
              marginTop: 24,
            }}
            icon="stop"
            onPress={() => {
              //WatchManager.endWorkout(workoutId);
              handleWorkoutEnd();
            }}
          >
            <Text style={{ color: theme.colors.text, fontSize: 22 }}>Stop</Text>
          </PaperButton>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "28%",
            alignItems: "center",
            gap: 8,
          }}
        >
          {!paused ? (
            <PaperButton
              style={{
                borderRadius: 24,
                width: "100%",
                height: 48,
                backgroundColor: theme.colors.primaryForeground,
              }}
              textColor={theme.colors.primary}
              labelStyle={{
                fontSize: 36,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                marginLeft: 4,
                marginTop: 24,
              }}
              icon="pause"
              onPress={() => {
                //WatchManager.togglePauseWorkout(workoutId);
                pauseWorkout(workoutId);
                pause();
                setPaused(true);
              }}
            >
              <Text style={{ color: theme.colors.text, fontSize: 22 }}>
                Pause
              </Text>
            </PaperButton>
          ) : (
            <PaperButton
              style={{
                borderRadius: 24,
                width: "100%",
                height: 48,
                backgroundColor: theme.colors.primaryForeground,
              }}
              textColor={theme.colors.primary}
              labelStyle={{
                fontSize: 36,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                marginLeft: 4,
                marginTop: 24,
              }}
              icon="play"
              onPress={() => {
                //WatchManager.togglePauseWorkout(workoutId);
                resumeWorkout(workoutId);
                start();
                setPaused(false);
              }}
            >
              <Text style={{ color: theme.colors.text, fontSize: 22 }}>
                Resume
              </Text>
            </PaperButton>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
