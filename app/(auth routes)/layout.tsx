"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    router.refresh();
    setLoading(false);
  }, [router]); 

  return <>{loading ? <div>Loading ...</div> : children}</>;
}
