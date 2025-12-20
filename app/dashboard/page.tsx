'use client';
import WorkoutMiniCard from "@/components/WorkoutMiniCard";
import { useGetDailyWorkouts } from "@/hooks/queries/workouts";
import { FC } from "react";

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
    const { data: response, error, isLoading } = useGetDailyWorkouts();
    const currenWeekday = getCurrentDayOfWeek();

    if (isLoading) {
        return <div className="p-8 text-center">Загрузка...</div>;
    }

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

    const allWorkouts = response?.data?.flatMap((program) =>
        program.workouts.map((workout) => ({
            ...workout,
            program_name: program.program_name,
        }))
    ) || [];

    if (allWorkouts.length === 0) {
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
                {allWorkouts
                    .filter(workout => workout.day_of_week === currenWeekday)
                    .map((workout) => (
                        <WorkoutMiniCard
                            key={workout.id} workout={workout}
                            program={workout.program_name}
                             />
                    ))}
            </div>
            <div className="flex flex-col items-center justify-between md:items-start mb-5">
                <span className="text-sm md:text-lg text-gray-400 ">Предстоящие тренировки</span>
            </div>
            <div className="flex flex-col gap-3 md:items-start mb-5">
                {allWorkouts
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
                            program={workout.program_name}
                            isToday={workout.day_of_week === currenWeekday}
                        />
                    ))}
            </div>
        </>
    );
}

export default DashboardHome;