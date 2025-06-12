import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MainCards from "../components/MainCards";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 overflow-auto">
          <MainCards />
          {children}
        </main>
      </div>
    </div>
  );
}
