"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useContext, useEffect, useState } from "react";
import { Pagination } from "../_components/pagination";
import { OrderHeader } from "../_components/OrderHeader";
import { getOptions, patchOptions } from "@/app/utils/options";
import { OrderList } from "../_components/orderList";
import { OrderTableHeader } from "../_components/orderTableHeader";
import { Profile } from "../_components/profile";

export const OrderSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });
  const ordersPerPage = 12;

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

  const filteredData = data.filter((order) => {
    if (!dateRange || !dateRange.from || !dateRange.to) return true;
    const orderDate = new Date(order.createdAt);
    return orderDate >= dateRange.from && orderDate <= dateRange.to;
  });

  const totalPages = Math.ceil(filteredData.length / ordersPerPage);
  const startIndex = (page - 1) * ordersPerPage;
  const paginatedData = data.slice(startIndex, startIndex + ordersPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (page >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(page - 2, page - 1, page, page + 1, page + 2);
      }
    }
    return pages;
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      const pageOrderIds = filteredData.map((o) => o._id);
      setSelectedOrders(pageOrderIds);
    } else {
      setSelectedOrders([]);
    }
  };

  const handleOrderSelect = (orderId, checked) => {
    setSelectedOrders((prev) => {
      if (checked) return [...prev, orderId];
      return prev.filter((id) => id !== orderId);
    });
  };

  const bulkUpdateStatus = async (newStatus) => {
    if (selectedOrders.length === 0) return;
    try {
      const options = patchOptions();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/food-order/bulk-update`,
        {
          ...options,
          body: JSON.stringify({
            orderIds: selectedOrders,
            status: newStatus,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update orders");
      await res.json();

      getData();
      setSelectedOrders([]);
      setSelectAll(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [dateRange]);

  return (
    <div className="w-[80%] mt-6 flex flex-col items-end mb-15 justify-between">
      <Profile />
      <div className="w-full h-[892px] bg-white rounded-lg border-2 border-[#e4e4e7]">
        <OrderHeader
          orders={filteredData.length}
          dateRange={dateRange}
          setDateRange={setDateRange}
          selectedCount={selectedOrders.length}
          bulkUpdateStatus={bulkUpdateStatus}
        />
        <OrderTableHeader
          selectAll={selectAll}
          setSelectAll={handleSelectAll}
        />
        {loading ? (
          <div className="w-full h-[600px] flex items-center justify-center text-gray-500 text-lg">
            Loading orders...
          </div>
        ) : filteredData?.length === 0 ? (
          <div className="w-full h-[600px] flex items-center justify-center text-gray-500 text-lg">
            No orders found.
          </div>
        ) : (
          paginatedData.map((order, index) => (
            <OrderList
              key={order._id}
              selectedCount={selectedOrders.length}
              Customer={order.user.email}
              foodnums={order.foodOrderItems.length}
              Address={order.userAddress || "N/A"}
              date={order.createdAt}
              Total={order.totalPrice}
              status={order.status}
              orderId={order._id}
              isChecked={selectedOrders.includes(order._id)}
              handleCheckboxChange={handleOrderSelect}
              num={index + 1 + (page - 1) * ordersPerPage}
              className={index === ordersPerPage - 1 ? "rounded-b-sm" : ""}
              foods={order.foodOrderItems}
            />
          ))
        )}
      </div>
      <Pagination
        getPageNumbers={getPageNumbers}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};
