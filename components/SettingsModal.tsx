import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = { visible: boolean; onClose: () => void };

export default function SettingsModal({ visible, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="formSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Settings</Text>
        <Text style={styles.modalDescription}>
          Customize your app settings here.
        </Text>
        {/* Add more settings options here */}
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
