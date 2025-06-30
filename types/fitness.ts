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
  | "biceps"
  | "triceps"
  | "deltoïdes"
  | "deltoïdes antérieurs"
  | "deltoïdes latéraux"
  | "deltoïdes postérieurs"
  | "trapèzes"
  | "trapèzes moyens"
  | "rhomboïdes"
  | "grands dorsaux"
  | "érecteurs du rachis"
  | "pectoraux"
  | "pectoraux supérieurs"
  | "pectoraux inférieurs"
  | "quadriceps"
  | "ischio-jambiers"
  | "fessiers"
  | "mollets"
  | "grands droits"
  | "obliques"
  | "transverse"
  | "fléchisseurs de hanche";

export type ExerciseCategory =
  | "pecs"
  | "dos"
  | "jambes"
  | "épaules"
  | "bras"
  | "abdos";
