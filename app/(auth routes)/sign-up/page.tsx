"use client";
import css from "./SignUpPage.module.css";
import { RegisterRequest, register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
     
      const formObj = Object.fromEntries(formData) as Record<string, FormDataEntryValue>;

      const user: RegisterRequest = {
        email: formObj.email?.toString() ?? "",
        password: formObj.password?.toString() ?? "",
        username: formObj.username?.toString() ?? "",
      };

      const res = await register(user);

      setUser(res);
      router.push("/profile");
    } catch (err: unknown) {
      const e = err as {
        response?: { data?: { error?: string; message?: string } };
        message?: string;
      };
      setError(
        e.response?.data?.error ??
          e.response?.data?.message ??
          e.message ??
          "Oops... some error"
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
