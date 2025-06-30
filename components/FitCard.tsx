import { Pressable, StyleSheet, Text, View } from "react-native";
import { Exercise } from "../types/fitness";

type Props = {
  exercise: Exercise;
  onPress: (exercise: Exercise) => void;
};

export default function FitCard({ exercise, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(exercise)}>
      <View style={styles.iconContainer}></View>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.muscleGroups}>
        {exercise.muscleGroups.join(" • ")}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 140,
    height: 120,
  },
  iconContainer: {
    marginBottom: 8,
  },
  icon: {
    fontSize: 32,
    textAlign: "center",
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
    color: "#333",
  },
  muscleGroups: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    textTransform: "capitalize",
  },
});
