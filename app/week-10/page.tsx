"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth() || {};

  const handleSignIn = async () => {
    try {
      if (gitHubSignIn) {
        await gitHubSignIn();
      }
    } catch (err) {
      console.error("sign in failed", err);
    }
  };

  const handleSignOut = async () => {
    try {
      if (firebaseSignOut) {
        await firebaseSignOut();
      }
    } catch (err) {
      console.error("sign out failed", err);
    }
  };

  if (!user) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the App</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSignIn}
        >
          Login with GitHub
        </button>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-2">
        Welcome, {user.displayName} ({user.email})
      </p>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded mr-4"
        onClick={handleSignOut}
      >
        Logout
      </button>
      <Link
        href="/week-10/shopping-list/"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Go to Shopping List
      </Link>
    </main>
  );
}
