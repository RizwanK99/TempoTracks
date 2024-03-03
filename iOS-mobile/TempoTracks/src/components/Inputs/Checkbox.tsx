import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IntervalDeleteModal } from "../Workouts/IntervalDeleteModal";
import { useAppTheme } from "../../provider/PaperProvider";

interface CheckboxProps {
  onPress?: () => void;
  onLongPress?: () => void;
  handleDelete?: (id: number) => void;
  value?: boolean;
  title: string;
  id: number;
  subTitle: string;
  index?: number;
  disabled?: boolean;
  deletable?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  onPress,
  onLongPress,
  handleDelete,
  value,
  title,
  subTitle,
  index,
  id,
  disabled = false,
  deletable = false,
}) => {
  const theme = useAppTheme();
  const [focus, setFocused] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (focus && deletable) {
        setShowDialog(true);
      }
    }, 400);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [focus, setShowDialog]);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{ width: "100%" }}
      onPressIn={onLongPress}
      onLongPress={() => setFocused(!focus)}
      onPressOut={() => setFocused(false)}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          borderWidth: 1,
          width: "100%",
          borderColor: value
            ? theme.colors.primary
            : focus && deletable
            ? theme.colors.redPrimary
            : theme.colors.border,
          backgroundColor: theme.colors.previousBackground,
          padding: 8,
          borderRadius: 4,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 16,
            paddingHorizontal: 8,
          }}
        >
          <View
            style={{
              borderWidth: 0.5,
              height: 20,
              width: 20,
              borderRadius: 2,
              borderColor:
                focus && deletable
                  ? theme.colors.redPrimary
                  : theme.colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {value && (
              <AntDesign
                name="checksquare"
                size={19}
                color={theme.colors.primary}
              />
            )}
            {index ? (
              <Text style={{ color: theme.colors.primary }}>{index}</Text>
            ) : null}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 14,
              }}
            >
              {subTitle}
            </Text>
          </View>
          {deletable && !value && (
            <View style={{ position: "absolute", right: -60, top: 4 }}>
              <MaterialCommunityIcons
                name="delete-outline"
                size={24}
                color={
                  !focus
                    ? theme.colors.foregroundMuted
                    : theme.colors.redPrimary
                }
              />
            </View>
          )}
          {deletable && handleDelete && (
            <IntervalDeleteModal
              visible={showDialog}
              onDismiss={() => setShowDialog(false)}
              intervalId={id}
              handleDelete={() => handleDelete(id)}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
