import { Exercise } from "../types/fitness";

export const EXERCISES: Exercise[] = [
  {
    id: "bench-press-barre",
    name: "Développé Couché Barre",
    category: "pecs",
    muscleGroups: ["pectoraux", "deltoïdes antérieurs", "triceps"],
    description: "Exercice classique de pectoraux avec barre",
  },
  {
    id: "bench-press-halteres",
    name: "Développé Couché Haltères",
    category: "pecs",
    muscleGroups: ["pectoraux", "deltoïdes antérieurs", "triceps"],
    description: "Développé couché avec haltères pour plus d'amplitude",
  },
  {
    id: "squat-barre-libre",
    name: "Squat Barre Libre",
    category: "jambes",
    muscleGroups: ["quadriceps", "fessiers", "ischio-jambiers"],
    description: "Squat traditionnel avec barre libre",
  },
  {
    id: "squat-smith",
    name: "Squat Smith Machine",
    category: "jambes",
    muscleGroups: ["quadriceps", "fessiers", "ischio-jambiers"],
    description: "Squat guidé avec machine Smith",
  },
  {
    id: "deadlift",
    name: "Soulevé de Terre",
    category: "dos",
    muscleGroups: [
      "érecteurs du rachis",
      "grands dorsaux",
      "trapèzes",
      "fessiers",
      "ischio-jambiers",
    ],
    description: "Exercice complet de force",
  },
  {
    id: "overhead-press",
    name: "Développé Militaire",
    category: "épaules",
    muscleGroups: ["deltoïdes", "triceps", "trapèzes"],
    description: "Développé debout pour les épaules",
  },
  {
    id: "pull-ups",
    name: "Tractions",
    category: "dos",
    muscleGroups: ["grands dorsaux", "rhomboïdes", "biceps", "trapèzes"],
    description: "Exercice au poids du corps pour le dos",
  },
  {
    id: "dumbbell-rows",
    name: "Rowing Haltères",
    category: "dos",
    muscleGroups: ["grands dorsaux", "rhomboïdes", "trapèzes moyens", "biceps"],
    description: "Isolation du dos avec haltères",
  },
  {
    id: "bicep-curls",
    name: "Curl Biceps",
    category: "bras",
    muscleGroups: ["biceps"],
    description: "Exercice d'isolation des biceps",
  },
  {
    id: "leg-press",
    name: "Presse à Cuisses",
    category: "jambes",
    muscleGroups: ["quadriceps", "fessiers"],
    description: "Exercice de jambes à la machine",
  },
  {
    id: "chest-fly",
    name: "Écarté Pectoraux",
    category: "pecs",
    muscleGroups: ["pectoraux"],
    description: "Exercice d'isolation des pectoraux",
  },
  {
    id: "shoulder-lateral-raise",
    name: "Élévations Latérales",
    category: "épaules",
    muscleGroups: ["deltoïdes latéraux"],
    description: "Isolation des deltoïdes latéraux",
  },
  {
    id: "triceps-dips",
    name: "Dips Triceps",
    category: "bras",
    muscleGroups: ["triceps", "pectoraux inférieurs"],
    description: "Exercice au poids du corps pour triceps",
  },
  {
    id: "leg-extension",
    name: "Extension Quadriceps",
    category: "jambes",
    muscleGroups: ["quadriceps"],
    description: "Isolation des quadriceps à la machine",
  },
  {
    id: "leg-curl",
    name: "Curl Ischio-jambiers",
    category: "jambes",
    muscleGroups: ["ischio-jambiers"],
    description: "Isolation des ischio-jambiers",
  },
  // Ajoutons quelques exercices pour compléter
  {
    id: "triceps-extension",
    name: "Extension Triceps",
    category: "bras",
    muscleGroups: ["triceps"],
    description: "Exercice d'isolation des triceps",
  },
  {
    id: "face-pulls",
    name: "Face Pulls",
    category: "épaules",
    muscleGroups: ["deltoïdes postérieurs", "rhomboïdes", "trapèzes moyens"],
    description: "Exercice pour l'arrière des épaules",
  },
  {
    id: "crunches",
    name: "Crunchs",
    category: "abdos",
    muscleGroups: ["grands droits", "obliques"],
    description: "Exercice de base pour les abdominaux",
  },
  {
    id: "plank",
    name: "Planche",
    category: "abdos",
    muscleGroups: ["grands droits", "transverse", "obliques"],
    description: "Gainage statique des abdominaux",
  },
  {
    id: "russian-twists",
    name: "Russian Twists",
    category: "abdos",
    muscleGroups: ["obliques", "grands droits"],
    description: "Exercice de rotation pour les obliques",
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
