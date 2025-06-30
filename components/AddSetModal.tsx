import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { IntensityLevel, WorkoutSet } from "../types/fitness";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (set: Omit<WorkoutSet, "id" | "date">) => void;
  exerciseName: string;
  exerciseId: string;
};

export default function AddSetModal({
  visible,
  onClose,
  onSave,
  exerciseName,
  exerciseId,
}: Props) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [intensity, setIntensity] = useState<IntensityLevel>("1-2-reps");
  const [notes, setNotes] = useState("");

  // Références pour la navigation entre les champs
  const weightInputRef = useRef<TextInput>(null);
  const repsInputRef = useRef<TextInput>(null);
  const notesInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Réinitialiser le focus quand le modal s'ouvre
  useEffect(() => {
    if (visible) {
      // Délai plus long et réinitialisation forcée
      setTimeout(() => {
        // Force le re-render du TextInput
        setWeight((prev) => prev + "");
        setTimeout(() => {
          weightInputRef.current?.focus();
        }, 100);
      }, 500);
    }
  }, [visible]);

  const handleSave = () => {
    // Validation
    if (!weight.trim() || !reps.trim()) {
      Alert.alert("Error", "Please enter both weight and reps");
      return;
    }

    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps);

    if (isNaN(weightNum) || weightNum <= 0) {
      Alert.alert("Error", "Please enter a valid weight");
      return;
    }

    if (isNaN(repsNum) || repsNum <= 0) {
      Alert.alert("Error", "Please enter a valid number of reps");
      return;
    }

    // Créer la série
    const newSet: Omit<WorkoutSet, "id" | "date"> = {
      exerciseId,
      weight: weightNum,
      reps: repsNum,
      intensity,
      notes: notes.trim() || undefined,
    };

    onSave(newSet);
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setWeight("");
    setReps("");
    setIntensity("1-2-reps");
    setNotes("");
    // Dismiss keyboard et reset scroll avec animation
    Keyboard.dismiss();
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    onClose();
  };

  // Gérer le focus du champ de notes
  const handleNotesFocus = () => {
    // Scroll vers le bas pour voir le champ de notes
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 200);
  };

  // Gérer la perte de focus du champ de notes
  const handleNotesBlur = () => {
    // Revenir au début
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, 500);
  };

  // Gérer l'appui sur Done dans le champ de notes
  const handleNotesSubmit = () => {
    Keyboard.dismiss();
    notesInputRef.current?.blur();
    // Revenir au début après fermeture du clavier
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, 500);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Pressable onPress={handleClose}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </Pressable>
          <Text style={styles.title}>Add Set</Text>
          <Pressable onPress={handleSave}>
            <Text style={styles.saveButton}>Save</Text>
          </Pressable>
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.exerciseTitle}>{exerciseName}</Text>

            <View style={styles.inputSection}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                ref={weightInputRef}
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                placeholder="Enter weight"
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.label}>Repetitions</Text>
              <TextInput
                ref={repsInputRef}
                style={styles.input}
                value={reps}
                onChangeText={setReps}
                placeholder="Enter reps"
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.label}>Intensity</Text>
              <View style={styles.intensityButtons}>
                {[
                  {
                    value: "failure" as IntensityLevel,
                    label: "Échec",
                    emoji: "🔥",
                  },
                  {
                    value: "1-2-reps" as IntensityLevel,
                    label: "1-2 rep",
                    emoji: "💪",
                  },
                  {
                    value: "2-3-reps" as IntensityLevel,
                    label: "2-3 rep",
                    emoji: "⚡",
                  },
                ].map(({ value, label, emoji }) => (
                  <Pressable
                    key={value}
                    style={[
                      styles.intensityButton,
                      intensity === value && styles.intensityButtonSelected,
                    ]}
                    onPress={() => {
                      setIntensity(value);
                    }}
                  >
                    <Text style={styles.intensityEmoji}>{emoji}</Text>
                    <Text
                      style={[
                        styles.intensityText,
                        intensity === value && styles.intensityTextSelected,
                      ]}
                    >
                      {label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.label}>Notes (optional)</Text>
              <TextInput
                ref={notesInputRef}
                style={[styles.input, styles.notesInput]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Add notes about this set..."
                returnKeyType="done"
                onSubmitEditing={handleNotesSubmit}
                onFocus={handleNotesFocus}
                onBlur={handleNotesBlur}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  cancelButton: {
    fontSize: 16,
    color: "#666",
  },
  saveButton: {
    fontSize: 16,
    color: "#1976d2",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  notesInput: {
    height: 80,
    paddingTop: 16,
  },
  quickButtonsSection: {
    marginTop: 20,
  },
  quickButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  quickButton: {
    flex: 1,
    backgroundColor: "#e3f2fd",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  quickButtonText: {
    color: "#1976d2",
    fontSize: 14,
    fontWeight: "500",
  },
  // Styles pour l'intensité
  intensityButtons: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  intensityButton: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  intensityButtonSelected: {
    backgroundColor: "#e3f2fd",
    borderColor: "#1976d2",
  },
  intensityEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  intensityText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    textAlign: "center",
  },
  intensityTextSelected: {
    color: "#1976d2",
    fontWeight: "600",
  },
});
