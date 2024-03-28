"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch("/api/sign-in", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();

    if (data.success) {
      const nextUrl = searchParams.get("next");
      router.push(nextUrl ? nextUrl : "/");
    }
  };

  return (
    <>
      <h1>Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="border flex flex-col gap-2 w-fit p-2"
      >
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
