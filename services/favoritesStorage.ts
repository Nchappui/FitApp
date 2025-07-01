import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "fitness_app_favorites";

export class FavoritesStorageService {
  static async getFavorites(): Promise<string[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const exercices = data ? JSON.parse(data) : [];

      return exercices;
    } catch (error) {
      console.error("Error loading favorites: ", error);
      return [];
    }
  }
  static async addFavorite(exerciseId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      if (favorites.includes(exerciseId)) {
        return;
      }
      favorites.push(exerciseId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error adding favorite exercise:", error);
      throw error;
    }
  }

  static async removeFavorite(exerciseId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const filteredFavorites = favorites.filter((id) => id !== exerciseId);
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(filteredFavorites)
      );
    } catch (error) {
      console.error("Error removing favorite exercise:", error);
      throw error;
    }
  }

  static async isFavorite(exerciseId: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    return favorites.includes(exerciseId);
  }

  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      console.log("All favorites cleared");
    } catch (error) {
      console.error("Error clearing favorite data:", error);
      throw error;
    }
  }

  static async resetDatabase(): Promise<void> {
    try {
      await this.clearAllData();
      console.log("Database reset complete");
    } catch (error) {
      console.error("Error resetting database:", error);
      throw error;
    }
  }
}
