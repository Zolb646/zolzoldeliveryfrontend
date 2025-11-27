import { MenuSection } from "./_features/menuSection";
import { SideBar } from "./_features/sideBar";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex bg-[#F4F4F5] gap-10">
      <SideBar pushRouter={"/admin"} logo={`favicon.ico`} />
      <MenuSection />
    </div>
  );
}
