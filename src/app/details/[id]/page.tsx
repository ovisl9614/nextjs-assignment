"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


const DetailsPage = () => {
    const params = useParams();


    const id = params.id;

    const [exercise, setExercise] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExercise = async () => {

            try{

                const response = await fetch(
                    `https://api.abcz.workers.dev/api/fitlog/${id}`
                );

                const data = await response.json();

                setExercise(data);
            } catch (error) {
                console.log("Error:", error);
            } finally {
                setLoading(false);
            }


            };
        fetchExercise();
}, [id]);

if (loading) {
    return (
        <div className="min-h-screen bg-[#0d0f0e] text-white flex items-center justify-center">
            <p>Loading workout...</p></div>

    );
}

    return (
        <main className="min-h-screen bg-[#0d0f0e] text-white">
            <h1>{exercise.name}</h1></main>

    );
};

export default DetailsPage;
