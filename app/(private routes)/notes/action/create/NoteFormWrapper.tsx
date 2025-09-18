"use client";

import NoteForm from "@/components/NoteForm/NoteForm";
import { useRouter } from "next/navigation";

export default function NoteFormWrapper() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/notes/filter/All");
  };

  return <NoteForm onClose={handleClose} />;
}
