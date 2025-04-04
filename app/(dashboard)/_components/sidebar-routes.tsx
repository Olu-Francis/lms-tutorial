"use client";

import { BarChart2, Code, Layout, List, Search } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    herf: "/",
  },
  {
    icon: Search,
    label: "Search Course",
    herf: "/search",
  },
  {
    icon: Code,
    label: "Debug Practice",
    herf: "/debug",
  },
];

const instructorRoutes = [
  {
    icon: List,
    label: "Courses",
    herf: "/instructor/courses",
  },
  {
    icon: BarChart2,
    label: "Overview",
    herf: "/instructor/overview",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isInstructorPage = pathname?.includes("/instructor");

  const routes = isInstructorPage ? instructorRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.herf}
          icon={route.icon}
          label={route.label}
          href={route.herf}
        />
      ))}
    </div>
  );
};
