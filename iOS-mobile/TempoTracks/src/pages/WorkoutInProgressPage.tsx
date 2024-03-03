import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import { WorkoutInProgressDetails } from "../components/Workouts/WorkoutInProgressDetails";
import { WorkoutInProgressSongPlayer } from "../components/Workouts/WorkoutInProgressSongPlayer";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useStopwatch } from "react-timer-hook";

const WorkoutInProgressPage = ({ navigation, route }) => {
  const theme = useTheme();
  const { workoutId, templateId, playlistId } = route.params;

  const windowWidth = useWindowDimensions().width;
  const scrollOffsetValue = useSharedValue<number>(0);
  const [isFast, setIsFast] = React.useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = React.useState(true);
  const ref = React.useRef<ICarouselInstance>(null);
  const [data, setData] = React.useState([...new Array(2).keys()]);

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
  const [paused, setPaused] = useState<boolean>(false);

  const baseOptions = {
    vertical: false,
    width: windowWidth,
    // height: "100%",
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
        // onConfigurePanGesture={(g) => g.enabled(false)}
        pagingEnabled={isPagingEnabled}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) =>
          index === 0 ? (
            <SafeAreaView style={{ flex: 1 }}>
              <WorkoutInProgressDetails
                workoutId={workoutId}
                templateId={templateId}
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

export default WorkoutInProgressPage;
