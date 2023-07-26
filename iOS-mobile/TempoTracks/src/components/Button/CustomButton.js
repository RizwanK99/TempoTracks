import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const CustomButton = ({ handlePress, label, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      onPress={handlePress}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#FFF" }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    border: "2px solid #222222",
    width: "100%",
    height: 60,
    alignitems: "flex-end",
  },
});

export default CustomButton;
