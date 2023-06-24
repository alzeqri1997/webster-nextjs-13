"use client";
import styles from "./darkModeToggle.module.css";
import { useThemeProvider } from "@/context/ThemeContext";
import { ThemeProviderType } from "@/types";

const DarkModeToggle = () => {
  const {mode, toggle} = useThemeProvider() as ThemeProviderType;
  return (
    <div className={styles.container} onClick={toggle} >
      <div className={styles.icon}>🌙</div>
      <div className={styles.icon}>🔆</div>
      <div
        className={styles.ball}
        style={mode === "light" ? { left: "2px" } : { right: "2px" }}
      ></div>
    </div>
  );
};

export default DarkModeToggle;
