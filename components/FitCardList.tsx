import { FlatList, StyleSheet, View } from "react-native";
import { EXERCISES } from "../data/exercises";
import { Exercise } from "../types/fitness";
import FitCard from "./FitCard";

export default function FitCardList() {
  const handleExercisePress = (exercise: Exercise) => {
    console.log("Exercise pressed:", exercise.name);
    // TODO: Navigate to exercise detail screen
  };

  const renderExercise = ({ item }: { item: Exercise }) => (
    <FitCard exercise={item} onPress={handleExercisePress} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={EXERCISES}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
  },
});
