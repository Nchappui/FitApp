import { FavoritesStorageService } from "@/services/favoritesStorage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Exercise } from "../types/fitness";

type Props = {
  exercise: Exercise;
  onPress: (exercise: Exercise) => void;
};

export default function FitCard({ exercise, onPress }: Props) {
  const [isFavorite, setFavorite] = useState(false);

  // Charger l'état initial du favori
  useEffect(() => {
    const loadFavoriteStatus = async () => {
      try {
        const favoriteStatus = await FavoritesStorageService.isFavorite(
          exercise.id
        );
        setFavorite(favoriteStatus);
      } catch (error) {
        console.error("Error loading favorite status:", error);
      }
    };

    loadFavoriteStatus();
  }, [exercise.id]); // Re-exécuter si l'exercice change
  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await FavoritesStorageService.removeFavorite(exercise.id);
      } else {
        await FavoritesStorageService.addFavorite(exercise.id);
      }
      setFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
    // Here you could also handle saving the favorite state to a database or local storage
  };
  return (
    <Pressable style={styles.card} onPress={() => onPress(exercise)}>
      <View style={styles.content}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.muscleGroups}>
          {exercise.muscleGroups.join(" • ")}
        </Text>
        {exercise.description && (
          <Text style={styles.description} numberOfLines={2}>
            {exercise.description}
          </Text>
        )}
      </View>
      <View style={{ margin: 10 }}>
        <Pressable onPress={toggleFavorite}>
          {isFavorite ? (
            <FontAwesome name="star" size={30} color="gold" />
          ) : (
            <FontAwesome name="star-o" size={30} color="#888" />
          )}
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 80,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  muscleGroups: {
    fontSize: 12,
    color: "#666",
    textTransform: "capitalize",
    marginBottom: 2,
  },
  description: {
    fontSize: 11,
    color: "#888",
    fontStyle: "italic",
  },
});
