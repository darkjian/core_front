'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC, ReactNode } from "react";

interface NavItem {
    name: string;
    href: string;
}

interface AuthLayoutProps {
    children: ReactNode;
}

const navItems: NavItem[] = [
    { name: 'Главная', href: '/' },
    { name: 'Регистрация', href: '/auth/register' },
    { name: 'Логин', href: '/auth/login' },
];

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    return (
        <>
            <header className="bg-white shadow-sm border-b border-gray-200">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-left items-center h-16 space-x-8">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                      px-3 py-2 rounded-md text-sm font-medium transition
                      ${isActive
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                                        }
                    `}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </>
    );
}

export default AuthLayout;