import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams?: { page?: string; query?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug[0] === "All" ? "All Notes" : slug[0];

  return {
    title: `NoteHub — ${filter}`,
    description: `Перегляд нотаток із категорії: ${filter}.`,
    openGraph: {
      title: `NoteHub — ${filter}`,
      description: `Список нотаток у категорії: ${filter}.`,
      url: `https://07-routing-nextjs-silk-five.vercel.app/notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Notes Filter",
        },
      ],
    },
  };
}

export default async function Notes({ params, searchParams }: Props) {
  const { slug } = await params;

  const page = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  const filter = slug[0] === "All" ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, query, filter],
    queryFn: () => fetchNotes(page, 12, query, filter),
    staleTime: 1000 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient filter={filter} />
    </HydrationBoundary>
  );
}
