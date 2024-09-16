import { GET } from "@/app/api/users/[id]/route";
import { GET as getAll } from "@/app/api/users/route";
import { notFound } from "next/navigation";
import React from "react";

export const revalidate = 120

export async function generateStaticParams() {
  const response = await (await getAll()).json();
  const users = response.data;

  return users.map((user)=> {
    return {
      id: user._id
    }
  })
}

export async function generateMetadata({ params }) {
  const response = await (await GET(null, { params })).json();
    const user = response.data; 
  return {
    title: user.name,
  }
}
export default async function UserDetails({ params }) {
  try {
    const response = await (await GET(null, { params })).json();
    const user = response.data;

    return (
      <div
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
      </div>
    );
  } catch {
    notFound();
  }
}
