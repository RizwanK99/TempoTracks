import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";

const PressableCard = ({ imageUrl, title }) => {
  return (
    <View style={styles.card}>
      <ImageBackground source={imageUrl} style={styles.imageBackground}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    backgroundColor: "white",
  },
  imageBackground: {
    width: "100%",
    height: 190,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  titleContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PressableCard;
