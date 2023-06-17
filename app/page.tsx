import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
          Better design for your digital products.
        </h1>
      </div>
    </div>
  );
}
