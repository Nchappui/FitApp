import AsyncStorage from "@react-native-async-storage/async-storage";
import { WorkoutSet } from "../types/fitness";

const STORAGE_KEY = "fitness_app_workout_sets";

export class WorkoutStorageService {
  static async getSets(): Promise<WorkoutSet[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const sets = data ? JSON.parse(data) : [];

      // Migration : ajouter l'intensité par défaut pour les anciens sets
      const migratedSets = sets.map((set: any) => ({
        ...set,
        intensity: set.intensity || "1-2-reps", // Valeur par défaut
      }));

      return migratedSets;
    } catch (error) {
      console.error("Error loading workout sets:", error);
      return [];
    }
  }

  static async addSet(
    set: Omit<WorkoutSet, "id" | "date">
  ): Promise<WorkoutSet> {
    try {
      const sets = await this.getSets();

      const newSet: WorkoutSet = {
        ...set,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        date: new Date(),
      };

      sets.push(newSet);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sets));

      return newSet;
    } catch (error) {
      console.error("Error adding workout set:", error);
      throw error;
    }
  }

  static async getSetsByExercise(exerciseId: string): Promise<WorkoutSet[]> {
    try {
      const sets = await this.getSets();
      return sets
        .filter((set) => set.exerciseId === exerciseId)
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    } catch (error) {
      console.error("Error loading sets for exercise:", error);
      return [];
    }
  }

  static async deleteSet(setId: string): Promise<void> {
    try {
      const sets = await this.getSets();
      const filteredSets = sets.filter((set) => set.id !== setId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSets));
    } catch (error) {
      console.error("Error deleting workout set:", error);
      throw error;
    }
  }

  static async getLastWorkout(exerciseId: string): Promise<WorkoutSet | null> {
    try {
      const sets = await this.getSetsByExercise(exerciseId);
      return sets.length > 0 ? sets[0] : null;
    } catch (error) {
      console.error("Error getting last workout:", error);
      return null;
    }
  }

  static async getPersonalRecords(exerciseId: string): Promise<{
    maxWeight: number;
    maxReps: number;
    maxVolume: number;
  } | null> {
    try {
      const sets = await this.getSetsByExercise(exerciseId);

      if (sets.length === 0) {
        return null;
      }

      const maxWeight = Math.max(...sets.map((set) => set.weight));
      const maxReps = Math.max(...sets.map((set) => set.reps));
      const maxVolume = Math.max(...sets.map((set) => set.weight * set.reps));

      return {
        maxWeight,
        maxReps,
        maxVolume,
      };
    } catch (error) {
      console.error("Error calculating personal records:", error);
      return null;
    }
  }

  static async getLastWorkoutSets(exerciseId: string): Promise<WorkoutSet[]> {
    try {
      const sets = await this.getSetsByExercise(exerciseId);

      if (sets.length === 0) {
        return [];
      }

      // Prendre la date de la série la plus récente
      const lastDate = new Date(sets[0].date);

      // Filtrer toutes les séries de cette même date
      const lastWorkoutSets = sets.filter((set) => {
        const setDate = new Date(set.date);
        return (
          setDate.getFullYear() === lastDate.getFullYear() &&
          setDate.getMonth() === lastDate.getMonth() &&
          setDate.getDate() === lastDate.getDate()
        );
      });

      // Trier par heure (plus ancien en premier pour cette session)
      return lastWorkoutSets.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } catch (error) {
      console.error("Error getting last workout sets:", error);
      return [];
    }
  }
}
