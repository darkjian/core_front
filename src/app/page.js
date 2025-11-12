export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center">
      <div className="mx-auto max-2-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 lg:py-20">
          <section className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">Заголовок</h1>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl lg:text-2xl">Быстро, красиво, без лишних библиотек</p>
            <a className="
              mt-8
              text-white
              inline-block
              rounded-lg
              bg-indigo-600
              px-6 py-3
              shadow-md
              hover:bg-indigo-700
              focus:outline-none focus:ring-2 
              focus:ring-indigo-500 focus:ring-offset-2
              sm:px-8 sm:py-4 sm:text-lg
            "
              href="/auth/login">
              Начать сейчас
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
