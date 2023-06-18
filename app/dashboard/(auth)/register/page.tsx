"use client";
import React, { FormEvent, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {

    const [error, setError] = useState(null);

    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const target = e.target as any

        const name = target[0].value;
        const email = target[1].value;
        const password = target[2].value;


        try{
            const res = await fetch("/api/auth/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            res.status === 201 && router.push("/dashboard/login?success=Account has has been created");
        } catch(error){
            setError(error as any );
            console.log(error)
        }
    }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Create an Account </h1>
      <h2 className={styles.button}>Please sign up to see the dashboard.</h2>
      <form className={styles.form} onSubmit={handleSubmit}  >
        <input
          type="text"
          placeholder="Username"
          required
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
        />

        <input
          placeholder="password"
          type="password"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Register</button>
      </form>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href={"/dashboard/login"}>
        You have an account ? login
      </Link>
    </div>
  );
};

export default Register;
