import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  const routes = [
    { title: "Home", path: "/" },
    { title: "Users", path: "/users" },
    { title: "About", path: "/about-us" },
    { title: "Contact", path: "/contact-us" },
  ];
  return (
    <nav className={styles['nav']}>
      <div className={styles["nav-links-container"]}>
        {routes.map((route) => (
          <Link key={route.title} href={route.path} className={styles['nav-link']}>
            {route.title}
          </Link>
        ))}
      </div>
      <div>
        <Link href='/login' ><button className={styles['btn']}>Login</button></Link>
      </div>
    </nav>
  );
}
