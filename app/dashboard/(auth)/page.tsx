"use client";

import React, { FormEvent } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PostType } from "@/types";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args: any) =>
    fetch( ...[args]).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user?.name}`,
    fetcher
  );

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
  } else {
  }

  async function handleDelete(_id: string) {
    try {
      await fetch(`/api/posts/${_id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const title = target.postTitle.value as string;
    const desc = target.desc.value as string;
    const img = target.img.value as string;
    const content = target.content.value as string;

    const body = JSON.stringify({
      title,
      desc,
      img,
      content,
      username: session.data!.user!.name,
    })

    try {
      await fetch("/api/posts", {
        method: "POST",
        body ,
      }).then(() => {
        mutate();
        target.reset();
      }).catch((error)=>{
        console.clear()
        console.log('this is error', error)
      });
    } catch (error) {
      console.log(error);
    }
    // const title = event.target.title.value;
  }
  if (session.status === "authenticated") {
    const allPosts = data?.map((post: PostType) => (
      <div className={styles.post} key={post._id}>
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="post" width={200} height={100} />
        </div>
        <h2 className={styles.postTitle}>{post.title}</h2>
        <span className={styles.delete} onClick={() => handleDelete(post._id)}>
          X
        </span>
      </div>
    ));

    console.log('data', data)

    const posts = data ? allPosts : "no Posts yet";
    console.log(session.data.user?.name)

    return (
      <div className={styles.container}>
        <div className={styles.posts}>{isLoading ? "loading" : posts}</div>

        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input
            type="text"
            placeholder="Title"
            name="postTitle"
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Desc"
            name="desc"
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Image"
            name="img"
            className={styles.input}
          />
          <textarea
            className={styles.textArea}
            name="content"
            id="content"
            cols={30}
            rows={10}
          ></textarea>
          <button disabled={isLoading} className={styles.button}>
            {isLoading ? "wait a moment ..." : "Send"}
          </button>
        </form>
      </div>
    );
  }

  return;
};

export default Dashboard;
