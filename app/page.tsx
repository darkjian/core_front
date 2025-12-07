import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center">
      <div className="mx-auto max-2-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 lg:py-20">
          <section className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">Заголовок</h1>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl lg:text-2xl">Быстро, красиво, без лишних библиотек</p>
            <Button asChild size="lg" className="mt-8 bg-indigo-600 hover:bg-indigo-700">
              <Link href="/auth/login">
                Начать сейчас
              </Link>
            </Button>
          </section>
        </div>
      </div>
    </main>
  );
}
