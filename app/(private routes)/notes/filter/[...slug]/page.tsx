import { fetchServerNotes } from "@/lib/api/serverApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Filter ${slug[0]}`,
    description: `Notes that are filtred by ${slug[0]} filter`,
    openGraph: {
      title: `Filter ${slug[0]}`,
      description: `Notes that are filtred by ${slug[0]} filter`,
      url: `https://notehub.com/notes/filter/${slug[0]}`,
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

export default async function Notes({ params }: Props) {
  const query = "";
  const page = 1;
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0] == "All" ? undefined : slug[0];
  await queryClient.prefetchQuery({
    queryKey: ["note", query, page, tag],
    queryFn: () => fetchServerNotes({ query, page, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}