import css from "./not-found.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not-found page",
  description: "Sorry but there isn`t such a page.",
  openGraph: {
    title: "Not-found page",
    description:
      "Sorry, but this page isn`t found. Please, return to the last page.",
    url: "https://notehub.com/notes/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub image",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}