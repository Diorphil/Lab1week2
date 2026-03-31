"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "./auth-context";
import React from 'react';
import { useSession } from 'next-auth/react'; // Assuming you're using next-auth for authentication

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const auth = useUserAuth();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!auth?.user) {
      router.push("/week-8/login"); // adjust path
    }
  }, [auth?.user, router]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Loading state
  }

  if (!session) {
    return <div>You must be logged in to view this page.</div>; // Redirect or message for unauthenticated users
  }

  return <>{children}</>;
};

export default ProtectedRoute;