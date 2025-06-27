import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { EXERCISES } from "../../../data/exercises";
import { WorkoutStorageService } from "../../../services/workoutStorage";
import { WorkoutSet } from "../../../types/fitness";

export default function ExerciseHistory() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [sets, setSets] = useState<WorkoutSet[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Trouver l'exercice par ID
  const exercise = EXERCISES.find((ex) => ex.id === id);

  useEffect(() => {
    if (exercise) {
      loadHistoryData();
    }
  }, [exercise?.id]);

  const loadHistoryData = async () => {
    if (!exercise) return;

    try {
      const exerciseSets = await WorkoutStorageService.getSetsByExercise(
        exercise.id
      );
      setSets(exerciseSets);
    } catch (error) {
      console.error("Error loading exercise history:", error);
      Alert.alert("Error", "Failed to load exercise history");
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadHistoryData();
    setIsRefreshing(false);
  };

  const handleDeleteSet = (setToDelete: WorkoutSet) => {
    Alert.alert(
      "Delete Set",
      `Are you sure you want to delete this set?\n${setToDelete.weight}kg × ${setToDelete.reps} reps`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await WorkoutStorageService.deleteSet(setToDelete.id);
              await loadHistoryData(); // Recharger la liste
              Alert.alert("Success", "Set deleted successfully");
            } catch (error) {
              console.error("Error deleting set:", error);
              Alert.alert("Error", "Failed to delete set");
            }
          },
        },
      ]
    );
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const setDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - setDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "Today";
    } else if (diffDays === 2) {
      return "Yesterday";
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return setDate.toLocaleDateString();
    }
  };

  const renderSetItem = ({
    item,
    index,
  }: {
    item: WorkoutSet;
    index: number;
  }) => (
    <View style={styles.setItem}>
      <View style={styles.setHeader}>
        <Text style={styles.setNumber}>Set #{sets.length - index}</Text>
        <Text style={styles.setDate}>{formatDate(item.date)}</Text>
      </View>

      <View style={styles.setData}>
        <View style={styles.dataItem}>
          <Text style={styles.dataValue}>{item.weight} kg</Text>
          <Text style={styles.dataLabel}>Weight</Text>
        </View>

        <View style={styles.dataSeparator} />

        <View style={styles.dataItem}>
          <Text style={styles.dataValue}>{item.reps}</Text>
          <Text style={styles.dataLabel}>Reps</Text>
        </View>

        <View style={styles.dataSeparator} />

        <View style={styles.dataItem}>
          <Text style={styles.dataValue}>
            {item.intensity === "failure"
              ? "🔥"
              : item.intensity === "1-2-reps"
              ? "💪"
              : "⚡"}
          </Text>
          <Text style={styles.dataLabel}>
            {item.intensity === "failure"
              ? "Échec"
              : item.intensity === "1-2-reps"
              ? "1-2 rep"
              : "2-3 rep"}
          </Text>
        </View>
      </View>

      {item.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      )}

      <Pressable
        style={styles.deleteButton}
        onPress={() => handleDeleteSet(item)}
      >
        <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
      </Pressable>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📊</Text>
      <Text style={styles.emptyTitle}>No workout history</Text>
      <Text style={styles.emptySubtitle}>
        Start adding sets to track your progress!
      </Text>
      <Pressable style={styles.goBackButton} onPress={() => router.back()}>
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </Pressable>
    </View>
  );

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: "Exercise Not Found" }} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Exercise not found</Text>
          <Pressable style={styles.goBackButton} onPress={() => router.back()}>
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Calculer les statistiques rapides
  const totalSets = sets.length;
  const totalVolume = sets.reduce((sum, set) => sum + set.weight * set.reps, 0);
  const avgWeight =
    totalSets > 0
      ? sets.reduce((sum, set) => sum + set.weight, 0) / totalSets
      : 0;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: `${exercise.name} History`,
          headerTitleStyle: { fontSize: 16 },
        }}
      />

      {/* Statistiques rapides */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalSets}</Text>
          <Text style={styles.statLabel}>Total Sets</Text>
        </View>
        <View style={styles.statSeparator} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalVolume.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Volume</Text>
        </View>
        <View style={styles.statSeparator} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{avgWeight.toFixed(1)} kg</Text>
          <Text style={styles.statLabel}>Avg Weight</Text>
        </View>
      </View>

      {/* Liste des séries */}
      <FlatList
        data={sets}
        renderItem={renderSetItem}
        keyExtractor={(item) => item.id}
        style={styles.setsList}
        contentContainerStyle={[
          styles.setsListContainer,
          sets.length === 0 && styles.emptyListContainer,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={["#1976d2"]}
          />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  statSeparator: {
    width: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  setsList: {
    flex: 1,
  },
  setsListContainer: {
    padding: 16,
    paddingTop: 0,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
  },
  setItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  setHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  setNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  setDate: {
    fontSize: 14,
    color: "#666",
  },
  setData: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dataItem: {
    flex: 1,
    alignItems: "center",
  },
  dataValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  dataLabel: {
    fontSize: 12,
    color: "#666",
  },
  dataSeparator: {
    width: 1,
    height: 30,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 8,
  },
  notesContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  notesLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 18,
  },
  deleteButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#fff0f0",
    borderWidth: 1,
    borderColor: "#ffcdd2",
  },
  deleteButtonText: {
    fontSize: 12,
    color: "#d32f2f",
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  goBackButton: {
    backgroundColor: "#1976d2",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  goBackButtonText: {
    color: "#fff",
    fontSize: 16,
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
    textAlign: "center",
  },
});
