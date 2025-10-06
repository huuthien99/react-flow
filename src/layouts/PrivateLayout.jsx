import { AppSidebar } from "@/components/AppSideBar";
import Header from "@/components/header/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

function PrivateLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full h-full overflow-x-hidden">{children}</div>
    </SidebarProvider>
  );
}

export default PrivateLayout;
