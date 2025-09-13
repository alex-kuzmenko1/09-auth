import { headers } from "next/headers";
import React from "react";
import css from "./ProfilePage.module.css";
import { serverApi } from "@/lib/api/serverApi";
import { User } from "@/types/user";

export default async function ProfilePage() {
  try {
    const h = await headers(); 
    const cookieHeader = h.get("cookie") ?? "";

   
    const user: User | null = await serverApi.getSession(cookieHeader);

    return (
      <main className={css.mainContent}>
        <h1 className={css.title}>Profile</h1>

        {user ? (
          <>
            <p className={css.text}>
              <strong>ID:</strong> {user.id}
            </p>
            <p className={css.text}>
              <strong>Email:</strong> {user.email}
            </p>
            {user.name && (
              <p className={css.text}>
                <strong>Name:</strong> {user.name}
              </p>
            )}
          </>
        ) : (
          <p className={css.text}>Not logged in</p>
        )}
      </main>
    );
  } catch (err) {
    console.error("ProfilePage error:", err);
    return (
      <main className={css.mainContent}>
        <h1 className={css.title}>Profile</h1>
        <p className={css.text}>Error loading profile</p>
      </main>
    );
  }
}
