import React from "react";
import Navbar from "../_components/navbar/navbar";
import Footer from "../_components/footer/footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>{children}</div>
      <Footer />
    </>
  );
}
