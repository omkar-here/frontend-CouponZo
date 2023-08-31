import React from "react";
import "../Styles/styles.css";
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
function RootLayout() {
  return (
    <div className="bg-[#f6f6f9]">
      <Sidebar />
      <main className="ml-64">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
