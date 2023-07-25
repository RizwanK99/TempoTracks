import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CustomDialog = ({
  visible,
  onCancel,
  onConfirm,
  dialogTitle,
  dialogMessage,
}) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{dialogTitle}</Text>
          <Text style={styles.message}>{dialogMessage}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={[styles.buttonText, styles.confirmButtonText]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeIcon} onPress={onCancel}>
            <AntDesign name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: "#eaeaea",
    alignItems: "center",
  },
  confirmButton: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
    border: "2px solid #222222",
    backgroundColor: "#222222",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  confirmButtonText: {
    color: "white",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default CustomDialog;
