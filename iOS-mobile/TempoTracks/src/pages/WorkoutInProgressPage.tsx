import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { WorkoutInProgressDetails } from "../components/Workouts/WorkoutInProgressDetails";
import { WorkoutInProgressSongPlayer } from "../components/Workouts/MusicPlayer/WorkoutInProgressSongPlayer";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useGetWorkoutTemplateById } from "../api/WorkoutTemplate";
import { useStopwatch } from "react-timer-hook";
import { useTimingEngine } from "../hooks/useTimingEngine";
import { formatWorkoutIntervals } from "../utils/formatWorkoutIntervals";
import { MusicManager } from "../module/MusicManager";
import { Tables } from "../lib/db.types";

const WorkoutPageWrapper = ({ navigation, route }) => {
  const theme = useTheme();
  const { workoutId, templateId, playlistId } = route.params;
  const { data: template, isPending } = useGetWorkoutTemplateById(templateId);

  if (!template || isPending) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: theme.colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading... in progress</Text>
      </SafeAreaView>
    );
  }

  return (
    <WorkoutInProgressPage
      navigation={navigation}
      route={route}
      template={template}
    />
  );
};

const WorkoutInProgressPage = ({
  navigation,
  route,
  template,
}: {
  template: Tables<"workout_templates"> & {
    workout_intervals: (Tables<"workout_intervals"> & {
      workout_intensities: Tables<"workout_intensities">;
    })[];
  };
  navigation: any;
  route: any;
}) => {
  const { workoutId, templateId, playlistId } = route.params;
  const theme = useTheme();

  const windowWidth = useWindowDimensions().width;
  const scrollOffsetValue = useSharedValue<number>(0);
  const [isFast, setIsFast] = React.useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = React.useState(true);
  const ref = React.useRef<ICarouselInstance>(null);
  const [data, setData] = React.useState([...new Array(2).keys()]);

  const { totalSeconds, seconds, minutes, hours, start, pause, reset } =
    useStopwatch({ autoStart: true });
  const [paused, setPaused] = useState<boolean>(false);

  const formattedIntervals = useMemo(() => {
    if (!template) return;
    return formatWorkoutIntervals({
      rawIntervals: template?.workout_intervals,
      numberOfSets: template?.num_sets,
    });
  }, [template]);

  const timingEngine = useTimingEngine<number>({
    timingData: formattedIntervals ?? [],
    autoStart: true,
    resetToDefaultOnEnd: 1,
    timeoutIdStorageKey: "music_timer",
    callback: (data, isEnd) => {
      if (!isEnd) {
        MusicManager.changePlaybackRate(data);
      }
    },
    onSuccess: () => console.log("reached end of workout"),
  });

  const baseOptions = {
    vertical: false,
    width: windowWidth,
  } as const;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Carousel
        {...baseOptions}
        loop
        enabled
        ref={ref}
        defaultScrollOffsetValue={scrollOffsetValue}
        testID={"workoutInProgess"}
        style={{ width: "100%" }}
        autoPlay={false}
        autoPlayInterval={isFast ? 100 : 2000}
        data={data}
        onScrollBegin={() => {
          console.log("===1");
        }}
        onScrollEnd={() => {
          console.log("===2");
        }}
        pagingEnabled={isPagingEnabled}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) =>
          index === 0 ? (
            <SafeAreaView style={{ flex: 1 }}>
              <WorkoutInProgressDetails
                workoutId={workoutId}
                templateId={templateId}
                timingEngine={timingEngine}
                navigation={navigation}
                totalSeconds={totalSeconds}
                seconds={seconds}
                minutes={minutes}
                hours={hours}
                start={start}
                reset={reset}
                pause={pause}
                paused={paused}
                togglePaused={() => setPaused(!paused)}
              />
            </SafeAreaView>
          ) : (
            <SafeAreaView style={{ flex: 1 }}>
              <WorkoutInProgressSongPlayer playlistId={playlistId} />
            </SafeAreaView>
          )
        }
      />
    </SafeAreaView>
  );
};

export default WorkoutPageWrapper;
