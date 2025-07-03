import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = { visible: boolean; onClose: () => void };

export default function SettingsModal({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <View style={styles.settingsContainer}>
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
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          onPress={onClose}
        ></Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    flexDirection: "row",
    flex: 1,
  },
  modalContainer: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#f0f0f0",
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
    textAlign: "left",
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
