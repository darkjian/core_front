'use client';

import ProgramMiniCard from "@/components/ProgramMiniCard";
import { useGetUserPrograms, useGetTemplatePrograms } from "@/hooks/queries";
import type { Program } from "@/types";
import { FC, ReactNode, useState } from "react";

const listPrograms = (programs: Program[]): ReactNode[] => {
    return programs.map((program) => (
        <ProgramMiniCard key={program.id} program={program} />
    ))
}

const Programs: FC = () => {
    const [viewMode, setViewMode] = useState<'my' | 'templates'>('my');

    // TanStack Query автоматически кэширует результаты
    const userPrograms = useGetUserPrograms();
    const templatePrograms = useGetTemplatePrograms();

    // Выбираем данные в зависимости от режима
    const isLoadingMy = viewMode === 'my' && userPrograms.isLoading;
    const isLoadingTemplates = viewMode === 'templates' && templatePrograms.isLoading;
    const isLoading = isLoadingMy || isLoadingTemplates;

    const error = viewMode === 'my' ? userPrograms.error : templatePrograms.error;
    const programs = viewMode === 'my'
        ? userPrograms.data?.programs || []
        : templatePrograms.data?.programs || [];

    if (isLoading) {
        return <div className="p-8 text-center">Загрузка программ...</div>;
    }

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
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setViewMode('my')}
                        className={`px-4 py-2 rounded ${
                            viewMode === 'my'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Мои программы
                    </button>
                    <button
                        onClick={() => setViewMode('templates')}
                        className={`px-4 py-2 rounded ${
                            viewMode === 'templates'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Шаблоны
                    </button>
                </div>
            </div>
            <div className="flex flex-col md:items-start gap-3">
                {listPrograms(programs)}
            </div>
        </>
    );
}

export default Programs;