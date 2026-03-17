export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-6 py-16 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">ux-hell</p>
        <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
          Tervitus! oled kenasti ux-hell projekti tööle saanud.
        </h1>
        <p className="text-base text-zinc-600">
          Kui tahad, siis nüüd saad siit edasi UX-i looma hakata.
        </p>
      </main>
    </div>
  );
}
