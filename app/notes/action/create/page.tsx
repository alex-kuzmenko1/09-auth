import type { Metadata } from "next";
import NoteFormClient from "../../../../components/NoteForm/NoteformClient";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create note — NoteHub",
  description: "Створіть нову нотатку в NoteHub",
  openGraph: {
    title: "Create note — NoteHub",
    description: "Створіть нову нотатку в NoteHub",
    url: "https://07-routing-nextjs-silk-five.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteFormClient />
      </div>
    </main>
  );
}
