"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "@/styles/login/loginForm/loginForm.module.css"; // Pastikan path-nya benar

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Reset error

    const result = await signIn("credentials", {
      redirect: false, // Jangan redirect otomatis
      username,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else if (result?.ok) {
      // Redirect to a protected page after successful login
      window.location.href = "/dashboard";
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default LoginForm;
