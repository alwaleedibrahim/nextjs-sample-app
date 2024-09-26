import { createUser } from "@/app/_lib/actions";
import React from "react";

export default function NewUser() {
  return (
    <form
      action={createUser}
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
      <input type="text" name="name" placeholder="name" />
      <input type="email" name="email" placeholder="email" />
      <input type="text" name="address" placeholder="address" />
      <input type="text" name="phone" placeholder="phone" />
      <input
        type="submit"
        value="Create"
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
}
