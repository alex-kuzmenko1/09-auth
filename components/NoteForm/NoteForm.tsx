'use client';
import React, { useState, useEffect } from 'react';
import { useNoteStore } from '@/lib/store/noteStore';
import { FormValues, NoteTag, TagList } from '@/types/note';

const tagOptions: TagList = ["All", "Work", "Personal", "Ideas", "Other"];

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [formValues, setFormValues] = useState<FormValues>(draft);

  useEffect(() => {
    setFormValues(draft);
  }, [draft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setDraft({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting note:", formValues);
    clearDraft(); // очищаем форму после отправки
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input name="title" value={formValues.title} onChange={handleChange} />
      </div>

      <div>
        <label>Content</label>
        <textarea name="content" value={formValues.content} onChange={handleChange} />
      </div>

      <div>
        <label>Tag</label>
        <select name="tag" value={formValues.tag} onChange={handleChange}>
          {tagOptions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <button type="submit">Save</button>
    </form>
  );
}
