import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Divider,
  Button,
  Menu,
  useTheme,
} from "react-native-paper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "react-native-toast-notifications";
import { TextInput } from "../Inputs/TextInput";
import { NumberInput } from "../Inputs/NumberInput";
import {
  useGetWorkoutIntensities,
  WorkoutIntensity,
} from "../../api/WorkoutIntensities";
import { useDeleteWorkoutInterval } from "../../api/WorkoutIntervals";

interface IntervalDeleteModalProps {
  visible: boolean;
  onDismiss: () => void;
  intervalId: number;
}

export const IntervalDeleteModal: React.FC<IntervalDeleteModalProps> = ({
  visible,
  onDismiss,
  intervalId,
}) => {
  const theme = useTheme();
  const toast = useToast();
  const queryClient = useQueryClient();
  const deleteInterval = useDeleteWorkoutInterval();

  const handleDeleteInterval = () => {
    deleteInterval.mutate(
      { intervalId },
      {
        onSuccess: () => {
          toast.show("Interval successfully deleted!", {
            type: "success",
            duration: 4000,
            animationType: "slide-in",
          });
          queryClient.invalidateQueries({
            queryKey: ["workoutIntervals"],
          });
        },
      }
    );
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        style={{ padding: 12, zIndex: 5 }}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          padding: 24,
          height: 200,
          borderRadius: 8,
          gap: 16,
          justifyContent: "start",
        }}
        onDismiss={onDismiss}
      >
        <>
          <Text
            style={{
              color: theme.colors.text,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Delete Interval
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              marginTop: 48,
              justifyContent: "space-between",
            }}
          >
            <Button
              onPress={onDismiss}
              style={{
                borderRadius: 4,
                height: 54,
                justifyContent: "center",
                width: "45%",
                borderWidth: 2,
                borderColor: theme.colors.foregroundMuted,
              }}
              textColor={theme.colors.text}
              labelStyle={{ fontSize: 16, fontWeight: "bold" }}
              contentStyle={{ color: theme.colors.text }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                handleDeleteInterval();
                onDismiss();
              }}
              style={{
                borderRadius: 4,
                height: 54,
                justifyContent: "center",
                width: "45%",
                backgroundColor: theme.colors.foregroundMuted,
                borderWidth: 2,
                borderColor: theme.colors.border,
              }}
              textColor={theme.colors.text}
              labelStyle={{ fontSize: 16, fontWeight: "bold" }}
              contentStyle={{ color: theme.colors.text }}
            >
              Delete
            </Button>
          </View>
        </>
      </Modal>
    </Portal>
  );
};
