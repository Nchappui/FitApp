import { Pressable, StyleSheet, Text, View } from "react-native";
import { Exercise } from "../types/fitness";

type Props = {
  exercise: Exercise;
  onPress: (exercise: Exercise) => void;
};

export default function FitCard({ exercise, onPress }: Props) {
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
    justifyContent: "center",
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
