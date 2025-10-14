"use client";
import css from "./page.module.css";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

import { fetchNotes } from "@/lib/api/clientApi";

type Props = {
  tag: string | undefined;
};

export default function NotesClient({ tag }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { data } = useQuery({
    queryKey: ["notes", query, page, tag],
    queryFn: () => fetchNotes({ query, page, tag }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      setPage(1);
    },
    1000
  );
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleChange} />
        {data && totalPages > 1 && (
          <Pagination
  pageCount={totalPages}
  forcePage={page - 1} 
  onPageChange={({ selected }) => setPage(selected + 1)}
/>

        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {data && <NoteList notes={data.notes}></NoteList>}
    </div>
  );
}