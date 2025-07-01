import FitCardList from "@/components/FitCardList";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <FitCardList />
      {/* Button to clear the database 
      <Pressable onPress={() => WorkoutStorageService.clearAllData()}>
        <Text>Clear DB</Text>
      </Pressable>
      */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000",
  },
});
