import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { EXERCISES } from "../data/exercises";
import { Exercise } from "../types/fitness";
import FitCard from "./FitCard";

export default function FitCardList() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrer les exercices basé sur la recherche
  const filteredExercises = useMemo(() => {
    if (!searchQuery.trim()) {
      return EXERCISES;
    }

    return EXERCISES.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.muscleGroups.some((muscle) =>
          muscle.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [searchQuery]);

  const handleExercisePress = (exercise: Exercise) => {
    console.log("Navigating to exercise:", exercise.name);
    router.push({
      pathname: "/exercise/[id]",
      params: { id: exercise.id },
    });
  };

  const renderExercise = ({ item }: { item: Exercise }) => (
    <FitCard exercise={item} onPress={handleExercisePress} />
  );

  const renderHeader = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search exercises, muscles, or categories..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999"
        autoCorrect={false}
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
      />
      {filteredExercises.length !== EXERCISES.length && (
        <Text style={styles.resultsText}>
          {filteredExercises.length} result
          {filteredExercises.length !== 1 ? "s" : ""} found
        </Text>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔍</Text>
      <Text style={styles.emptyTitle}>No exercises found</Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your search terms or browse all exercises
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    padding: 8,
    alignItems: "center",
    paddingBottom: 20,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.5,
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
    lineHeight: 22,
  },
});
