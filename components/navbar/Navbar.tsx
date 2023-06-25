"use client";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const session = useSession();
  const [showMenu, setShowMenu] = useState<boolean>(false)
  return (
    <div className={styles.container}>
      <Link href={"/"} className={styles.logo}>
        Webster
      </Link>
      <button className={styles.button}>
        <svg  width="18" height="14" viewBox="0 0 18 14" aria-hidden="true" data-type="type-1"> <rect fill="currentColor" y="0.00" width="18" height="1.7" rx="1"></rect> <rect fill="currentColor" y="6.15" width="18" height="1.7" rx="1"></rect> <rect fill="currentColor" y="12.3" width="18" height="1.7" rx="1"></rect> </svg>
      </button>
      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" ?
          <button onClick={() => signOut()} className={styles.logout}>LogOut</button> :
          <button onClick={() => signIn()} className={styles.logout}>login</button>
        }
      </div>
    </div>
  );
};

export default Navbar;
