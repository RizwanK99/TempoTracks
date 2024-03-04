import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  LogBox,
} from "react-native";
import { Menu, Divider } from "react-native-paper";
import DraggableFlatList, {
  NestableScrollContainer,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { Button as PaperButton } from "react-native-paper";
import { Formik } from "formik";
import { useToast } from "react-native-toast-notifications";
import { TextInput as CustomTextInput } from "../Inputs/TextInput";
import { Checkbox } from "../Inputs/Checkbox";
import { AntDesign } from "@expo/vector-icons";
import { IntervalCreationModal } from "./IntervalCreationModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomCarousel from "../Workouts/CustomCarousel";
import { IntensityVsTimeGraph } from "../Workouts/IntensityVsTimeGraph";
import { useCreateWorkoutTemplate } from "../../api/WorkoutTemplate";
import { useGetStaticWorkoutIntervals } from "../../api/WorkoutIntervals";
import { useGetWorkoutIntensities } from "../../api/WorkoutIntensities";
import { usePlaylists } from "../../api/Music";
import * as yup from "yup";
import { useAppTheme } from "../../provider/PaperProvider";
import { Tables } from "../../lib/db.types";
import { BarChartPropsType } from "react-native-gifted-charts";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useCreateWorkoutIntervals } from "../../api/WorkoutIntervals";
import { useQueryClient } from "@tanstack/react-query";

interface CreateWorkoutTemplateFormProps {
  userId: string;
  navigation: any;
}

interface StyledTextProps {
  fontSize?: number;
  text: string;
}

export interface CheckboxDataProps extends Tables<"static_workout_intervals"> {
  isChecked: boolean;
  isCustom: boolean;
}

export const StyledText: React.FC<StyledTextProps> = ({
  fontSize = 16,
  text,
}) => {
  const theme = useAppTheme();
  return (
    <Text
      style={{
        fontWeight: "bold",
        fontSize: fontSize,
        color: theme.colors.text,
      }}
    >
      {text}
    </Text>
  );
};

function copyListNTimes<T>(list: T[], n: number): T[] {
  return Array.from({ length: n }, () => [...list]).flat();
}

const VALIDATION_SCHEMA = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  type: yup.mixed().oneOf(["Biking", "Running", "Walking", "HIIT"]),
  playlist_id: yup.string().required(),
  num_sets: yup.number().required(),
  intervals: yup.array().of(yup.string()),
});

export const CreateWorkoutTemplateForm: React.FC<
  CreateWorkoutTemplateFormProps
> = ({ userId, navigation }) => {
  const theme = useAppTheme();
  const toast = useToast();
  const queryClient = useQueryClient();

  // Select playlist
  const { data: playlists = [], isPending: loadingPlaylists } = usePlaylists();
  const handleItemTap = (itemId: number, setFieldValue: Function) => {
    setFieldValue("playlist_id", itemId);
    return itemId;
  };

  // Bottom Sheet Modal
  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  // Workout Type dropdown menu - will implement an endpoint if time permits
  const [visible, setVisible] = useState<boolean>(false);
  const items = [
    { label: "Biking", value: "Biking", icon: "bike" },
    { label: "Running", value: "Running", icon: "run" },
    { label: "Walking", value: "Walking", icon: "walk" },
    { label: "HIIT", value: "HIIT", icon: "timer" },
  ];
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // Select intervals, custom interval and create set
  const [customIntervalModal, setCustomIntervalModal] =
    useState<boolean>(false);

  const { data: workoutIntervals, isPending: loadingWorkoutIntervals } =
    useGetStaticWorkoutIntervals();

  const { data: workoutIntensities, isPending: loadingWorkoutIntensities } =
    useGetWorkoutIntensities();

  const [intervals, setIntervals] = useState<CheckboxDataProps[] | null>(null);

  const updateIntervals = (newInterval: CheckboxDataProps) => {
    setIntervals([...(intervals || []), newInterval]);
  };

  const deleteInterval = (id: number) => {
    setIntervals(intervals?.filter((interval) => interval.id !== id) || []);
  };
  const checkboxes = useMemo(() => {
    if (!loadingWorkoutIntervals && workoutIntervals) {
      const modifiedData = workoutIntervals.map((interval) => ({
        ...interval,
        isChecked: false,
        isCustom: false,
      }));
      setIntervals(modifiedData);
      return modifiedData;
    }
    return [];
  }, [loadingWorkoutIntervals, workoutIntervals, setIntervals]);

  const handleCheckboxChange = (id: string) => {
    setIntervals((prevState) =>
      prevState
        ? prevState.map((item) => {
            if (item.id.toString() === id) {
              // TODO: Fix this, i.e remove toString() and fix wahtever filtering this is
              return { ...item, isChecked: !item.isChecked };
            }
            return item;
          })
        : null
    );
  };

  // It works as expected, the NestableDraggableFlatList prevents the
  // error but it does not even work.
  LogBox.ignoreLogs([
    "VirtualizedLists should never be nested inside plain ScrollViews",
  ]);
  const checkedBoxes = useMemo(() => {
    if (!loadingWorkoutIntervals && intervals) {
      return intervals.filter((item) => item.isChecked);
    }
    return [];
  }, [intervals, loadingWorkoutIntervals]);

  const [ordering, setOrdering] = useState(checkedBoxes);
  useEffect(() => {
    setOrdering(checkedBoxes);
  }, [checkedBoxes]);

  const renderItem = ({
    item,
    drag,
    isActive,
    getIndex,
  }: RenderItemParams<CheckboxDataProps>) => {
    const index = getIndex?.() ?? 0 + 1;
    return (
      <Checkbox
        id={item.id}
        onLongPress={() => drag()}
        disabled={isActive}
        title={item.label}
        subTitle={`${item.active} secs active, ${item.rest} secs rest`}
        index={index + 1}
      />
    );
  };

  const [numberOfSets, setNumberOfSets] = useState<number>(1);

  // Bottom Sheet Modal tabs
  const [activeTab, setActiveTab] = useState(0);
  const handleIncrementActiveTab = () => {
    if (activeTab < 0) return;
    setActiveTab(activeTab + 1);
  };

  const handleDecrementActiveTab = () => {
    if (activeTab < 0) return;
    setActiveTab(activeTab - 1);
  };

  // Custom Interval modal controls
  const [start, setStart] = useState<boolean>(false);
  const createTemplate = useCreateWorkoutTemplate();
  const createWorkoutIntervals = useCreateWorkoutIntervals();

  if (loadingPlaylists) {
    return null;
  }

  if (loadingWorkoutIntervals) {
    return null;
  }

  if (loadingWorkoutIntensities) {
    return null;
  }

  const calculateEstimatedDuration = (numSets) => {
    let totalSum = 0;
    checkedBoxes.forEach((item) => {
      totalSum += item.active + item.rest;
    });
    const totalDurationInSeconds = totalSum * numSets;

    const totalMinutes = Math.floor(totalDurationInSeconds / 60);
    const remainingSeconds = totalDurationInSeconds % 60;

    return {
      minutes: totalMinutes,
      seconds: remainingSeconds,
      totalDuration: totalDurationInSeconds,
    };
  };

  const compiledIntervalsForGraph = copyListNTimes(ordering, numberOfSets);
  const barData: BarChartPropsType["data"] = [];
  for (let i = 0; i < compiledIntervalsForGraph.length; i++) {
    barData.push({
      value:
        workoutIntensities?.find(
          (obj) => obj.id === compiledIntervalsForGraph[i].intensity_id
        )?.tempo ?? -1,
      barWidth: compiledIntervalsForGraph[i].active,
      frontColor: theme.colors.bar,
      label: compiledIntervalsForGraph[i].active.toString(),
      spacing: 0,
      barBorderTopLeftRadius: 8,
      barBorderTopRightRadius: 8,
      labelTextStyle: { color: theme.colors.foregroundMuted },
    });
    barData.push({
      value: 0.25,
      barWidth: compiledIntervalsForGraph[i].rest,
      label: compiledIntervalsForGraph[i].rest.toString(),
      frontColor: theme.colors.barContrast,
      spacing: 0,
      barBorderTopLeftRadius: 8,
      barBorderTopRightRadius: 8,
      labelTextStyle: { color: theme.colors.foregroundMuted },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StyledText text="Workout Details" fontSize={18} />
      <Formik
        initialValues={{
          name: "",
          description: "",
          expected_duration: "",
          expected_distance: "",
          type: "",
          type_icon: "",
          training_intervals: "",
          mins: "",
          secs: "",
          playlist_id: playlists[0].apple_music_id,
          num_sets: 1,
          intervals: [],
        }}
        validationSchema={VALIDATION_SCHEMA}
        validateOnMount
        onSubmit={(values) => {
          createTemplate.mutate(
            {
              name: values.name,
              user_id: userId,
              description: values.description,
              expected_duration: calculateEstimatedDuration(values.num_sets)
                .totalDuration,
              expected_distance: Number(values.expected_distance),
              type: values.type ? (values.type as any) : null,
              playlist_id: values.playlist_id,
              num_sets: values.num_sets,
              interval_ids: values.intervals,
            },
            {
              onSuccess: (data) => {
                if (data) {
                  toast.show("Workout successfully created!", {
                    type: "success",
                    duration: 4000,
                    animationType: "slide-in",
                  });

                  const intervalsWithTemplateId = ordering.map(
                    ({ id, isCustom, isChecked, ...interval }, index) => ({
                      ...interval,
                      template_id: data[0].id,
                      intensity_id: interval.intensity_id || 0,
                      index: index,
                    })
                  );
                  createWorkoutIntervals.mutate(intervalsWithTemplateId);

                  queryClient.invalidateQueries({
                    queryKey: ["workout_templates"],
                  });

                  if (start && data && data.length > 0) {
                    navigation.navigate("StartOrCancelWorkoutPage", {
                      templateId: data[0].id,
                      playlistId: data[0].playlist_id,
                      name: data[0].name,
                      type: data[0].type,
                    });
                  } else {
                    navigation.navigate("WorkoutListPage");
                  }
                }
              },
            }
          );
        }}
      >
        {({ handleChange, handleSubmit, values, setFieldValue, isValid }) => (
          <>
            <View
              style={{
                gap: 16,
                paddingHorizontal: 16,
                paddingVertical: 16,
                borderRadius: 8,
                backgroundColor: theme.colors.card,
                marginTop: 8,
                borderWidth: 1,
                borderColor: theme.colors.border,
              }}
            >
              <View style={{ gap: 8 }}>
                <CustomTextInput
                  placeholder="Workout Name"
                  label="Workout Name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                />
                <CustomTextInput
                  placeholder="Description"
                  label="Description"
                  value={values.description}
                  onChangeText={handleChange("description")}
                />
              </View>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <PaperButton
                    onPress={openMenu}
                    style={{
                      borderRadius: 4,
                      paddingVertical: 4,
                      width: "100%",
                      backgroundColor: theme.colors.primary,
                    }}
                    textColor={theme.colors.primaryForeground}
                    labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                    icon={
                      values.type && values.type_icon
                        ? values.type_icon
                        : "image-filter-none"
                    }
                  >
                    {values.type === "" ? "Select category" : values.type}
                  </PaperButton>
                }
                contentStyle={{
                  marginTop: 46,
                  backgroundColor: theme.colors.card,
                }}
                style={{
                  display: "flex",
                  width: "85%",
                }}
              >
                {items.map((item, index) => (
                  <Menu.Item
                    key={index}
                    onPress={() => {
                      setFieldValue("type", item.value);
                      setFieldValue("type_icon", item.icon);
                      setVisible(false);
                    }}
                    title={item.label}
                    titleStyle={{
                      color: theme.colors.text,
                      padding: 2,
                    }}
                    contentStyle={{
                      width: "100%",
                      display: "flex",
                    }}
                    leadingIcon={item.icon}
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
                    setFieldValue("type", "");
                    setFieldValue("type_icon", "");
                    setVisible(false);
                  }}
                />
              </Menu>
              <PaperButton
                onPress={handlePresentModalPress}
                style={{
                  borderRadius: 4,
                  paddingVertical: 4,
                  width: "100%",
                  backgroundColor: theme.colors.primary,
                }}
                textColor={theme.colors.primaryForeground}
                labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                icon="timer-outline"
              >
                {checkedBoxes.length > 0
                  ? "Edit intervals"
                  : "Select intervals"}
              </PaperButton>
              {checkedBoxes.length > 0 && (
                <View style={{ marginTop: 24 }}>
                  <IntensityVsTimeGraph barData={barData} />
                </View>
              )}
              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{
                  backgroundColor: theme.colors.background,
                }}
                handleStyle={{
                  backgroundColor: theme.colors.primary,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              >
                {/* TAB 0 */}
                {activeTab === 0 && (
                  <ScrollView
                    style={{
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        paddingHorizontal: 24,
                        paddingVertical: 18,
                        gap: 24,
                      }}
                    >
                      <StyledText text="Select intervals" fontSize={24} />
                      <View style={{ display: "flex", gap: 12, width: "100%" }}>
                        {!loadingWorkoutIntervals &&
                          intervals &&
                          intervals.map((interval, index) => (
                            <Checkbox
                              key={index}
                              title={interval.label}
                              subTitle={`${interval.active} secs active, ${interval.rest} secs rest`}
                              onPress={
                                () =>
                                  handleCheckboxChange(interval.id.toString()) // TODO: this should be fixed as well
                              }
                              value={interval.isChecked}
                              deletable={interval.isCustom}
                              id={interval.id}
                              handleDelete={deleteInterval}
                            />
                          ))}
                      </View>
                      <PaperButton
                        onPress={() =>
                          setCustomIntervalModal(!customIntervalModal)
                        }
                        style={{
                          borderRadius: 4,
                          height: 54,
                          justifyContent: "center",
                          width: "100%",
                          backgroundColor: theme.colors.previousBackground,
                          borderWidth: 1,
                          borderColor: theme.colors.primary,
                        }}
                        textColor={theme.colors.text}
                        labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                        icon="pencil-plus-outline"
                      >
                        Custom interval
                      </PaperButton>
                      <Divider
                        style={{
                          width: "100%",
                          height: 1,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        paddingHorizontal: 24,
                        marginBottom: 16,
                      }}
                    >
                      <PaperButton
                        mode="outlined"
                        onPress={() => handleIncrementActiveTab()}
                        style={{
                          borderRadius: 4,
                          paddingVertical: 4,
                          marginBottom: 4,
                          width: "100%",
                          backgroundColor: theme.colors.primary,
                        }}
                        textColor={theme.colors.primaryForeground}
                        labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                        disabled={checkedBoxes.length === 0}
                      >
                        Next
                      </PaperButton>
                    </View>
                  </ScrollView>
                )}
                {activeTab === 1 && (
                  <NestableScrollContainer>
                    <View
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        paddingHorizontal: 24,
                        paddingVertical: 18,
                        gap: 24,
                      }}
                    >
                      <StyledText text="Create a set" fontSize={24} />
                      <StyledText text="Set Order" />
                      <View
                        style={{ width: "100%", flex: 1, marginBottom: 16 }}
                      >
                        <DraggableFlatList
                          data={ordering}
                          containerStyle={{ flex: 1 }}
                          renderItem={renderItem}
                          keyExtractor={(item, index) => index.toString()}
                          onDragEnd={({ data }) => {
                            setOrdering(data);
                            setFieldValue(
                              "intervals",
                              data.map((d) => d.id.toString())
                            );
                          }}
                        />
                      </View>
                      <StyledText text="Number of Sets" />
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 24,
                          alignSelf: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            if (numberOfSets > 1) {
                              setNumberOfSets(numberOfSets - 1);
                              setFieldValue("num_sets", numberOfSets);
                            }
                          }}
                        >
                          <AntDesign
                            name="minuscircleo"
                            size={28}
                            color={theme.colors.primary}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            color: theme.colors.foregroundMuted,
                            fontSize: 34,
                          }}
                        >
                          {numberOfSets}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setNumberOfSets(numberOfSets + 1);
                            setFieldValue("num_sets", numberOfSets);
                          }}
                        >
                          <AntDesign
                            name="pluscircleo"
                            size={28}
                            color={theme.colors.primary}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={{ color: theme.colors.foregroundMuted }}>
                        Total Duration:{" "}
                        {calculateEstimatedDuration(numberOfSets).minutes !==
                          0 &&
                          `${
                            calculateEstimatedDuration(numberOfSets).minutes
                          } mins`}{" "}
                        {calculateEstimatedDuration(numberOfSets).seconds !==
                          0 &&
                          `${
                            calculateEstimatedDuration(numberOfSets).seconds
                          } secs`}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: 4,
                        marginTop: 16,
                        paddingHorizontal: 24,
                        marginBottom: 16,
                        gap: 16,
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <PaperButton
                        mode="outlined"
                        style={{ borderRadius: 4, width: "50%" }}
                        onPress={() => handleDecrementActiveTab()}
                        labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                      >
                        Back
                      </PaperButton>
                      <PaperButton
                        style={{
                          borderRadius: 4,
                          backgroundColor: theme.colors.primary,
                          width: "50%",
                          height: 42,
                          justifyContent: "center",
                        }}
                        textColor={theme.colors.primaryForeground}
                        labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                        onPress={() => {
                          setFieldValue(
                            "intervals",
                            checkedBoxes.map((item) => item.id)
                          );
                          bottomSheetModalRef?.current?.close();
                        }}
                        disabled={checkedBoxes.length === 0}
                      >
                        Finish
                      </PaperButton>
                    </View>
                  </NestableScrollContainer>
                )}
              </BottomSheetModal>
              <View>
                <IntervalCreationModal
                  intervals={intervals}
                  setIntervals={updateIntervals}
                  visible={customIntervalModal}
                  onDismiss={() => setCustomIntervalModal(false)}
                />
              </View>
            </View>

            {/* Playlist */}
            <View style={{ gap: 8, marginTop: 16 }}>
              {!loadingPlaylists && (
                <>
                  <StyledText text="Choose a playlist" fontSize={18} />
                  <View
                    style={{
                      paddingHorizontal: 6,
                      backgroundColor: theme.colors.card,
                      paddingVertical: 16,
                      borderWidth: 1,
                      borderColor: theme.colors.border,
                      borderRadius: 8,
                    }}
                  >
                    <CustomCarousel
                      carouselData={playlists}
                      handleItemTap={(itemId) => {
                        handleItemTap(itemId, setFieldValue);
                        setFieldValue("playlist_id", itemId);
                      }}
                    />
                  </View>
                </>
              )}
              <View
                style={{
                  marginTop: 16,
                  marginBottom: 24,
                  flexDirection: "row",
                  gap: 8,
                }}
              >
                <PaperButton
                  style={{
                    borderRadius: 8,
                    paddingVertical: 4,
                    width: "50%",
                    borderWidth: 1.5,
                    borderColor: start
                      ? theme.colors.primaryForeground
                      : theme.colors.primary,
                  }}
                  textColor={theme.colors.primary}
                  labelStyle={{ fontSize: 20, fontWeight: "bold" }}
                  contentStyle={{ gap: -4 }}
                  icon="content-save-outline"
                  disabled={start || !isValid}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    {start ? "Saved" : "Save for later"}
                  </Text>
                </PaperButton>
                <PaperButton
                  style={{
                    borderRadius: 8,
                    paddingVertical: 4,
                    width: "50%",
                    backgroundColor: theme.colors.primary,
                  }}
                  textColor={theme.colors.primaryForeground}
                  labelStyle={{ fontSize: 22, fontWeight: "bold" }}
                  contentStyle={{
                    gap: -4,
                    marginRight: 4,
                  }}
                  icon="play-circle-outline"
                  onPress={() => {
                    handleSubmit();
                    setStart(true);
                  }}
                  disabled={!isValid}
                >
                  <Text style={{ fontSize: 18 }}>Start</Text>
                </PaperButton>
              </View>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
    gap: 8,
    marginTop: 16,
  },
  button: {
    borderRadius: 20,
    border: "2px solid #222222",
    backgroundColor: "#222222",
    width: "100%",
    height: 60,
    alignitems: "flex-end",
  },
  thumbStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
