import { deleteUser } from "@/app/_lib/actions";
import { GET } from "@/app/api/users/[id]/route";
import { GET as getAll } from "@/app/api/users/route";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export const revalidate = 120;

export async function generateStaticParams() {
  const response = await (await getAll()).json();
  const users = response.data;

  return users.map((user) => {
    return {
      id: user._id,
    };
  });
}

export async function generateMetadata({ params }) {
  const response = await (await GET(null, { params })).json();
  const user = response.data;
  if (user) {
    return {
      title: user.name,
    };
  }
  else {
    return {
      title: 'user details',
    };
  }
}
export default async function UserDetails({ params }) {
  try {
    const response = await (await GET(null, { params })).json();
    const user = response.data;

    return (
       user && <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
        <h2>{user.address}</h2>
        <h2>{user.phone}</h2>
        <form action={deleteUser}>
          <input type="text" defaultValue={user._id} name='id' hidden/>
          <input
            type="submit"
            value="Delete User"
            style={{
              padding: 10,
              fontSize: "1rem",
              backgroundColor: "inherit",
              borderColor: "red",
              width: "fit-content",
            }}
          />
        </form>
        <Link href={`${user._id}/update`}><button
            style={{
              padding: 10,
              fontSize: "1rem",
              backgroundColor: "inherit",
              borderColor: "orange",
              width: "fit-content",
            }}
          >Edit This User</button>
      </Link>
      </div>
    );
  } catch {
    notFound();
  }
}
