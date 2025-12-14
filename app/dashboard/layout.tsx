
'use client';

import { BicepsFlexed, Home, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC, ReactNode } from 'react';

interface NavItem {
    href: string;
    name: string;
    icon: ReactNode;
}

interface DashboardLayoutProps {
    children: ReactNode;
}

const navItems: NavItem[] = [
    { href: '/dashboard', name: 'Home', icon: <Home className="h-5 w-5" /> },
    { href: '/dashboard/programs', name: 'Programs', icon: <BicepsFlexed className="h-5 w-5" /> },
    { href: '/dashboard/settings', name: 'Settings', icon: <Settings className="h-5 w-5" /> },
    { href: '/dashboard/profile', name: 'Profile', icon: <User className="h-5 w-5" /> },
];

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    return (
        <>
            {/* Mobile bottom bar */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-white/95 backdrop-blur-sm border-t border-gray-200 md:hidden">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 py-3 px-2 flex-1 text-xs font-medium transition-all duration-200 ${isActive
                                ? 'text-indigo-600'
                                : 'text-gray-500 hover:text-indigo-600'
                                }`}
                        >
                            <div className={`transition-transform ${isActive ? 'scale-110' : ''}`}>
                                {item.icon}
                            </div>
                            <span className={isActive ? 'font-semibold' : ''}>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Desktop sidebar */}
            <nav className="fixed left-0 top-0 hidden h-full w-64 flex-col bg-white border-r border-gray-200 md:flex">
                <div className="flex-1 space-y-1 p-4 pt-20">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${isActive
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                                    }`}
                            >
                                <div className={isActive ? '' : 'text-gray-500 group-hover:text-indigo-600'}>
                                    {item.icon}
                                </div>
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <div className="min-h-screen bg-gray-50">
                <div className="pb-16 md:pb-0 md:pl-64">
                    <main className="transition-all duration-300 ease-in-out mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}

export default DashboardLayout;