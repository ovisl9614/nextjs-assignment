"use client";

import { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";

type Exercise = {
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

export default function ExerciseLibrary() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/exercises")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API failed");
        }

        return res.json();
      })
      .then((data) => {
        console.log("EXERCISES FROM API:", data);
        setExercises(data);
      })
      .catch((error) => {
        console.error("EXERCISE ERROR:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="library"
      className="relative z-20 w-full bg-[#0b0c0e] px-4 py-16 sm:px-6 lg:px-8">

      <div className="mx-auto w-full max-w-[1400px]">
        <h2 className="mb-2 text-3xl font-black uppercase text-white">
          THE LIBRARY</h2>

        <p className="mb-8 text-sm text-gray-500">
          Twelve lifts covering every major muscle group.</p>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">

          <div className="h-10 ww-10 animate-spin rounded-tr-full border-4 border-[#252932] border-t-[#ccff00]"></div>

          <p className="mt-4 text-sm text-gray-400">Loading workouts...</p>
            
          </div>
        )}

        {!loading && exercises.length === 0 && (
          <div className="rounded-xl border border-red-500 bg-[#15171c] p-10 text-center text-white">
            No exercises loaded.
          </div>
        )}

        {!loading && exercises.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}