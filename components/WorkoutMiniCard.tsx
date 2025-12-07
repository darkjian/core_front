import Link from "next/link";

const daysOfWeekMap = {
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6,
    'sunday': 0,
};
const russianDaysShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export default function WorkoutMiniCard({ workout, program, isToday }) {
    const dayIndex = daysOfWeekMap[workout.day_of_week.toLowerCase()];
    const weekday = russianDaysShort[dayIndex];

    return (
        <Link className={`bg-white drop-shadow-lg rounded-2xl p-3 min-w-xs`}
            href={`/dashboard/workouts/${workout.id}?workout_title=${workout.title}`}>

            <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-sm font-bold line-clamp-1">{workout.title}</span>
                <span className={`text-xs  ${isToday ? 'text-indigo-600' : 'text-gray-500'}`}>{isToday ? 'сегодня' : `${weekday}`}</span>
            </div>
            <span className="text-gray-500 text-xs line-clamp-1">{program}</span>
        </Link>
    );
};