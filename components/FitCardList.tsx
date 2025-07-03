import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  Pressable,
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
  const [isFavoritesVisible, setFavoritesVisible] = useState(false);
  const [isSettingsVisible, setSettingsVisible] = useState(false);

  const toggleFavorites = () => {
    setFavoritesVisible(!isFavoritesVisible);
  };

  const handleExercisePress = (exercise: Exercise) => {
    console.log("Navigating to exercise:", exercise.name);
    router.push({
      pathname: "/exercise/[id]",
      params: { id: exercise.id },
    });
  };

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <View style={styles.settingsButton}>
          <Pressable onPress={() => setSettingsVisible(!isSettingsVisible)}>
            <FontAwesome name="gear" size={30} color="black" />
          </Pressable>
        </View>
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
        <Pressable style={styles.Button} onPress={toggleFavorites}>
          <Text
            style={
              isFavoritesVisible ? styles.ButtonTextSelected : styles.ButtonText
            }
          >
            Favoris
          </Text>
        </Pressable>
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
          isFavortiesVisible={isFavoritesVisible}
        />
        <ExerciseSection
          title="Dos"
          category="dos"
          onExercisePress={handleExercisePress}
          searchQuery={searchQuery}
          isFavortiesVisible={isFavoritesVisible}
        />
        <ExerciseSection
          title="Jambes"
          category="jambes"
          onExercisePress={handleExercisePress}
          searchQuery={searchQuery}
          isFavortiesVisible={isFavoritesVisible}
        />
        <ExerciseSection
          title="Épaules"
          category="épaules"
          onExercisePress={handleExercisePress}
          searchQuery={searchQuery}
          isFavortiesVisible={isFavoritesVisible}
        />
        <ExerciseSection
          title="Bras"
          category="bras"
          onExercisePress={handleExercisePress}
          searchQuery={searchQuery}
          isFavortiesVisible={isFavoritesVisible}
        />
        <ExerciseSection
          title="Abdominaux"
          category="abdos"
          onExercisePress={handleExercisePress}
          searchQuery={searchQuery}
          isFavortiesVisible={isFavoritesVisible}
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
    backgroundColor: "#f0f0f0",
  },
  listContainer: {
    padding: 8,
    alignItems: "center",
    paddingBottom: 20,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    width: "100%",
    borderBottomWidth: 1, // ✅ Ajouter cette ligne
    borderBottomColor: "#e0e0e0", // ✅ Couleur grise légère
  },
  settingsButton: {
    paddingVertical: 16,
    fontWeight: 600,
    color: "#000",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingLeft: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
  },
  Button: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  ButtonText: {
    color: "#bbb",
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 5, // 5px de chaque côté
  },
  ButtonTextSelected: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 5, // 5px de chaque côté
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
