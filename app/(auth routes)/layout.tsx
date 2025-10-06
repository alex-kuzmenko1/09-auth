import Link from "next/link";
import css from "./layout.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={css.authWrapper}>
      <div className={css.authContainer}>
        {children}
        <nav className={css.authNav}>
          <p>
            Already have an account?{" "}
            <Link href="/sign-in" className={css.link}>
              Sign In
            </Link>
          </p>
          <p>
            Don’t have an account yet?{" "}
            <Link href="/sign-up" className={css.link}>
              Sign Up
            </Link>
          </p>
        </nav>
      </div>
    </section>
  );
}
