import { FavoritesStorageService } from "@/services/favoritesStorage";
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
  isFavortiesVisible?: boolean;
};

export default function ExerciseSection({
  title,
  category,
  onExercisePress,
  searchQuery = "",
  isFavortiesVisible = false,
}: Props) {
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([]);

  // Charger les favoris quand le mode change
  React.useEffect(() => {
    if (isFavortiesVisible) {
      const loadFavorites = async () => {
        try {
          const favorites = await FavoritesStorageService.getFavorites(); // Attendre la Promise
          setFavoriteIds(favorites); // Maintenant c'est un string[]
        } catch (error) {
          console.error("Error loading favorites:", error);
          setFavoriteIds([]);
        }
      };
      loadFavorites();
    }
  }, [isFavortiesVisible]);

  // Filtrer les exercices de cette catégorie
  const displayExercices = React.useMemo(() => {
    let exercises = getExercisesByCategory(category);

    if (isFavortiesVisible) {
      exercises = exercises.filter(
        (exercise) => favoriteIds.includes(exercise.id) // includes() au lieu de 'in'
      );
    }

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
  }, [category, searchQuery, isFavortiesVisible, favoriteIds]); // Ajouter favoriteIds aux dépendances

  // Ne rien afficher si aucun exercice dans cette catégorie
  if (displayExercices.length === 0) {
    return null;
  }

  const renderExercise = ({ item }: { item: Exercise }) => (
    <FitCard exercise={item} onPress={() => onExercisePress(item)} />
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={displayExercices}
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
