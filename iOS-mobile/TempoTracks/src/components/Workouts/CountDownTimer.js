import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useTheme } from "react-native-paper";

const CountdownTimer = ({ duration, onComplete }) => {
  const [counter, setCounter] = useState(duration);
  const circlePerimeter = 2 * Math.PI * 45;
  const [strokeDashoffset, setStrokeDashoffset] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    let interval;
    if (counter > 0) {
      interval = setInterval(
        () => setCounter((prevCounter) => prevCounter - 1),
        1000
      );
    } else {
      onComplete();
    }

    return () => clearInterval(interval);
  }, [counter, onComplete]);

  useEffect(() => {
    const progress = (counter / duration) * circlePerimeter;
    setStrokeDashoffset(circlePerimeter - progress);
  }, [counter, duration, circlePerimeter]);

  return (
    <View style={styles.countdownContainer}>
      <Svg width={185} height={185} viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          strokeWidth="8"
          strokeLinecap="round"
          stroke={theme.colors.primary}
          style={styles.circleBackground}
        />
        <Circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          strokeWidth="8"
          stroke={theme.colors.foregroundMuted}
          strokeDasharray={circlePerimeter}
          strokeDashoffset={strokeDashoffset}
          style={styles.circleForeground}
        />
      </Svg>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 48,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        {counter}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  countdownContainer: {
    alignItems: "center",
  },
  circleForeground: {
    opacity: 0.9,
    transform: [{ rotate: "90deg" }],
  },
});

export default CountdownTimer;
