"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import {
  PLAN_KEY,
  SAVED_KEY,
  addExercise,
  removeExercise,
  getStoredExercises,
  type StoredExercise,
} from "@/lib/exercise-storage";

const DetailsPage = () => {
  const params = useParams();

  const id = Number(params.id);

  const [exercise, setExercise] = useState<StoredExercise | null>(null);
  const [loading, setLoading] = useState(true);

  const [isInPlan, setIsInPlan] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Fetch exercise
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exercise");
        }

        const data = await response.json();

        setExercise(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  // Check Plan and Saved status
  useEffect(() => {
    if (!id) return;

  const planExercises = getStoredExercises(PLAN_KEY);
    const savedExercises = getStoredExercises(SAVED_KEY);

    const alreadyInPlan = planExercises.some(
      (item) => item.id === id
    );

    const alreadySaved = savedExercises.some(
      (item) => item.id === id
    );

    setIsInPlan(alreadyInPlan);
    setIsSaved(alreadySaved);
    
  }, [id]);

  // Add / Remove from Plan
  const handlePlan = () => {
    if (!exercise) return;

  if (isInPlan) {
      removeExercise(PLAN_KEY, exercise.id);

      setIsInPlan(false);

      toast.info("Removed from today's plan");
    } else {
      addExercise(PLAN_KEY, exercise);

      setIsInPlan(true);

      toast.success("Added to today's plan");
    }
  };


  const handleSave = () => {
    if (!exercise) return;

    if (isSaved) {
      removeExercise(SAVED_KEY, exercise.id);

      setIsSaved(false);

      toast.info("Removed from saved");
    } else {
      addExercise(SAVED_KEY, exercise);

      setIsSaved(true);

      toast.success("Added to saved");
    }
  };

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-[#0d0f0e] text-white flex items-center justify-center">
        <p>Loading workout...</p>
      </main>
    );
  }

  // Not found
  if (!exercise) {
    return (
      <main className="min-h-screen bg-[#0d0f0e] text-white flex items-center justify-center">
        <p>Workout not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0f0e] text-white">

       {/* Details Section  */}
      <section className="mx-auto max-w-[1200px] px-5 py-10">

        <div className="grid gap-8 md:grid-cols-2">

         
         
          <div>
            <img
              src={exercise.image}
              alt={exercise.name}
              className="h-[500px] w-full rounded-xl object-cover"
            />
          </div>



          <div>

            {/* Title */}
            <h1 className="text-4xl font-black uppercase">
              {exercise.name}
            </h1>

            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-gray-400">
              {exercise.description}
            </p>


            {/* Muscle Groups */}
            <div className="mt-4 flex flex-wrap gap-2">

              {exercise.muscleGroups?.map(
                (muscle, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black"
                  >
                    {muscle}
                  </span>
                )
              )}

            </div>

            

            <div className="mt-6 overflow-hidden rounded-xl border border-gray-800 bg-[#15191d]">

              {/* Equipment */}
              <div className="flex justify-between border-b border-gray-800 px-5 py-4">
                <span className="text-xs uppercase text-gray-500">
                  Equipment
                </span>

                <span className="text-sm">
                  {exercise.equipment}
                </span>
              </div>



              <div className="flex justify-between border-b border-gray-800 px-5 py-4">
                <span className="text-xs uppercase text-gray-500">
                  Difficulty
                </span>

                <span className="text-sm">
                  {exercise.difficulty}
                </span>
              </div>

              {/* Sets */}
              <div className="flex justify-between border-b border-gray-800 px-5 py-4">
                <span className="text-xs uppercase text-gray-500">
                  Sets
                </span>

                <span className="text-sm">
                  {exercise.sets}
                </span>
              </div>


              {/* Reps */}
              <div className="flex justify-between border-b border-gray-800 px-5 py-4">
                <span className="text-xs uppercase text-gray-500">
                  Reps</span>

                <span className="text-sm">
                  {exercise.reps}
                </span>
              </div>


              {/* Duration */}
              <div className="flex justify-between border-b border-gray-800 px-5 py-4">
                <span className="text-xs uppercase text-gray-500">
                  Duration
                </span>

                <span className="text-sm">
                  {exercise.duration} min
                </span>
              </div>

              {/* Calories */}
              <div className="flex justify-between border-b border-gray-800 px-5 py-4">
                <span className="text-xs uppercase text-gray-500">
                  Calories
                </span>

                <span className="text-sm">
                  {exercise.caloriesBurned} kcal
                </span>
              </div>

          
          {/* rating */}
              <div className="flex justify-between px-5 py-4">
                <span className="text-xs uppercase text-gray-500">
                  Rating
                </span>

                <span className="text-sm">
                  ⭐ {exercise.rating}
                </span>
              </div>

            </div>

          

            <div className="mt-7">

              <h2 className="text-sm font-black uppercase">
                Instructions
              </h2>

              <div className="mt-3 space-y-2 text-sm text-gray-400">

                {exercise.instructions?.map(
                  (instruction, index) => (
                    <p key={index}>
                      {index + 1}. {instruction}
                    </p>
                  )
                )}

              </div>

            </div>

          
            <div className="mt-7 flex flex-wrap gap-3">

          
              <button
                onClick={handlePlan}
                className={`rounded-md px-5 py-3 text-sm font-bold transition ${
                  isInPlan
                    ? "bg-gray-700 text-white"
                    : "bg-lime-400 text-black hover:bg-lime-300"
                }`}
              >
                {isInPlan
                  ? "✓ Added to today's plan"
                  : "Add to today's plan"}
              </button>

              {/* SAVE BUTTON */}
              <button
                onClick={handleSave}
                className={`rounded-md border px-5 py-3 text-sm transition ${
                  isSaved
                    ? "border-lime-400 text-lime-400"
                    : "border-gray-700 text-white hover:bg-gray-800"
                }`}
              >
                {isSaved
                  ? "♥ Saved"
                  : "♡ Save for later"}
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default DetailsPage;