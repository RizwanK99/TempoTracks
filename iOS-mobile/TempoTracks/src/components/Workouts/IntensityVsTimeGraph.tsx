import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { BarChart, BarChartPropsType } from "react-native-gifted-charts";
import { useAppTheme } from "../../provider/PaperProvider";

interface IntensityVsTimeGraphProps {
  barData: BarChartPropsType["data"];
}

export const IntensityVsTimeGraph: React.FC<IntensityVsTimeGraphProps> = ({
  barData,
}) => {
  const theme = useAppTheme();
  return (
    <>
      <BarChart
        data={barData}
        spacing={24}
        isAnimated
        xAxisType="dashed"
        xAxisColor={theme.colors.foregroundMuted}
        xAxisLength={285}
        xAxisThickness={1}
        yAxisThickness={0}
        yAxisTextStyle={{ color: "gray" }}
        noOfSections={6}
        maxValue={6}
        rulesLength={285}
        rulesColor={theme.colors.foregroundMuted}
      />
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          alignItems: "center",
          marginTop: 16,
          marginBottom: -12,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              height: 16,
              width: 16,
              borderRadius: 4,
              backgroundColor: theme.colors.bar,
            }}
          />
          <Text style={{ color: theme.colors.foregroundMuted }}>active</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              height: 16,
              width: 16,
              borderRadius: 4,
              backgroundColor: theme.colors.barContrast,
            }}
          />
          <Text style={{ color: theme.colors.foregroundMuted }}>rest</Text>
        </View>
      </View>
    </>
  );
};
