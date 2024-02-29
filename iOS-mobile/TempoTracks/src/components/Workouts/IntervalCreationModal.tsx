import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Modal, Portal, Text, Divider, Button, Menu } from "react-native-paper";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "react-native-toast-notifications";
import { TextInput } from "../Inputs/TextInput";
import { NumberInput } from "../Inputs/NumberInput";
import { useGetWorkoutIntensities } from "../../api/WorkoutIntensities";
import { useCreateWorkoutInterval } from "../../api/WorkoutIntervals";
import { Formik } from "formik";
import * as yup from "yup";
import { useAppTheme } from "../../provider/PaperProvider";

interface IntervalCreationModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const VALIDATION_SCHEMA = yup.object({
  name: yup.string(),
  intensity: yup.number().required(),
  active: yup.number().required(),
  rest: yup.number().required(),
});

export const IntervalCreationModal: React.FC<IntervalCreationModalProps> = ({
  visible,
  onDismiss,
}) => {
  const theme = useAppTheme();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const { data: intensities, isPending } = useGetWorkoutIntensities();
  const createWorkoutInterval = useCreateWorkoutInterval();

  if (isPending) {
    return null;
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        style={{ padding: 12, zIndex: 5 }}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          padding: 24,
          height: 460,
          borderRadius: 8,
          gap: 16,
          justifyContent: "flex-start",
        }}
        onDismiss={onDismiss}
      >
        <Formik
          initialValues={{
            name: "Custom Interval",
            intensity: 0,
            tempo: 0,
            active: 0,
            rest: 0,
          }}
          onSubmit={(values) => {
            createWorkoutInterval.mutate(
              {
                label: values.name,
                tempo: values.intensity,
                active: values.active,
                rest: values.rest,
                is_custom: true,
              },
              {
                onSuccess: (data, variables) => {
                  toast.show("Interval successfully created!", {
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
          }}
          validationSchema={VALIDATION_SCHEMA}
        >
          {({
            values,
            setFieldValue,
            handleSubmit,
            handleChange,
            errors,
            dirty,
            isValid,
          }) => (
            <>
              <Text
                style={{
                  color: theme.colors.text,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Interval Details
              </Text>
              <Divider />
              <TextInput
                placeholder="Interval Name"
                label="Interval Name"
                value={values.name}
                onChangeText={handleChange("name")}
                error={!!errors.name}
                showReturnKeyType
              />
              <Menu
                visible={menuOpen}
                onDismiss={closeMenu}
                anchor={
                  <Button
                    onPress={openMenu}
                    style={{
                      width: "100%",
                      borderRadius: 4,
                      marginTop: 8,
                      height: 54,
                      justifyContent: "center",
                      borderWidth: 1.5,
                      borderColor: errors.intensity
                        ? theme.colors.redPrimary
                        : "gray",
                    }}
                    contentStyle={{
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                    icon={menuOpen ? "chevron-down" : "chevron-right"}
                    textColor={theme.colors.foregroundMuted}
                    labelStyle={{ fontSize: 26 }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      {values.intensity && intensities
                        ? intensities.find(
                            (intensity) => intensity.id === values.intensity
                          )?.label ?? "Select Intensity"
                        : "Select Intensity"}
                    </Text>
                  </Button>
                }
                contentStyle={{
                  marginTop: 62,
                  backgroundColor: theme.colors.card,
                  width: "100%",
                }}
              >
                <ScrollView style={{ width: 316 }}>
                  {intensities?.map((intensity, index) => (
                    <Menu.Item
                      key={index}
                      title={intensity.label}
                      onPress={() => {
                        setFieldValue("intensity", intensity.id);
                        setMenuOpen(false);
                      }}
                      contentStyle={{
                        width: "100%",
                      }}
                    />
                  ))}
                  <Divider />
                  <Menu.Item
                    leadingIcon="delete"
                    title="Clear selection"
                    titleStyle={{
                      color: theme.colors.text,
                      padding: 2,
                    }}
                    onPress={() => {
                      setFieldValue("intensity", "");
                      setMenuOpen(false);
                    }}
                  />
                </ScrollView>
              </Menu>
              <View style={{ flexDirection: "row", gap: 24 }}>
                <NumberInput
                  placeholder="Enter"
                  units="secs"
                  label="Active *"
                  value={values.active}
                  onChangeText={handleChange("active")}
                  error={!!errors.active}
                />
                <NumberInput
                  placeholder="Enter"
                  units="secs"
                  label={`Rest *`}
                  value={values.rest}
                  onChangeText={handleChange("rest")}
                  error={!!errors.rest}
                />
              </View>
              <Button
                onPress={() => {
                  handleSubmit();
                  onDismiss();
                }}
                style={{
                  borderRadius: 4,
                  height: 54,
                  marginTop: 80,
                  justifyContent: "center",
                  width: "100%",
                  backgroundColor: theme.colors.foregroundMuted,
                  borderWidth: 2,
                  borderColor: theme.colors.border,
                }}
                textColor={theme.colors.text}
                labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                icon="database-edit-outline"
                disabled={!isValid || !dirty}
              >
                Create
              </Button>
            </>
          )}
        </Formik>
      </Modal>
    </Portal>
  );
};
