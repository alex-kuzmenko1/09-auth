import { nextServer } from "@/lib/api/api";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { Note } from "@/types/note";

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

interface NoteServiceProps {
  query: string;
  page: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchServerNotes = async ({
  query,
  page,
  tag,
}: NoteServiceProps) => {
  const cookieStore = await cookies();

  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: {
      tag,
      search: query,
      page,
      perPage: 12,
    },
  });
  return response.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};