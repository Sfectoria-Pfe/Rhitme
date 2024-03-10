import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Messages from "../Components/Messages-bar/Messages";
import Sidebar from "../Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function RootLayout() {
  return (
    <div className="vh-100 d-flex flex-column ">
      <Navbar />

      <main className="main d-flex overflow-y-hidden">
        <Messages />
        <Sidebar />

        <div className="outlet ">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default RootLayout;
