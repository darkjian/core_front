'use client';
import { useGetProgramWorkouts } from '@/hooks/useGetProgramWorkouts';
import { useParams } from 'next/navigation';
import { FC } from 'react';

const dayOrder: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const dayNamesRu: Record<string, string> = {
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    saturday: 'Суббота',
    sunday: 'Воскресенье',
};

const ProgramPage: FC = () => {
    const params = useParams();
    const id = params?.id as string;
    const { data, loading, error } = useGetProgramWorkouts(id);

    if (loading) return <div className="p-8 text-center">Загрузка...</div>;
    if (error || !data) return <div>Ошибка загрузки</div>;

    const { program_name, workouts } = data;


    return (
        <>Hello</>
    )

}

export default ProgramPage;