import React from "react";
import UserCard from "@/app/_components/user-card/UserCard";
import Link from "next/link";
import { GET } from "@/app/api/users/route";

export const metadata = {
  title: 'Users'
}

export const revalidate = 120


export default async function Users() {
  const response = await (await GET()).json();
  const users = response.data;
  return (
    <>
     <Link href="/users/new">
        <button style={{padding: 10, fontSize: '1rem', backgroundColor: 'inherit', borderColor: 'cyan', margin: '20px'}}>Create new user</button>
      </Link>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {users.map((user) => {
          return (
            <Link key={user._id} href={`/users/${user._id}`}>
              <UserCard user={user} />
            </Link>
          );
        })}
      </div>
     
    </>
  );
}
