"use client";

import React from "react";
import Image from "next/image";
import {
  addExercise,
  PLAN_KEY,
  SAVED_KEY,
} from "@/lib/exercise-storage";

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

type ExerciseCardProps = {
  exercise: Exercise;
};

export default function ExerciseCard({
  exercise,
}: ExerciseCardProps) {
  const handleAddToPlan = () => {
    addExercise(PLAN_KEY, exercise);
  };

  const handleSave = () => {
    addExercise(SAVED_KEY, exercise);
  };

  return (
    <article className="overflow-hidden rounded-xl border border-[#252932] bg-[#15171c]">

      {/* Image */}
      <div className="relative h-[180px] w-full">
        <Image
          src={exercise.image}
          alt={exercise.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="p-4">

        {/* Muscle groups */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {exercise.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-2 py-1 text-[8px] font-bold uppercase text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="text-sm font-black uppercase text-white">
          {exercise.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1 text-[9px] text-[#777c87]">
          {exercise.equipment}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-3 text-[9px] text-[#777c87]">
          <span>◷ {exercise.duration} min</span>
          <span>🔥 {exercise.caloriesBurned} kcal</span>
          <span>★ {exercise.rating}</span>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">

          <button
            type="button"
            onClick={handleAddToPlan}
            className="flex-1 rounded-md bg-[#ccff00] px-3 py-2 text-[9px] font-bold uppercase text-black transition hover:opacity-80"
          >
            Add to Plan
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-md border border-[#3b3d43] px-3 py-2 text-[9px] font-bold uppercase text-white transition hover:bg-white hover:text-black"
          >
            Save
          </button>

        </div>

      </div>
    </article>
  );
}