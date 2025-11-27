"use client";
import { getOptions } from "@/app/utils/getOptions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Pagination } from "../_components/pagination";
import { OrderHeader } from "../_components/OrderHeader";

export const OrderSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      const options = getOptions();
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/food-order`,
        options
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      console.log(json);

      setData(json.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-[80%] mt-6 flex flex-col items-end mb-15 justify-between border">
      <Avatar className={`size-11`}>
        <AvatarImage src="/_.jpeg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full h-[892px] bg-white rounded-lg border-2 border-[#e4e4e7]">
        <OrderHeader />
      </div>
      <Pagination />
    </div>
  );
};
