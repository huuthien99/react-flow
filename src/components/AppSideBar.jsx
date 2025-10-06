import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  SplinePointer,
  Menu,
  CircleChevronRight,
  CircleChevronLeft,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const items = [
  {
    title: "Procedure",
    url: "/procedure",
    icon: SplinePointer,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();

  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon">
      <SidebarTrigger className={"absolute top-2.5 -right-4 z-1"} />
      <SidebarHeader className={"mt-4"}>
        <div className="flex items-center justify-between px-2">
          <span className="font-semibold text-lg">Menu</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  className={cn(open ? "" : "flex justify-center")}
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    <div onClick={() => navigate(item.url)}>
                      <item.icon className="size-[18px]!" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
