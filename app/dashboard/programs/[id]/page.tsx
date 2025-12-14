'use client';
import { listProgramWorkouts } from '@/services/workouts';
import { useParams } from 'next/navigation';
import { useEffect, useState, FC } from 'react';

interface ProgramData {
    program_name: string;
    workouts: Array<unknown>;
}

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
    const params = useParams();   // теперь params обычный объект, await не нужен
    const [data, setData] = useState<ProgramData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const id = params?.id as string | number;
    useEffect(() => {

        async function fetchWorkouts() {
            try {
                const data = await listProgramWorkouts(id);
                setData(data);
                console.log(data);
            }
            catch (err) {
                console.error('fetching workouts programs:', err instanceof Error ? err.message : err);
            } finally {
                setLoading(false);
            }
        }

        fetchWorkouts();
    }, [id]);


    if (loading) return <div className="p-8 text-center">Загрузка...</div>;
    if (!data) return <div>Ошибка загрузки</div>;

    const { program_name, workouts } = data;


    return (
        <>Hello</>
    )

}

export default ProgramPage;