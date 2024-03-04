import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "react-native-paper";
import { useAppTheme } from "../../provider/PaperProvider";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface RingProgressProps {
  radius?: number;
  strokeWidth?: number;
  progress: number;
  duration: number;
  onComplete: () => void;
}

const RingProgress: React.FC<RingProgressProps> = ({
  radius = 100,
  strokeWidth = 35,
  progress,
  duration,
  onComplete,
}) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;
  const theme = useAppTheme();
  const color = theme.colors.primary;
  const [counter, setCounter] = useState<number>(duration);

  const filled = useSharedValue(0);

  useEffect(() => {
    filled.value = withTiming(progress, { duration: 5000 });
  }, [progress]);

  useEffect(() => {
    let interval: NodeJS.Timer | undefined = undefined;

    if (counter > 0) {
      interval = setInterval(
        () => setCounter((prevCounter) => prevCounter - 1),
        1000
      );
    } else {
      onComplete();
    }

    return () => clearInterval(interval as any);
  }, [counter]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumference * filled.value, circumference],
  }));

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: "center",
      }}
    >
      <Svg>
        <Circle
          r={innerRadius}
          cx={radius}
          cy={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          opacity={0.2}
        />
        {/* Foreground */}
        <AnimatedCircle
          animatedProps={animatedProps}
          r={innerRadius}
          cx={radius}
          cy={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeLinecap="round"
          rotation="-90"
          originX={radius}
          originY={radius}
        />
      </Svg>
      <AntDesign
        name="arrowright"
        size={strokeWidth * 0.8}
        color="black"
        style={{
          position: "absolute",
          alignSelf: "center",
          top: strokeWidth * 0.1,
        }}
      />
      <Text
        style={{
          color: theme.colors.text,
          fontWeight: "bold",
          fontSize: 60,
          position: "absolute",
          alignSelf: "center",
          top: innerRadius - 20,
        }}
      >
        {counter}
      </Text>
    </View>
  );
};

export default RingProgress;
