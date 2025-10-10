import { AppSidebar } from "@/components/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

function PrivateLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full h-full">{children}</div>
    </SidebarProvider>
  );
}

export default PrivateLayout;
