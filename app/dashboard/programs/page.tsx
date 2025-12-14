'use client';

import ProgramMiniCard from "@/components/ProgramMiniCard";
import { listTemplatePrograms, listUserPrograms } from "@/services/programs";
import { useEffect, useState, FC, ReactNode } from "react";

interface Program {
    id: string | number;
    title: string;
    description: string;
    created_at: string | Date;
}

const listPrograms = (programs: Program[]): ReactNode[] => {
    return programs.map((program) => (
        <ProgramMiniCard key={program.id} program={program} />
    ))
}

const Programs: FC = () => {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [templates, setTemplates] = useState<Program[]>([]);
    const [error, setError] = useState<string>('');
    const [viewMode, setViewMode] = useState<'my' | 'templates'>('my');

    useEffect(() => {
        async function fetchPrograms() {
            try {
                const data = await listUserPrograms();
                setPrograms(data.programs);
            }
            catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки программ';
                setError(errorMessage);
                console.error('fetching user programs:', err);
            }
        }
        if (viewMode === 'my') {
            fetchPrograms();
        }
    }, [viewMode]);

    useEffect(() => {
        async function fetchTemplatePrograms() {
            try {
                const data = await listTemplatePrograms();
                setPrograms(data.programs);
                setViewMode('templates');
            }
            catch (err) {
                console.error('fetching template programs:', err);
            }
        }
        if (viewMode === 'templates') {
            fetchTemplatePrograms();
        }

    }, [viewMode])

    if (error) {
        return (
            <>
                <h3 className="text-2xl md:text-3xl text-gray-700 font-black mb-5">Программы тренировок</h3>
                <span className="text-sm pt-64 flex justify-center text-red-400">ошибка подключения к серверу</span>
            </>
        );
    }

    if (programs.length === 0) {
        return (
            <>
                <h3 className="text-2xl md:text-3xl text-gray-700 font-black mb-5">Программы тренировок</h3>
                <span className="text-sm pt-64 flex justify-center text-gray-400">у вас пока нет созданных программ</span>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col items-center md:items-start">
                <h3 className="text-2xl md:text-3xl text-gray-700 font-black mb-5">Программы</h3>
            </div>
            <div className="flex flex-col md:items-start gap-3">
                {listPrograms(programs)}
            </div >
        </>
    );
}

export default Programs;