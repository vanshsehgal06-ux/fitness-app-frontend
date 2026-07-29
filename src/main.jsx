import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

const saved = localStorage.getItem("preferences");

if (saved) {
  const preferences = JSON.parse(saved);

  document.documentElement.classList.toggle(
    "dark",
    preferences.theme === "dark"
  );
} else {
  // Default theme for new users
  document.documentElement.classList.add("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <Toaster  position="top-center"
    toastOptions={{
    duration: 4000,
    style: {
      background: "#1f2937",
      color: "#fff",
      borderRadius: "12px",
      padding: "16px",
    },
  }}/>
  </BrowserRouter>
);