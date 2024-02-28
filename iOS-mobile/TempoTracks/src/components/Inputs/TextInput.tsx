import React from "react";
import { useTheme } from "react-native-paper";
import { TextInput as PaperTextInput } from "react-native-paper";

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  numeric?: boolean;
  editable?: boolean;
  showReturnKeyType?: boolean;
  error?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onFocus,
  numeric = false,
  editable = true,
  showReturnKeyType = false,
  error = false,
}) => {
  const theme = useTheme();
  return (
    <PaperTextInput
      mode="outlined"
      label={label}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      placeholder={placeholder}
      textColor={theme.colors.text}
      editable={editable}
      error={error}
      keyboardType={numeric ? "numeric" : undefined}
      returnKeyType={showReturnKeyType ? "done" : undefined}
    />
  );
};
