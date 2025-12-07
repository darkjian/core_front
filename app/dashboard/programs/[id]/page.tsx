'use client';
import { listProgramWorkouts } from '@/services/workouts';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const dayNamesRu = {
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    saturday: 'Суббота',
    sunday: 'Воскресенье',
};

export default function ProgramPage() {
    const params = useParams();   // теперь params обычный объект, await не нужен
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const id = params.id;
    useEffect(() => {

        async function fetchWorkouts() {
            try {
                const data = await listProgramWorkouts(id);
                setData(data);
                console.log(data);
            }
            catch (err) {
                console.log('fetching workouts programs:', err);
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