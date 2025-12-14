'use client';
import { register } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState, FC, FormEvent } from "react";

const RegisterForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
            await register({ email: trimmedEmail, password: trimmedPassword })
            router.push('/auth/login');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Ошибка регистрации';
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
                        Register
                    </h1>

                    <form onSubmit={handleOnSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={email}
                            placeholder="Почта"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            disabled={loading}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            value={password}
                            placeholder="Пароль"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            disabled={loading}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                            disabled={loading}
                        >
                            Зарегистрироваться
                        </button>
                    </form>
                    {error && <p className="py-4 text-center text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;