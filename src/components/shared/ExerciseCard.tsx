"use client";

import Link from "next/link";
import React from "react";

// import {
//   addExercise,
//   PLAN_KEY,
//   SAVED_KEY,
// } from "@/lib/exercise-storage";

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

 

  return (
    <article className="overflow-hidden rounded-xl border border-[#252932] bg-[#15171c]">



      <Link href={`/details/${exercise.id}`}>

        <div className="h-[180px] w-full overflow-hidden cursor-pointer">
          <img
            src={exercise.image}
            alt={exercise.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        
        <div className="p-4">


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


          <h3 className="text-[12px] font-black uppercase text-white">
            {exercise.name}
          </h3>

        <p className="mt-1 text-[9px] text-[#777c87]">
            {exercise.equipment}
          </p>

          {/* Stats */}

          <div className="mt-4 flex items-center gap-3 text-[8px] text-[#777c87]">

            <span>◷ {exercise.duration} min</span>

            <span>🔥 {exercise.caloriesBurned} kcal</span>

            <span>★ {exercise.rating}</span>

          </div>

        </div>

      </Link>

  



    </article>
  );
}