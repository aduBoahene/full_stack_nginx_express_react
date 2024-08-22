import Sidebar from "@/components/SIdebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex">
      <Sidebar />
      <div className="pl-8 py-6 w-[80%] overflow-auto page">{children}</div>
    </div>
  );
}
