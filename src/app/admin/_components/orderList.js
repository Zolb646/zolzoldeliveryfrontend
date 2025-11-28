"use client";

import { formatDate, FormatStatus } from "@/app/utils/functions";
import { patchOptions } from "@/app/utils/options";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { RxCaretSort } from "react-icons/rx";

export const OrderList = ({
  className,
  foodnums,
  Customer,
  Total,
  Address,
  date,
  handleCheckboxChange,
  isChecked,
  num,
  status,
  orderId,
  foods,
}) => {
  const [checked, setChecked] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isOpen, setIsOpen] = useState(false);

  const patchData = async (newStatus) => {
    try {
      const options = patchOptions();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/food-order/${orderId}`,
        {
          ...options,
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");
      const json = await res.json();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleChange = (e) => {
    const value = e.target.checked;
    setChecked(value);
    handleCheckboxChange(orderId, value);
  };

  return (
    <div
      className={`w-full min-h-[63px] flex items-center justify-between border-b border-[#e4e4e7] 2xl:px-5 ${className}  ${
        checked ? "bg-[#f2f0f0]" : "bg-white"
      }`}
    >
      <input
        type="checkbox"
        className="size-4.5 mx-5 cursor-pointer"
        checked={checked}
        onChange={handleChange}
      />
      <div className="w-14 pl-3 gap-2.5 text-base">{num}</div>
      <p className="px-5 font-medium text-[#71717A] w-2xs">{Customer}</p>

      <div className="px-5 font-medium text-[#71717A] w-43 flex items-center justify-between">
        {foodnums} {foodnums === 1 ? "food" : "foods"}{" "}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="p-0 size-5">
              <FaAngleDown />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-fit p-2 shadow-lg">
            <div className="h-fit w-60 flex flex-col gap-2.5 p-2">
              {foods.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center"
                >
                  <img
                    src={item.food?.imageUrl}
                    alt={item.food?.foodName}
                    className="w-8 h-7.5 rounded-sm"
                  />
                  <span className="w-39 text-xs">{item.food?.foodName}</span>
                  <span className="text-xs">x {item.quantity}</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="px-5 flex justify-between items-center w-43 font-medium text-[#71717A]">
        {formatDate(date)}
      </div>

      <p className="px-5 w-43 font-medium text-[#71717A]">{Total}</p>

      <p className="w-xs font-medium text-xs text-[#71717A] whitespace-break-spaces truncate">
        {Address}
      </p>

      <div className="w-3xs px-5 flex items-center justify-center">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`flex items-center font-semibold rounded-full px-2.5 py-0.5 ${
                currentStatus === "DELIVERED"
                  ? " border-green-500"
                  : currentStatus === "PENDING"
                  ? "  border-red-500"
                  : ""
              }`}
            >
              {FormatStatus(currentStatus)}
              <RxCaretSort className="size-5" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-fit p-2 shadow-lg" align="start">
            <div className="h-fit w-35 flex flex-col gap-2.5 p-1">
              {["DELIVERED", "PENDING", "CANCELLED"].map((item) => (
                <button
                  key={item}
                  className={`rounded-full py-0.5 bg-gray-100 text-xs w-fit px-2.5 font-semibold hover:bg-gray-200 ${
                    currentStatus === item
                      ? " cursor-not-allowed bg-red-500/10 border-red-500 border text-red-500"
                      : ""
                  }`}
                  disabled={currentStatus === item}
                  onClick={() => {
                    patchData(item);
                    setCurrentStatus(item);
                    setIsOpen(false);
                  }}
                >
                  {FormatStatus(item)}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
