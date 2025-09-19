import NoteFormWrapper from "./NoteFormWrapper";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New note",
  description: "Here you can add a new note and save it for later reference",
  openGraph: {
    title: "New note",
    description: "Here you can add a new note and save it for later reference",
    url: "https://notehub.versel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteFormWrapper /> {}
      </div>
    </main>
  );
}
