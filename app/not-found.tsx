import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found — NoteHub",
  description:
    "Сторінка не знайдена. Можливо, нотатку видалено або URL неправильний.",
  openGraph: {
    title: "Page not found — NoteHub",
    description:
      "Сторінка не знайдена. Можливо, нотатку видалено або URL неправильний.",
    url: "https://07-routing-nextjs-silk-five.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main>
      <h1>404 — Page not found</h1>
      <p>На жаль, такої сторінки не існує.</p>
    </main>
  );
}
