import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Exercise } from "../types/fitness";
import ExerciseSection from "./ExerciseSection";

export default function FitCardList() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleExercisePress = (exercise: Exercise) => {
    console.log("Navigating to exercise:", exercise.name);
    router.push({
      pathname: "/exercise/[id]",
      params: { id: exercise.id },
    });
  };

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
      {/* Barre de recherche */}
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
      </View>

      {/* Sections d'exercices */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ExerciseSection
          title="Pectoraux"
          category="pecs"
          onExercisePress={handleExercisePress}
          searchQuery={searchQuery}
        />
        <ExerciseSection
          title="Dos"
          category="dos"
          onExercisePress={handleExercisePress}
          searchQuery={searchQuery}
        />
        <ExerciseSection
          title="Jambes"
          category="jambes"
          onExercisePress={handleExercisePress}
          searchQuery={searchQuery}
        />
        <ExerciseSection
          title="Épaules"
          category="épaules"
          onExercisePress={handleExercisePress}
          searchQuery={searchQuery}
        />
        <ExerciseSection
          title="Bras"
          category="bras"
          onExercisePress={handleExercisePress}
          searchQuery={searchQuery}
        />
        <ExerciseSection
          title="Abdominaux"
          category="abdos"
          onExercisePress={handleExercisePress}
          searchQuery={searchQuery}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
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
