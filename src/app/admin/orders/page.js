import { OrderSection } from "../_features/orderSection";
import { SideBar } from "../_features/sideBar";

export default function AdminOrdersPage() {
  return (
    <div className="w-full h-screen flex bg-[#F4F4F5] gap-10 relative">
      <SideBar pushRouter={"/admin/orders"} logo={`/favicon.ico`} />
      <OrderSection />
    </div>
  );
}
