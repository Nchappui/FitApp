export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  description?: string;
}

export type IntensityLevel = "failure" | "1-2-reps" | "2-3-reps";

export interface WorkoutSet {
  id: string;
  exerciseId: string;
  reps: number;
  weight: number;
  date: Date;
  intensity: IntensityLevel;
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
  | "pecs"
  | "dos"
  | "jambes"
  | "épaules"
  | "bras"
  | "abdos";
