// CountdownTimer.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

const CountdownTimer = ({ duration, onComplete }) => {
  const [counter, setCounter] = useState(duration);
  const circlePerimeter = 2 * Math.PI * 45;
  const [strokeDashoffset, setStrokeDashoffset] = useState(0);

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
      <Svg width={125} height={125} viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          strokeWidth="6"
          stroke="#404040"
          style={styles.circleBackground}
        />
        <Circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          strokeWidth="6"
          stroke="white"
          strokeDasharray={circlePerimeter}
          strokeDashoffset={strokeDashoffset}
          style={styles.circleForeground}
        />
      </Svg>
      <Text style={styles.countdownText}>{counter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  countdownContainer: {
    alignItems: "center",
  },
  countdownText: {
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 10,
    color: "#181818",
  },
  circleBackground: {
    opacity: 0.35,
  },
  circleForeground: {
    opacity: 0.9,
    transform: [{ rotate: "90deg" }],
  },
});

export default CountdownTimer;
