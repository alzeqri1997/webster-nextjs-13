import React from "react";
import styles from "./page.module.css";
import { ItemsType, items } from "./data";
import { notFound } from "next/navigation";
import Button from "@/components/Button/Button";

const getData = (cat: string) => {
  const data = items[cat as keyof ItemsType];

  if (data) {
    return data;
  }

  return notFound();
};

const Category = ({ params }: { params: { category: string } }) => {
  const data = getData(params.category);
  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{params.category}</h1>
      {data.map((item) => (
        <div className={styles.item} key={item.id}>
          <h2 className={styles.title}>{item.title}</h2>
          <p className={styles.desc}> {item.desc} </p>
          <Button text="See More" url="#" />
        </div>
      ))}
    </div>
  );
};

export default Category;
