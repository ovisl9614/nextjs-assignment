"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

import {
  getStoredExercises,
  removeExercise,
  PLAN_KEY,
  SAVED_KEY,
  type StoredExercise,
} from "@/lib/exercise-storage";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<Tab>("plan");

  const [exercises, setExercises] = useState<StoredExercise[]>([]);

  // Load exercises 
  useEffect(() => {
    const loadExercises = () => {
      const key =
        activeTab === "plan"
          ? PLAN_KEY
          : SAVED_KEY;

      setExercises(getStoredExercises(key));
    };

    loadExercises();

    window.addEventListener(
      "fitlog-storage-change",
      loadExercises
    );

    return () => {
      window.removeEventListener(
        "fitlog-storage-change",
        loadExercises
      );
    };
  }, [activeTab]);



  // Remove exercise


  const handleRemove = (id: number) => {
    const key =
      activeTab === "plan"
        ? PLAN_KEY
        : SAVED_KEY;

    removeExercise(key, id);



    // Update page immediately

    setExercises((current) =>
      current.filter((exercise) => exercise.id !== id)
    );

    if (activeTab === "plan") {
      toast.info("Removed from today's plan");
    } else {
      toast.info("Removed from saved");
    }
  };


  // Statistics

  const totalExercises = exercises.length;

  const totalMinutes = exercises.reduce(
    (total, exercise) =>
      total + Number(exercise.duration || 0),
    0
  );

  const totalCalories = exercises.reduce(
    (total, exercise) =>
      total + Number(exercise.caloriesBurned || 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#0b0c0e] px-4 py-10 text-white sm:px-6 lg:px-10">

      <div className="mx-auto w-full max-w-[1200px]">



        <div className="mb-6">
          <h1 className="text-2xl font-black uppercase">
            My Plan
          </h1>

          <p className="mt-1 text-[10px] text-[#777c87]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>


    
        <div className="mb-6 grid grid-cols-3 overflow-hidden rounded-xl border border-[#252932] bg-[#15171c]">

          <div className="px-4 py-5">
            <p className="text-[9px] uppercase text-[#777c87]">
              Exercises
            </p>

            <p className="mt-1 text-xl font-black text-[#ccff00]">
              {totalExercises}
            </p>
          </div>


          <div className="border-l border-[#252932] px-4 py-5">
            <p className="text-[9px] uppercase text-[#777c87]">
              Minutes
            </p>

            <p className="mt-1 text-xl font-black text-white">
              {totalMinutes}
            </p>
          </div>


          <div className="border-l border-[#252932] px-4 py-5">
            <p className="text-[9px] uppercase text-[#777c87]">
              Calories
            </p>

            <p className="mt-1 text-xl font-black text-white">
              {totalCalories}
            </p>
          </div>

        </div>




        <div className="mb-5 flex w-fit rounded-md border border-[#252932] bg-[#15171c] p-1">

          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded px-4 py-2 text-[9px] font-bold uppercase transition ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black"
                : "text-[#777c87] hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>


          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded px-4 py-2 text-[9px] font-bold uppercase transition ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "text-[#777c87] hover:text-white"
            }`}
          >
            Saved
          </button>

        </div>



        {exercises.length === 0 ? (

          <div className="rounded-xl border border-[#252932] bg-[#15171c] px-6 py-16 text-center">

            <p className="text-sm font-bold uppercase text-white">
              {activeTab === "plan"
                ? "Your plan is empty"
                : "No saved workouts"}
            </p>

            <p className="mt-2 text-xs text-[#777c87]">
              {activeTab === "plan"
                ? "Add workouts from the library."
                : "Save workouts from the details page."}
            </p>

            <Link
              href="/#library"
              className="mt-5 inline-block rounded-md bg-[#ccff00] px-5 py-3 text-[9px] font-bold uppercase text-black"
            >
              Browse Workouts
            </Link>

          </div>

        ) : (

          <div className="space-y-3">

            {exercises.map((exercise) => (

              <div
                key={exercise.id}
                className="flex items-center gap-4 rounded-xl border border-[#252932] bg-[#15171c] p-3"
              >

                {/* IMAGE */}

                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="h-16 w-20 rounded-lg object-cover"
                />


                {/* INFO */}

                <div className="min-w-0 flex-1">

                  <h2 className="truncate text-sm font-black uppercase text-white">
                    {exercise.name}
                  </h2>

                  <p className="mt-1 text-[9px] text-[#777c87]">
                    {exercise.equipment}
                  </p>


                  <div className="mt-2 flex flex-wrap gap-3 text-[8px] text-[#a5aaaf]">

                    <span>
                      ● {exercise.duration} min
                    </span>

                    <span>
                      ● {exercise.caloriesBurned} kcal
                    </span>

                    <span>
                      ★ {exercise.rating}
                    </span>

                  </div>

                </div>


                {/* VIEW DETAILS */}

                <Link
                  href={`/details/${exercise.id}`}
                  className="hidden rounded-md border border-[#30343d] px-4 py-2 text-[8px] font-bold uppercase text-white transition hover:border-[#ccff00] hover:text-[#ccff00] sm:block"
                >
                  View Details
                </Link>


                

                <button
                  onClick={() =>
                    handleRemove(exercise.id)
                  }
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#777c87] transition hover:bg-red-500/10 hover:text-red-400"
                  aria-label="Remove exercise"
                >
                  ×
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}