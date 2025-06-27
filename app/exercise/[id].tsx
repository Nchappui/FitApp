import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { EXERCISES } from "../../data/exercises";

export default function ExerciseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Trouver l'exercice par ID
  const exercise = EXERCISES.find((ex) => ex.id === id);

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
    console.log("Add set for:", exercise.name);
    // TODO: Ouvrir modal pour ajouter une série
  };

  const handleViewHistory = () => {
    console.log("View history for:", exercise.name);
    // TODO: Naviguer vers l'historique
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
          <View style={styles.lastWorkoutPlaceholder}>
            <Text style={styles.placeholderText}>No previous workouts</Text>
            <Text style={styles.placeholderSubtext}>Start your first set!</Text>
          </View>
        </View>

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
});
