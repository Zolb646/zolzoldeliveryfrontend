import { LogoContainer } from "@/app/_components/logoContainer";
import { SideBarButtons } from "../_components/sideBarButtons";

export const SideBar = ({ pushRouter, logo }) => {
  return (
    <div className="h-full w-3xs bg-white flex flex-col py-9 px-8 gap-10">
      <LogoContainer
        logo={logo}
        className={`flex gap-2.5 items-center`}
        color={`text-black`}
        pushRouter={pushRouter}
      />
      <SideBarButtons />
    </div>
  );
};
