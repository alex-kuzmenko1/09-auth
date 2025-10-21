import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { fetchServerNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params; 

  const note = await fetchServerNoteById(id);

  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `https://notehub.com/notes/${id}`,
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
}

export default async function NoteDetails({
  params,
}: {
  params: Params;
}) {
  const { id } = await params; 

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
