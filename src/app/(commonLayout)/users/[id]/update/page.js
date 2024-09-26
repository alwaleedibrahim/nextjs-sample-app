import { deleteUser, updateUser } from "@/app/_lib/actions";
import { GET } from "@/app/api/users/[id]/route";
import { GET as getAll } from "@/app/api/users/route";
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
  return {
    title: user.name,
  };
}
export default async function UserDetails({ params }) {    
  try {
    const response = await (await GET(null, { params })).json();
    const user = response.data;

    return (
      <form
        action={updateUser}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          height: "70vh",
          justifyContent: "space-around",
          fontSize: "3rem",
          margin: "auto",
        }}
      >
        <input type="text" defaultValue={user._id} name="id" hidden />

        <input type="text" name="name" placeholder="name" defaultValue={user.name}/>
        <input type="email" name="email" placeholder="email" defaultValue={user.email}/>
        <input type="text" name="address" placeholder="address" defaultValue={user.address}/>
        <input type="text" name="phone" placeholder="phone" defaultValue={user.phone}/>
        <input
          type="submit"
          value="Update"
          style={{
            padding: 10,
            fontSize: "1rem",
            backgroundColor: "inherit",
            borderColor: "cyan",
            width: "fit-content",
          }}
        />
      </form>
    );
  } catch(e) {
    console.log(e);
    
    notFound();
  }
}
