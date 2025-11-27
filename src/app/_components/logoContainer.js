"use client";

import { useRouter } from "next/navigation";

export const LogoContainer = ({
  className,
  logo,
  blackOrWhite,
  color,
  pushRouter,
}) => {
  const router = useRouter();
  return (
    <div
      className={`${className} cursor-pointer`}
      onClick={() => router.push(pushRouter)}
    >
      <img src={logo} className="size-12" />
      <div className="flex flex-col">
        <h1 className={`font-bold text-2xl  ${blackOrWhite}`}>
          Zol<span className={color}>Zol</span>
        </h1>
        <p className="font-normal text-sm text-[#71717A]">Swift delivery</p>
      </div>
    </div>
  );
};
