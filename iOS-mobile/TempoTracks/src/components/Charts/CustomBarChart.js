import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

const WorkoutBarChart = () => {
  const [selectedOption, setSelectedOption] = useState("D");

  const data = {
    D: [30, 45, 60, 75, 90, 30],
    W: [150, 180, 120, 200, 140, 220],
    M: [700, 850, 600, 750, 900, 500],
    M6: [3000, 3500, 2800, 3900, 3200, 4000],
    Y: [12000, 14000, 10000, 16000, 11000, 17000],
  };

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const switchOptions = ["D", "W", "M", "M6", "Y"];

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
      paddingTop: 20,
      paddingRight: 16,
    },
    verticalLabelRotation: 0,
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          {switchOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleOptionChange(option)}
              style={[
                styles.switchOption,
                selectedOption === option && styles.selectedSwitchOption,
              ]}
            >
              <Text
                style={[
                  styles.switchOptionText,
                  selectedOption === option && styles.selectedSwitchOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <BarChart
          style={styles.chart}
          data={{
            labels,
            datasets: [
              {
                data: data[selectedOption],
              },
            ],
          }}
          width={360}
          height={260}
          chartConfig={chartConfig}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          paddingHorizontal: 16,
          marginTop: 8,
        }}
      >
        <Text>{selectedOption === "D" ? "TOTAL" : "AVERAGE"}</Text>
        <View
          style={{ flexDirection: "row", marginTop: 4, alignItems: "center" }}
        >
          <Text style={{ fontSize: 26 }}>
            {selectedOption === "D"
              ? data.D.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                )
              : data.D.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                )}
          </Text>
          <Text style={{ marginTop: 8 }}> mins</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    paddingEnd: 4,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "#222222",
    borderRadius: 16,
    marginBottom: 8,
  },
  switchOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    marginHorizontal: 4,
  },
  selectedSwitchOption: {
    backgroundColor: "#999999",
  },
  switchOptionText: {
    fontSize: 16,
    color: "#FFF",
  },
  selectedSwitchOptionText: {
    color: "#FFF",
  },
});

export default WorkoutBarChart;
