import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getExercisesByCategory } from "../data/exercises";
import { Exercise, ExerciseCategory } from "../types/fitness";
import FitCard from "./FitCard";

type Props = {
  title: string;
  category: ExerciseCategory;
  onExercisePress: (exercise: Exercise) => void;
  searchQuery?: string;
};

export default function ExerciseSection({
  title,
  category,
  onExercisePress,
  searchQuery = "",
}: Props) {
  // Filtrer les exercices de cette catégorie
  const categoryExercises = React.useMemo(() => {
    let exercises = getExercisesByCategory(category);

    // Appliquer le filtre de recherche si présent
    if (searchQuery.trim()) {
      exercises = exercises.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exercise.muscleGroups.some((muscle) =>
            muscle.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    return exercises;
  }, [category, searchQuery]);

  // Ne rien afficher si aucun exercice dans cette catégorie
  if (categoryExercises.length === 0) {
    return null;
  }

  const renderExercise = ({ item }: { item: Exercise }) => (
    <FitCard exercise={item} onPress={() => onExercisePress(item)} />
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={categoryExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        scrollEnabled={false} // Important pour éviter les conflits de scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    marginHorizontal: 16,
    color: "#333",
  },
  listContainer: {
    paddingHorizontal: 8,
  },
});
