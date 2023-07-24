import React from "react";
import { Text, StyleSheet } from "react-native";

const StyledHeading = ({ title }) => {
  return <Text style={styles.heading}>{title}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
});

export default StyledHeading;
