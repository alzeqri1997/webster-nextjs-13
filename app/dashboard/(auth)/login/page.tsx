"use client";
import React, { FormEvent, useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

const Login = ({ url }: { url: string }) => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as any;

    const email = target[0].value;
    const password = target[1].value;

    signIn("credentials",{
      email,
      password,
    })
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> {success ? success : "Welcome Back"} </h1>
      <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          required
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Login
        </button>

        <span style={{color: "red"}} >{error && error.split(':')[1]}</span>
      </form>

      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/register">
        Create new account
      </Link>
    </div>
  );
};

export default Login;
