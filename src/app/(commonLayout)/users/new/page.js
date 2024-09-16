"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function NewUser() {
  const [user, setUser] = useState({});
  const router = useRouter()

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify(user),
    });

    if (res.status == 201) {
      router.push("/users");
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={(e) => {handleSubmit(e)}}
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
      <input
        type="text"
        name="name"
        placeholder="name"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <input
        type="email"
        name="email"
        placeholder="email"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <input
        type="text"
        name="address"
        placeholder="address"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <input
        type="text"
        name="phone"
        placeholder="phone"
        onChange={(e) => {
          handleChange(e);
        }}
      />
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
