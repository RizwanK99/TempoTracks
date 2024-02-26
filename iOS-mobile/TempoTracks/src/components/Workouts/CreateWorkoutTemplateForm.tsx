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
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  RadioButton,
  TextInput,
  Switch,
  Menu,
  Divider,
  Portal,
  Modal,
  useTheme,
} from "react-native-paper";
import DraggableFlatList, {
  NestableScrollContainer,
  NestableDraggableFlatList,
} from "react-native-draggable-flatlist";
import { Button as PaperButton } from "react-native-paper";
import { Formik } from "formik";
import { useToast } from "react-native-toast-notifications";
import { TextInput as CustomTextInput } from "../Inputs/TextInput";
import { NumberInput } from "../Inputs/NumberInput";
import { Checkbox } from "../Inputs/Checkbox";
import { AntDesign } from "@expo/vector-icons";
import { IntervalCreationModal } from "./IntervalCreationModal";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import CustomCarousel from "../Workouts/CustomCarousel.js";
import { useCreateWorkoutTemplate } from "../../api/WorkoutTemplate";
import { useGetWorkoutTemplates } from "../../api/WorkoutTemplate";
import { useGetWorkoutIntervals } from "../../api/WorkoutIntervals";
import { usePlaylists } from "../../api/Music";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import * as yup from "yup";

interface CreateWorkoutTemplateFormProps {
  userId: string;
  navigation: any;
}

interface StyledTextProps {
  fontSize?: number;
  text: string;
}

export const StyledText: React.FC<StyledTextProps> = ({
  fontSize = 16,
  text,
}) => {
  const theme = useTheme();
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

const VALIDATION_SCHEMA = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  type: yup.string().required(),
  //playlistId: yup.string().required(),
});

export const CreateWorkoutTemplateForm: React.FC<
  CreateWorkoutTemplateFormProps
> = ({ userId, navigation }) => {
  const theme = useTheme();
  const toast = useToast();

  const { data } = useGetWorkoutTemplates();

  // Select playlist
  const { data: playlists = [], isPending: loadingPlaylists } = usePlaylists();
  const [carouselItem, setCarouselItem] = useState(0);
  const handleItemTap = (itemId: string, setFieldValue: Function) => {
    setCarouselItem(itemId);
    setFieldValue("playlist_id", itemId);
    return itemId;
  };

  // Bottom Sheet Modal
  const bottomSheetModalRef = useRef(null);
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
  const icons = ["bike", "run", "walk", "timer"];
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // Select intervals and create set - will implement an endpoint if time permits
  const { data: workoutIntervals, isPending: loadingWorkoutIntervals } =
    useGetWorkoutIntervals();

  const checkboxes = useMemo(() => {
    if (!loadingWorkoutIntervals) {
      return workoutIntervals.map((interval) => ({
        ...interval,
        isChecked: false,
      }));
    }
    return [];
  }, [loadingWorkoutIntervals, workoutIntervals]);

  const [customIntervalModal, setCustomIntervalModal] =
    useState<boolean>(false);

  const checkedBoxes = useMemo(() => {
    return checkboxes.filter((item) => item.isChecked);
  }, [checkboxes]);

  const [checkedItems, setCheckedItems] = useState(checkedBoxes);

  const handleCheckboxChange = (id) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, isChecked: !checkbox.isChecked }
        : checkbox
    );
    setCheckboxes(updatedCheckboxes);
  };

  const renderItem = ({ item, drag, getIndex }) => {
    const index = (getIndex() + 1).toString();
    return (
      <Checkbox
        onLongPress={drag}
        title={item.label}
        subTitle={`${item.active} secs active, ${item.rest} secs rest`}
        index={index}
      />
    );
  };

  const [numberOfSets, setNumberOfSets] = useState<number>(1);
  const [inputtingSets, setInputtingSets] = useState<boolean>(false);

  // Bottom Sheet Modal tabs
  const [activeTab, setActiveTab] = useState(0);
  const handleIncrementActiveTab = () => {
    if (activeTab < 0) return;
    setActiveTab(activeTab + 1);
    console.log(activeTab);
  };

  const handleDecrementActiveTab = () => {
    if (activeTab < 0) return;
    setActiveTab(activeTab - 1);
    console.log(activeTab);
  };

  // Custom Interval modal controls
  const [start, setStart] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const createTemplate = useCreateWorkoutTemplate();

  if (loadingPlaylists) {
    return <Text>Loading playlists</Text>;
  }

  if (loadingWorkoutIntervals) {
    return null;
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
              user_id: Number(userId),
              description: values.description,
              expected_duration: Number(values.mins) * 60 + Number(values.secs),
              expected_distance: Number(values.expected_distance),
              type: values.type ? values.type : null,
              playlist_id: values.playlist_id,
              num_sets: values.num_sets,
              interval_ids: values.intervals,
            },
            {
              onSuccess: (data) => {
                toast.show("Workout successfully created!", {
                  type: "success",
                  duration: 4000,
                  animationType: "slide-in",
                });
                if (start) {
                  navigation.navigate("StartOrCancelWorkoutPage", {
                    templateId: data[0].id,
                    playlistId: data[0].playlist_id,
                    name: data[0].name,
                    type: data[0].type,
                  });
                } else {
                  navigation.navigate("Workouts");
                }
              },
            }
          );
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          form,
          setFieldValue,
          isValid,
          dirty,
        }) => (
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
                      border: "none",
                    }}
                    textColor={theme.colors.primaryForeground}
                    labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                    icon={
                      values.type && values.type_icon
                        ? values.type_icon
                        : "image-filter-none"
                    }
                    contentStyle={{ color: theme.colors.text }}
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
                      color: theme.colors.text,
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
                  border: "none",
                }}
                textColor={theme.colors.primaryForeground}
                labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                contentStyle={{ color: theme.colors.text }}
                icon="timer-outline"
              >
                Select intervals
              </PaperButton>
              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{
                  backgroundColor: theme.colors.primary,
                }}
                handleIndicatorStyle={{ color: "white" }}
              >
                <ScrollView
                  style={{
                    flex: 1,
                    backgroundColor: theme.colors.background,
                  }}
                >
                  {/* TAB 0 */}
                  {activeTab === 0 && (
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
                          checkboxes.map((interval, index) => (
                            <Checkbox
                              key={index}
                              title={interval.label}
                              subTitle={`${interval.active} secs active, ${interval.rest} secs rest`}
                              onPress={() => handleCheckboxChange(interval.id)}
                              value={interval.isChecked}
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
                          marginTop: -8,
                          justifyContent: "center",
                          width: "100%",
                          backgroundColor: theme.colors.previousBackground,
                          borderWidth: 1,
                          borderColor: theme.colors.primary,
                        }}
                        textColor={theme.colors.text}
                        labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                        contentStyle={{ color: theme.colors.text }}
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
                            data={checkedBoxes}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            onDragEnd={({ data }) => {
                              setCheckedItems(data);
                              console.log(
                                "here is fucking data",
                                data.map((d) => d.id.toString())
                              );
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
                      </View>
                    </NestableScrollContainer>
                  )}
                  {activeTab === 0 && (
                    <View
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        paddingHorizontal: 24,
                        marginBottom: 16,
                      }}
                    >
                      <PaperButton
                        mode="outline"
                        onPress={() => handleIncrementActiveTab()}
                        disabled={false}
                        style={{
                          borderRadius: 4,
                          paddingVertical: 4,
                          width: "100%",
                          backgroundColor: theme.colors.primary,
                          border: "none",
                        }}
                        textColor={theme.colors.primaryForeground}
                        labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                      >
                        Next
                      </PaperButton>
                    </View>
                  )}
                  {activeTab > 0 && (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: 4,
                        marginTop: 16,
                        paddingHorizontal: 24,
                        marginBottom: 8,
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
                        }}
                        textColor={theme.colors.primaryForeground}
                        labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                        onPress={() => {
                          bottomSheetModalRef?.current.close();
                        }}
                      >
                        Finish
                      </PaperButton>
                    </View>
                  )}
                </ScrollView>
              </BottomSheetModal>
              <View>
                <IntervalCreationModal
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
                  contentStyle={{ color: theme.colors.primary, gap: -4 }}
                  icon="content-save-outline"
                  disabled={start || !isValid}
                  onPress={() => {
                    setSave(true);
                    handleSubmit();
                  }}
                >
                  <Text style={{ fontSize: 18 }}>
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
                    color: theme.colors.text,
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
