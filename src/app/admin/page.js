"use client";
import { useRouter } from "next/navigation";
import { MenuSection } from "./_features/menuSection";
import { SideBar } from "./_features/sideBar";
import { useContext } from "react";
import { AuthContext } from "../_context/authContext";
import { NoAccessPanel } from "../_components/noAccessPanel";

export default function AdminPage() {
  const router = useRouter();
  const { loading, user } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Checking permissions...
      </div>
    );
  }
  if (user.role !== "ADMIN") {
    return <NoAccessPanel router={router} />;
  }
  return (
    <div className="w-full h-screen flex bg-[#F4F4F5] gap-10">
      <SideBar pushRouter={"/admin"} logo={`favicon.ico`} />
      <MenuSection />
    </div>
  );
}
