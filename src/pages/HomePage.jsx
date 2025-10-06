import { AppSidebar } from "@/components/AppSideBar";
import DnDContainer from "@/dndComponent/DnDContainer";
import React from "react";

function HomePage() {
  return (
    <>
      <AppSidebar />

      <DnDContainer />
    </>
  );
}

export default HomePage;
