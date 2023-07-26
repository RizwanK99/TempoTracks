import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Divider, ProgressBar } from "react-native-paper";

const Highlights = () => {
  return (
    <View
      style={{
        backgroundColor: "#000",
        flex: 1,
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 28, color: "#FFF" }}>
        Summary
      </Text>
      <View style={{ marginTop: 12 }}>
        <HighlightItem />
      </View>
      <View style={{ marginTop: 16 }}>
        <HighlightItem />
      </View>
      <View style={{ marginTop: 16, marginBottom: 20 }}>
        <HighlightItem />
      </View>
    </View>
  );
};

const ProgressBarSection = ({ progress }) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <>
          <Text style={{ fontSize: 26, fontWeight: "bold", color: "#FFF" }}>
            3,780
          </Text>
          <Text style={{ marginTop: 8, color: "#FFF" }}> mins/day</Text>
        </>
      </View>
      <View style={{ marginTop: 8 }}>
        <ProgressBar
          progress={progress}
          color="#222222"
          style={{ height: 24, borderRadius: 8 }}
        />
      </View>
    </>
  );
};

const HighlightItem = () => {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 8,
        padding: 8,
        borderWidth: 2,
        borderColor: "#222222",
        borderRadius: 8,
        padding: 8,
        shadowColor: "#222222",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Ionicons name="ios-timer" size={24} color="white" />
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
          Minutes
        </Text>
      </View>
      <View style={{ marginTop: 8 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FFF" }}>
          On average, you're working out more this year compared to last year.
        </Text>
        <Divider style={{ marginTop: 8 }} />
      </View>
      <View
        style={{
          marginTop: 8,
        }}
      >
        <ProgressBarSection progress={1} />
      </View>
      <View
        style={{
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        <ProgressBarSection progress={0.63} />
      </View>
    </View>
  );
};

export default Highlights;
