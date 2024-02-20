import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { WorkoutInProgressDetails } from "../components/Workouts/WorkoutInProgressDetails";
import { WorkoutInProgressSongPlayer } from "../components/Workouts/WorkoutInProgressSongPlayer";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { useWindowDimensions, Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const WorkoutInProgressPage = ({ navigation, route }) => {
  const theme = useTheme();
  const { workoutId } = route.params;
  const [activeIndex, setActiveIndex] = useState<boolean>(false);

  const windowWidth = useWindowDimensions().width;
  const scrollOffsetValue = useSharedValue<number>(0);
  const [isFast, setIsFast] = React.useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = React.useState(true);
  const ref = React.useRef<ICarouselInstance>(null);
  const [data, setData] = React.useState([...new Array(2).keys()]);

  const baseOptions = {
    vertical: false,
    width: windowWidth,
    height: "100%",
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
        onScrollStart={() => {
          console.log("===1");
        }}
        onScrollEnd={() => {
          console.log("===2");
        }}
        onConfigurePanGesture={(g) => g.enabled(false)}
        pagingEnabled={isPagingEnabled}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) =>
          index === 0 ? (
            <SafeAreaView style={{ flex: 1 }}>
              <WorkoutInProgressDetails
                workoutId={workoutId}
                navigation={navigation}
              />
            </SafeAreaView>
          ) : (
            <SafeAreaView style={{ flex: 1 }}>
              <WorkoutInProgressSongPlayer />
            </SafeAreaView>
          )
        }
      />
    </SafeAreaView>
  );
};

export default WorkoutInProgressPage;