'use client';

import ProgramMiniCard from "@/components/ProgramMiniCard";
import { listTemplatePrograms, listUserPrograms } from "@/services/programs";
import { useEffect, useState } from "react";

const listPrograms = (programs) => {
    return programs.map((program) => (
        <ProgramMiniCard key={program.id} program={program} />
    ))
}

export default function Programs() {
    const [programs, setPrograms] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [error, setError] = useState('');
    const [viewMode, setViewMode] = useState('my');

    useEffect(() => {
        async function fetchPrograms() {
            try {
                const data = await listUserPrograms();
                setPrograms(data.programs);
            }
            catch (err) {
                setError(err)
                console.log('fetching user programs:', err);
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
                console.log('fetching template programs:', err);
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