export interface Exercise {
  id: string;
  name: string;
  icon: string; // emoji ou nom d'icône
  category: string;
  muscleGroups: string[];
  description?: string;
}

export interface WorkoutSet {
  id: string;
  exerciseId: string;
  reps: number;
  weight: number;
  date: Date;
  notes?: string;
}

export interface ExerciseHistory {
  exerciseId: string;
  sets: WorkoutSet[];
  lastWorkout?: Date;
  personalRecord?: {
    maxWeight: number;
    maxReps: number;
    maxVolume: number;
  };
}

export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "arms"
  | "legs"
  | "abs"
  | "glutes";

export type ExerciseCategory =
  | "strength"
  | "cardio"
  | "flexibility"
  | "compound"
  | "isolation";
