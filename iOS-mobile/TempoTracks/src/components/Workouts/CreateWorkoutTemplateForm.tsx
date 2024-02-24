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
  useTheme,
} from "react-native-paper";
import DraggableFlatList, {
  NestableScrollContainer,
  NestableDraggableFlatList,
} from "react-native-draggable-flatlist";
import { Button as PaperButton } from "react-native-paper";
import { Formik } from "formik";
import { createWorkoutTemplate } from "../../api/WorkoutTemplate.ts";
import { TextInput as CustomTextInput } from "../Inputs/TextInput";
import { NumberInput } from "../Inputs/NumberInput";
import { Checkbox } from "../Inputs/Checkbox";
import { AntDesign } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import CustomCarousel from "../Workouts/CustomCarousel.js";
import {
  useCreateWorkoutTemplate,
  useGetWorkoutTemplates,
} from "../../api/WorkoutTemplate.ts";
import { usePlaylists } from "../../api/Music.ts";

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

export const CreateWorkoutTemplateForm: React.FC<
  CreateWorkoutTemplateFormProps
> = ({ userId, navigation }) => {
  const theme = useTheme();

  const { data } = useGetWorkoutTemplates(Number(userId));

  // Select playlist
  const { data: playlists = [], isPending } = usePlaylists();
  const [carouselItem, setCarouselItem] = useState(0);
  const handleItemTap = (itemId: string, setFieldValue: Function) => {
    setCarouselItem(itemId);
    setFieldValue("playlist_id", itemId);
    return itemId;
  };

  // Switch to indicate start now or create
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

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
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, title: "Recovery", active: 30, rest: 90, isChecked: false },
    { id: 2, title: "Light", active: 60, rest: 120, isChecked: false },
    { id: 3, title: "Moderate", active: 120, rest: 60, isChecked: false },
    { id: 4, title: "High", active: 20, rest: 45, isChecked: false },
    { id: 5, title: "HIIT", active: 30, rest: 30, isChecked: false },
  ]);

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
        title={item.title}
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

  const createTemplate = useCreateWorkoutTemplate();

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
          playlist_id: !isPending ? playlists[0].apple_music_id : "",
          num_sets: 1,
          intervals: [],
        }}
        onSubmit={(values) => {
          createTemplate.mutate({
            name: values.name,
            user_id: Number(userId),
            description: values.description,
            expected_duration: Number(values.mins) * 60 + Number(values.secs),
            expected_distance: Number(values.expected_distance),
            type: values.type ? values.type : null,
            playlist_id: values.playlist_id,
            num_sets: values.num_sets,
            interval_ids: values.intervals,
          });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          form,
          setFieldValue,
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
              <View style={{ gap: 16, marginBottom: 8, marginTop: 2 }}>
                <View style={{ gap: 8 }}>
                  <StyledText text="Estimated Distance" />
                  <NumberInput
                    placeholder="Enter"
                    units="km"
                    width={240}
                    value={values.expected_distance}
                    onChangeText={handleChange("expected_distance")}
                    label="Estimated Distance"
                  />
                </View>
                <View style={{ gap: 8 }}>
                  <StyledText text="Training Duration" />
                  <View
                    style={{ display: "flex", flexDirection: "row", gap: 16 }}
                  >
                    <NumberInput
                      placeholder="Enter"
                      units="mins"
                      label="Mins"
                      value={values.mins}
                      onChangeText={handleChange("mins")}
                    />
                    <NumberInput
                      placeholder="Enter"
                      units="secs"
                      label="Secs"
                      value={values.secs}
                      onChangeText={handleChange("secs")}
                    />
                  </View>
                </View>
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
                      values.type && values.type_icon ? values.type_icon : ""
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
                        {checkboxes.map((interval, index) => (
                          <Checkbox
                            key={index}
                            title={interval.title}
                            subTitle={`${interval.active} secs active, ${interval.rest} secs rest`}
                            onPress={() => handleCheckboxChange(interval.id)}
                            value={interval.isChecked}
                          />
                        ))}
                      </View>
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
                        marginBottom: 8,
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
            </View>
            {/* Playlist */}
            <View style={{ gap: 8, marginTop: 16 }}>
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
              <View style={{ gap: 32 }}>
                <View
                  style={{
                    paddingHorizontal: 6,
                    marginTop: 28,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <StyledText text="Start right away?" fontSize={18} />
                  <Switch
                    value={isSwitchOn}
                    onValueChange={onToggleSwitch}
                    trackColor={"#fff"}
                  />
                </View>
                <PaperButton
                  style={{
                    borderRadius: 8,
                    paddingVertical: 4,
                    width: "100%",
                    backgroundColor: theme.colors.primary,
                  }}
                  textColor={theme.colors.primaryForeground}
                  labelStyle={{ fontSize: 20, fontWeight: "bold" }}
                  contentStyle={{ color: theme.colors.text }}
                  onPress={() => {
                    handleSubmit();
                    if (!isSwitchOn) {
                      navigation.navigate("Workouts");
                    }
                  }}
                >
                  {isSwitchOn ? "Start Workout" : "Create Workout"}
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
