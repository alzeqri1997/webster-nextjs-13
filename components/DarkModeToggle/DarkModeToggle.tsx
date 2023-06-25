"use client";
import styles from "./darkModeToggle.module.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <div className={styles.container} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <div className={styles.icon}>🌙</div>
      <div className={styles.icon}>🔆</div>
      <div
        className={styles.ball}
        style={theme === "light" ? { left: "2px" } : { right: "2px" }}
      ></div>
    </div>
  );
};

export default DarkModeToggle;
