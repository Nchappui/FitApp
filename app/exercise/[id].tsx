import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AddSetModal from "../../components/AddSetModal";
import { EXERCISES } from "../../data/exercises";
import { WorkoutStorageService } from "../../services/workoutStorage";
import { WorkoutSet } from "../../types/fitness";

export default function ExerciseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lastWorkoutSets, setLastWorkoutSets] = useState<WorkoutSet[]>([]);
  const [personalRecords, setPersonalRecords] = useState<{
    maxWeight: number;
    maxReps: number;
    maxVolume: number;
  } | null>(null);

  // Trouver l'exercice par ID
  const exercise = EXERCISES.find((ex) => ex.id === id);

  useEffect(() => {
    if (exercise) {
      loadExerciseData();
    }
  }, [exercise?.id]);

  const loadExerciseData = async () => {
    if (!exercise) return;

    try {
      const lastSets = await WorkoutStorageService.getLastWorkoutSets(
        exercise.id
      );
      const records = await WorkoutStorageService.getPersonalRecords(
        exercise.id
      );

      setLastWorkoutSets(lastSets);
      setPersonalRecords(records);
    } catch (error) {
      console.error("Error loading exercise data:", error);
    }
  };

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: "Exercise Not Found" }} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Exercise not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddSet = () => {
    setIsModalVisible(true);
  };

  const handleSaveSet = async (setData: Omit<WorkoutSet, "id" | "date">) => {
    try {
      await WorkoutStorageService.addSet(setData);
      Alert.alert("Success", "Set added successfully!");

      // Recharger les données
      await loadExerciseData();
    } catch (error) {
      console.error("Error saving set:", error);
      Alert.alert("Error", "Failed to save set. Please try again.");
    }
  };

  const handleViewHistory = () => {
    router.push({
      pathname: "/exercise/history/[id]",
      params: { id: exercise.id },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: exercise.name,
          headerTitleStyle: { fontSize: 18 },
        }}
      />

      <ScrollView style={styles.content}>
        {/* Header de l'exercice */}
        <View style={styles.exerciseHeader}>
          <Text style={styles.exerciseIcon}>{exercise.icon}</Text>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.exerciseDescription}>{exercise.description}</Text>
        </View>

        {/* Informations de l'exercice */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Muscle Groups</Text>
          <View style={styles.muscleGroupsContainer}>
            {exercise.muscleGroups.map((muscle, index) => (
              <View key={index} style={styles.muscleTag}>
                <Text style={styles.muscleTagText}>{muscle}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Category</Text>
          <Text style={styles.categoryText}>{exercise.category}</Text>
        </View>

        {/* Dernière séance */}
        <View style={styles.lastWorkoutSection}>
          <Text style={styles.sectionTitle}>Last Workout</Text>
          {lastWorkoutSets.length > 0 ? (
            <View style={styles.lastWorkoutData}>
              <View style={styles.workoutDateRow}>
                <Text style={styles.workoutDateLabel}>Date:</Text>
                <Text style={styles.workoutDateValue}>
                  {new Date(lastWorkoutSets[0].date).toLocaleDateString()}
                </Text>
              </View>

              <Text style={styles.setsTitle}>
                {lastWorkoutSets.length} Set
                {lastWorkoutSets.length > 1 ? "s" : ""}
              </Text>

              {lastWorkoutSets.map((set, index) => (
                <View key={set.id} style={styles.setRow}>
                  <View style={styles.setNumber}>
                    <Text style={styles.setNumberText}>#{index + 1}</Text>
                  </View>

                  <View style={styles.setData}>
                    <View style={styles.setDataItem}>
                      <Text style={styles.setDataValue}>{set.weight} kg</Text>
                      <Text style={styles.setDataLabel}>Weight</Text>
                    </View>

                    <View style={styles.setDataSeparator} />

                    <View style={styles.setDataItem}>
                      <Text style={styles.setDataValue}>{set.reps}</Text>
                      <Text style={styles.setDataLabel}>Reps</Text>
                    </View>

                    <View style={styles.setDataSeparator} />

                    <View style={styles.setDataItem}>
                      <Text style={styles.setDataValue}>
                        {set.intensity === "failure"
                          ? "🔥"
                          : set.intensity === "1-2-reps"
                          ? "💪"
                          : "⚡"}
                      </Text>
                      <Text style={styles.setDataLabel}>
                        {set.intensity === "failure"
                          ? "Échec"
                          : set.intensity === "1-2-reps"
                          ? "1-2 rep"
                          : "2-3 rep"}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

              {/* Totaux de la session */}
              <View style={styles.sessionTotals}>
                <View style={styles.totalItem}>
                  <Text style={styles.totalValue}>
                    {lastWorkoutSets.length}
                  </Text>
                  <Text style={styles.totalLabel}>Sets</Text>
                </View>

                <View style={styles.totalSeparator} />

                <View style={styles.totalItem}>
                  <Text style={styles.totalValue}>
                    {Math.max(...lastWorkoutSets.map((set) => set.weight))} kg
                  </Text>
                  <Text style={styles.totalLabel}>Max Weight</Text>
                </View>

                <View style={styles.totalSeparator} />

                <View style={styles.totalItem}>
                  <Text style={styles.totalValue}>
                    {lastWorkoutSets.reduce((sum, set) => sum + set.reps, 0)}
                  </Text>
                  <Text style={styles.totalLabel}>Total Reps</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.lastWorkoutPlaceholder}>
              <Text style={styles.placeholderText}>No previous workouts</Text>
              <Text style={styles.placeholderSubtext}>
                Start your first set!
              </Text>
            </View>
          )}
        </View>

        {/* Records personnels */}
        {personalRecords && (
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Personal Records</Text>
            <View style={styles.recordsContainer}>
              <View style={styles.recordItem}>
                <Text style={styles.recordValue}>
                  {personalRecords.maxWeight} kg
                </Text>
                <Text style={styles.recordLabel}>Max Weight</Text>
              </View>
              <View style={styles.recordItem}>
                <Text style={styles.recordValue}>
                  {personalRecords.maxReps}
                </Text>
                <Text style={styles.recordLabel}>Max Reps</Text>
              </View>
              <View style={styles.recordItem}>
                <Text style={styles.recordValue}>
                  {personalRecords.maxVolume}
                </Text>
                <Text style={styles.recordLabel}>Max Volume</Text>
              </View>
            </View>
          </View>
        )}

        {/* Boutons d'action */}
        <View style={styles.actionButtons}>
          <Pressable style={styles.primaryButton} onPress={handleAddSet}>
            <Text style={styles.primaryButtonText}>Add Set</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={handleViewHistory}>
            <Text style={styles.secondaryButtonText}>View History</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Modal pour ajouter une série */}
      {exercise && (
        <AddSetModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={handleSaveSet}
          exerciseName={exercise.name}
          exerciseId={exercise.id}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  exerciseHeader: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  exerciseDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  infoSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  muscleGroupsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  muscleTag: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  muscleTagText: {
    color: "#1976d2",
    fontSize: 14,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  categoryText: {
    fontSize: 16,
    color: "#666",
    textTransform: "capitalize",
  },
  lastWorkoutSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  lastWorkoutData: {
    paddingVertical: 8,
  },
  workoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  workoutLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  workoutValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  recordsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  recordItem: {
    alignItems: "center",
    flex: 1,
  },
  recordValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 4,
  },
  recordLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  lastWorkoutPlaceholder: {
    alignItems: "center",
    paddingVertical: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
    marginBottom: 4,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: "#bbb",
  },
  actionButtons: {
    gap: 12,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#1976d2",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#1976d2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1976d2",
  },
  secondaryButtonText: {
    color: "#1976d2",
    fontSize: 18,
    fontWeight: "600",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#1976d2",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  // Nouveaux styles pour la dernière séance
  workoutDateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#e3f2fd",
  },
  workoutDateLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  workoutDateValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  setsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1976d2",
    marginBottom: 12,
    textAlign: "center",
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  setNumber: {
    backgroundColor: "#1976d2",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  setNumberText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  setData: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  setDataItem: {
    flex: 1,
    alignItems: "center",
  },
  setDataValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  setDataLabel: {
    fontSize: 10,
    color: "#666",
  },
  setDataSeparator: {
    width: 1,
    height: 20,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 8,
  },
  sessionTotals: {
    flexDirection: "row",
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  totalItem: {
    flex: 1,
    alignItems: "center",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 2,
  },
  totalLabel: {
    fontSize: 10,
    color: "#1976d2",
    textAlign: "center",
  },
  totalSeparator: {
    width: 1,
    backgroundColor: "#1976d2",
    marginHorizontal: 12,
    opacity: 0.3,
  },
});
