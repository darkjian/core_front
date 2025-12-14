'use client';
import WorkoutMiniCard from "@/components/WorkoutMiniCard";
import { listDailyWorkouts } from "@/services/workouts";
import { useEffect, useState, FC } from "react";

interface DailyWorkouts {
    workouts: Array<{
        id: string | number;
        title: string;
        day_of_week: string;
    }>;
    program_name: string;
}

function getCurrentDayOfWeek(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    const dayName = date.toLocaleDateString('en-US', options);
    return dayName.toLowerCase();
}

const dayOfWeekOrder: Record<string, number> = {
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6,
    'sunday': 7,
};

const DashboardHome: FC = () => {
    const [workouts, setWorkouts] = useState<DailyWorkouts | null>(null);
    const [error, setError] = useState<string>('');
    const currenWeekday = getCurrentDayOfWeek();

    useEffect(() => {
        async function fetchDailyWorkouts() {
            try {
                const data = await listDailyWorkouts();
                setWorkouts(data);
            }
            catch (err) {
                setError(err)
                console.log('fetching daily workouts:', err.message );
            }
        }
        fetchDailyWorkouts();
    }, []);

    if (error) {
        return (
            <>
                <div className="flex flex-col items-center justify-between md:items-start mb-5">
                    <span className="text-2xl md:text-3xl text-gray-700 font-black">Тренировки</span>
                </div>
                <span className="text-sm pt-64 flex justify-center text-red-400">ошибка подключения к серверу</span>
            </>
        );
    }

    if (!workouts || workouts.workouts.length === 0) {
        return (
            <>
                <div className="flex flex-col items-center justify-between md:items-start mb-5">
                    <span className="text-2xl md:text-3xl text-gray-700 font-black">Тренировки</span>
                </div>
                <span className="text-sm pt-64 flex justify-center text-gray-400">тренировок нет</span>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col items-center justify-between md:items-start mb-5">
                <span className="text-2xl md:text-3xl text-gray-700 font-black">Тренировки</span>
            </div>
            <div className="flex flex-col gap-3 md:items-start mb-5">
                {workouts.workouts
                    .filter(workout => workout.day_of_week === currenWeekday)
                    .map((workout) => (
                        <WorkoutMiniCard
                            key={workout.id} workout={workout}
                            program={workouts.program_name}
                             />
                    ))}
            </div>
            <div className="flex flex-col items-center justify-between md:items-start mb-5">
                <span className="text-sm md:text-lg text-gray-400 ">Предстоящие тренировки</span>
            </div>
            <div className="flex flex-col gap-3 md:items-start mb-5">
                {workouts.workouts
                    .filter(workout => workout.day_of_week !== currenWeekday)
                    .sort((a, b) => {
                        const dayA = a.day_of_week.toLowerCase();
                        const dayB = b.day_of_week.toLowerCase();
                        return dayOfWeekOrder[dayA] - dayOfWeekOrder[dayB];
                    })
                    .map((workout) => (
                        <WorkoutMiniCard
                            key={workout.id}
                            workout={workout}
                            program={workouts.program_name}
                            isToday={workout.day_of_week === currenWeekday}
                        />
                    ))}
            </div>
        </>
    );
}

export default DashboardHome;