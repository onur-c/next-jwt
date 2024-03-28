"use client";

import { FormEvent } from "react";

export default function SignInPage() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
