"use client";

import React, { useEffect, useState } from "react";
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
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadExercises() {
      try {
        const response = await fetch("/api/exercises");

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();

        setExercises(data);
      } catch (error) {
        console.error("Failed to load exercises:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadExercises();
  }, []);

  return (
    <section
      id="library"
      className="bg-[#0b0c0e] px-4 py-12 sm:px-6 lg:px-10"
    >
      <div className="mx-auto w-full max-w-[1400px]">

        <div className="mb-6">
          <h2 className="text-2xl font-black uppercase text-white sm:text-3xl">
            The Library
          </h2>

          <p className="mt-1 text-[10px] text-[#777c87]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {loading && (
          <p className="py-10 text-center text-xs text-[#777c87]">
            Loading workouts...
          </p>
        )}

        {error && (
          <p className="py-10 text-center text-xs text-red-400">
            Failed to load workouts.
          </p>
        )}

        {!loading && !error && exercises.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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