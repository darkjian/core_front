import Link from "next/link";
import type { FC } from "react";

interface Program {
    id: string | number;
    title: string;
    description: string;
    created_at: string | Date;
}

interface ProgramMiniCardProps {
    program: Program;
}

const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString(
        'ru-RU',
        {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })
}

const ProgramMiniCard: FC<ProgramMiniCardProps> = ({ program }) => {
    return (
        <Link className="group flex flex-col bg-white p-3
            drop-shadow-lg rounded-xl
            hover:bg-indigo-50
            min-w-xs
            transition-color duration-300
            "
            href={`/dashboard/programs/${program.id}`}>

            <span className="text-sm group-hover:text-indigo-600  text-gray-700 font-bold line-clamp-1">{program.title}</span>
            <span className="text-xs text-gray-600 line-clamp-1">{program.description}</span>
            <span className="text-xs text-gray-400 mt-2">{formatDate(program.created_at)}</span>

        </Link >
    );
};

export default ProgramMiniCard;