import styles from "./navbar.module.css";
import Link from "next/link";
import { auth, signIn, signOut } from "@/app/_lib/auth";
import Image from "next/image";

export default async function Navbar() {
  const routes = [
    { title: "Home", path: "/" },
    { title: "Users", path: "/users" },
    { title: "About", path: "/about-us" },
    { title: "Contact", path: "/contact-us" },
  ];
  const user = await auth();
  const login = async () => {
    "use server";
    await signIn();
  };
  const logout = async () => {
    "use server";
    await signOut();
  };
  return (
    <nav className={styles["nav"]}>
      <div className={styles["nav-links-container"]}>
        {routes.map((route) => (
          <Link
            key={route.title}
            href={route.path}
            className={styles["nav-link"]}
          >
            {route.title}
          </Link>
        ))}
      </div>
      <div className={styles['user-options']}>
        {!user && (
          <>
            <Link href="/login">
              <button className={styles["btn"]}>Login</button>
            </Link>
            <form className={styles["form"]} action={login}>
              <button className={styles["btn"]} type="submit">
                Sign in with Google
              </button>
            </form>{" "}
          </>
        )}
        {user && (
          <>
            <div className={styles["user-card"]}>
              <Image
                src={user.user.image}
                alt="user image"
                width={200}
                height={200}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <p>{user.user.name}</p>
            </div>
            <form className={styles["form"]} action={logout}>
              <button className={styles["btn"]} type="submit">
                Logout
              </button>
            </form>
          </>
        )}
      </div>
    </nav>
  );
}
