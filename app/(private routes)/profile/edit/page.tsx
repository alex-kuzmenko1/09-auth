"use client";

import css from "./page.module.css";
import Image from "next/image";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/api/serverApi";
import { api } from "@/lib/api/api";

export default function EditProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/avatar.png");

  useEffect(() => {
    (async () => {
      const user = await getProfile();
      if (user) {
        setUsername(user.username || "");
        setEmail(user.email);
        setAvatar(user.avatar || "/avatar.png");
      }
    })();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api.patch("/users/me", { username });
    router.push("/profile");
  };

  const handleCancel = () => router.push("/profile");

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={css.input}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" onClick={handleCancel} className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
