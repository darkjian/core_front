// components/LoginForm.js
'use client';

import { login } from '@/services/auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, FC, FormEvent } from 'react';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const fromUrl = searchParams.get('from');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            setError('Заполните все поля');
            setLoading(false);
            return;
        }

        try {
            await login({ email: trimmedEmail, password: trimmedPassword });
            const redirectTo = fromUrl?.startsWith('/dashboard') ? fromUrl : '/dashboard';
            router.push(redirectTo);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Ошибка входа';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                    <h1 className="text-3xl font-extrabold text-center text-gray-900">
                        Вход
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={loading}
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={loading}
                        />

                        <div className="flex gap-3 justify-between items-center pt-4">
                            <Link
                                href="/auth/register"
                                className="text-indigo-600 hover:text-indigo-700 font-medium transition"
                            >
                                Регистрация
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Вход...' : 'Войти'}
                            </button>
                        </div>
                    </form>

                    {error && <p className="py-4 text-center text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default LoginForm;