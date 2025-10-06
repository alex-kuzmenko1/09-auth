import "./globals.css";
import { AuthProvider } from "../components/AuthProvider/AuthProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth App",
  description: "Next.js authentication demo with cookies and protected routes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
