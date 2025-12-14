'use client';
import { listWorkoutExercises } from "@/services/workouts";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, FC } from "react";

interface Exercise {
    id: string | number;
    title: string;
}

const Workouts: FC = () => {
    const workoutId = useParams()?.id as string | number;
    const workoutTitle = useSearchParams().get('workout_title');
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {

        async function fetchWorkoutExercises() {
            try {
                const data = await listWorkoutExercises(workoutId);
                setExercises(data);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки упражнений';
                setError(errorMessage);
                console.error('fetching workout exercises:', error);
            }
        }

        fetchWorkoutExercises();
    }, []);

    if (error) {
        return (
            <>
                <div className="flex flex-col items-center justify-between md:items-start mb-5">
                    <span className="text-2xl md:text-3xl text-gray-700 font-black">Тренировка: {workoutTitle}</span>
                </div>
                <span className="text-sm pt-64 flex justify-center text-red-400">ошибка подключения к серверу</span>
            </>
        );
    }

    if (exercises.length === 0) {
        return (
            <>
                <div className="flex flex-col items-center justify-between md:items-start mb-5">
                    <span className="text-2xl md:text-3xl text-gray-700 font-black">Тренировка: {workoutTitle}</span>
                </div>
                <span className="text-sm pt-64 flex justify-center text-gray-400">упражнения нет</span>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col items-center md:items-start">
                <h3 className="text-2xl md:text-3xl text-gray-700 font-black mb-5">Тренировка: {workoutTitle}</h3>
            </div>
            <div className="flex flex-col md:items-start gap-3">
                {exercises.map((exercise) => (
                    <div>
                        <span>{exercise.id}</span>
                        <span>{exercise.title}</span>
                    </div>
                ))}
            </div >
        </>
    )
}

export default Workouts;