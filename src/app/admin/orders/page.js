"use client";
import { useContext } from "react";
import { OrderSection } from "../_features/orderSection";
import { SideBar } from "../_features/sideBar";
import { AuthContext } from "@/app/_context/authContext";
import { useRouter } from "next/navigation";

export default function AdminOrdersPage() {
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
    <div className="w-full h-screen flex bg-[#F4F4F5] gap-10 relative">
      <SideBar pushRouter={"/admin/orders"} logo={`/favicon.ico`} />
      <OrderSection />
    </div>
  );
}
