"use client";

import { useState } from "react";
import NoteForm from "./NoteForm";

export default function NoteFormClient() {
  const [isFormOpen, setIsFormOpen] = useState(true);

  const handleClose = () => setIsFormOpen(false);

  if (!isFormOpen) return null;

  return <NoteForm onClose={handleClose} />;
}
