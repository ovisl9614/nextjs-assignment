export const PLAN_KEY = "fitlog-plan";
export const SAVED_KEY = "fitlog-saved";

export type StoredExercise = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export function getStoredExercises(
  key: string
): StoredExercise[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(key);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored) as StoredExercise[];
  } catch (error) {
    console.error("Failed to read local storage:", error);
    return [];
  }
}

export function saveStoredExercises(
  key: string,
  exercises: StoredExercise[]
): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    key,
    JSON.stringify(exercises)
  );

  window.dispatchEvent(
    new CustomEvent("fitlog-storage-change")
  );
}

export function addExercise(
  key: string,
  exercise: StoredExercise
): void {
  const current = getStoredExercises(key);

  const alreadyExists = current.some(
    (item) => item.id === exercise.id
  );

  if (alreadyExists) {
    return;
  }

  saveStoredExercises(key, [
    ...current,
    exercise,
  ]);
}

export function removeExercise(
  key: string,
  id: number
): void {
  const current = getStoredExercises(key);

  const updated = current.filter(
    (item) => item.id !== id
  );

  saveStoredExercises(key, updated);
}