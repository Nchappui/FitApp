import { Exercise } from "../types/fitness";

export const EXERCISES: Exercise[] = [
  {
    id: "bench-press",
    name: "Bench Press",
    icon: "🏋️‍♂️",
    category: "compound",
    muscleGroups: ["chest", "shoulders", "arms"],
    description: "Classic chest exercise with barbell",
  },
  {
    id: "squat",
    name: "Squat",
    icon: "🦵",
    category: "compound",
    muscleGroups: ["legs", "glutes"],
    description: "Fundamental leg exercise",
  },
  {
    id: "deadlift",
    name: "Deadlift",
    icon: "💪",
    category: "compound",
    muscleGroups: ["back", "legs", "glutes"],
    description: "Full body strength exercise",
  },
  {
    id: "overhead-press",
    name: "Overhead Press",
    icon: "🔝",
    category: "compound",
    muscleGroups: ["shoulders", "arms"],
    description: "Standing shoulder press",
  },
  {
    id: "pull-ups",
    name: "Pull-ups",
    icon: "🆙",
    category: "compound",
    muscleGroups: ["back", "arms"],
    description: "Bodyweight back exercise",
  },
  {
    id: "dumbbell-rows",
    name: "Dumbbell Rows",
    icon: "↕️",
    category: "isolation",
    muscleGroups: ["back", "arms"],
    description: "Back isolation with dumbbells",
  },
  {
    id: "bicep-curls",
    name: "Bicep Curls",
    icon: "💪",
    category: "isolation",
    muscleGroups: ["arms"],
    description: "Arm isolation exercise",
  },
  {
    id: "leg-press",
    name: "Leg Press",
    icon: "🦿",
    category: "compound",
    muscleGroups: ["legs", "glutes"],
    description: "Machine-based leg exercise",
  },
  {
    id: "chest-fly",
    name: "Chest Fly",
    icon: "🕊️",
    category: "isolation",
    muscleGroups: ["chest"],
    description: "Chest isolation exercise",
  },
];

export const getExercisesByCategory = (category: string) => {
  return EXERCISES.filter((exercise) => exercise.category === category);
};

export const getExercisesByMuscleGroup = (muscleGroup: string) => {
  return EXERCISES.filter((exercise) =>
    exercise.muscleGroups.includes(muscleGroup as any)
  );
};
