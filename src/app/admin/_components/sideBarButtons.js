"use client";
import { Button } from "@/components/ui/button";
import { Settings, Truck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";

export const SideBarButtons = () => {
  const router = useRouter();
  const pathName = usePathname();

  const isOrdersPage = pathName.includes("/admin/orders");
  const isMenuPage = pathName === "/admin";
  const isSettingsPage = pathName.includes("/admin/settings");
  return (
    <div className="flex flex-col w-full gap-6">
      <Button
        className={`rounded-full justify-start py-4 px-10 ${
          isMenuPage ? "" : "bg-white text-black"
        }`}
        onClick={() => router.push("/admin")}
      >
        <LuLayoutDashboard className="size-5" />
        Food menu
      </Button>
      <Button
        className={`rounded-full justify-start py-4 px-10 ${
          isOrdersPage ? "" : "bg-white text-black"
        }`}
        onClick={() => router.push("/admin/orders")}
      >
        <Truck className="size-5" />
        Orders
      </Button>
      <Button
        className={`rounded-full justify-start py-4 px-10 ${
          isSettingsPage ? "" : "bg-white text-black"
        }`}
        //onClick={() => router.push("/admin/settings")}
      >
        <Settings className="size-5" />
        Settings
      </Button>
    </div>
  );
};
