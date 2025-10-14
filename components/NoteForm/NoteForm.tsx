"use client";

import c from "./NoteForm.module.css";

import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const queryClient = useQueryClient();

  type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  const handleAction = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as string;

    const newDraft = { title, content, tag: tag as (typeof TAGS)[number] };
    setDraft(newDraft);
    mutation.mutate(newDraft);
  };

  return (
    <form action={handleAction} className={c.form}>
      <div className={c.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          className={c.input}
        />
      </div>

      <div className={c.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          rows={8}
          defaultValue={draft.content}
          onChange={(e) => setDraft({ ...draft, content: e.target.value })}
          className={c.textarea}
        />
      </div>

      <div className={c.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          name="tag"
          defaultValue={draft.tag}
          onChange={(e) => setDraft({ ...draft, tag: e.target.value as Tag })}
          className={c.select}
        >
          {TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={c.actions}>
        <button
          type="button"
          onClick={() => router.back()}
          className={c.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={c.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}