"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ExerciseCard from "@/components/shared/ExerciseCard";
import {
  getStoredExercises,
  PLAN_KEY,
  type StoredExercise,
} from "@/lib/exercise-storage";

export default function MyPlanPage() {
  const [exercises, setExercises] = useState<StoredExercise[]>([]);

  useEffect(() => {
    const loadPlan = () => {
      setExercises(getStoredExercises(PLAN_KEY));
    };

    loadPlan();

    window.addEventListener(
      "fitlog-storage-change",
      loadPlan
    );

    return () => {
      window.removeEventListener(
        "fitlog-storage-change",
        loadPlan
      );
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0c0e] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-[1400px]">

        <div className="mb-8">
          <h1 className="text-3xl font-black uppercase text-white">
            My Plan
          </h1>

          <p className="mt-1 text-[10px] text-[#777c87]">
            Your selected workouts.
          </p>
        </div>

        {exercises.length === 0 ? (
          <div className="rounded-xl border border-[#252932] bg-[#15171c] px-6 py-16 text-center">
            <p className="text-sm font-bold uppercase text-white">
              Your plan is empty
            </p>

            <p className="mt-2 text-xs text-[#777c87]">
              Add workouts from the library.
            </p>

            <Link
              href="/#library"
              className="mt-5 inline-block rounded-md bg-[#ccff00] px-5 py-3 text-[9px] font-bold uppercase text-black"
            >
              Browse Workouts
            </Link>
          </div>
        ) : (
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
    </main>
  );
}