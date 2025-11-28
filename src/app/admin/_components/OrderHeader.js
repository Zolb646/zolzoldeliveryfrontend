"use client";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "./dateRangePicker";
import { useState } from "react";
import { FiX } from "react-icons/fi";

export const OrderHeader = ({
  orders,
  setDateRange,
  dateRange,
  selectedCount,
  bulkUpdateStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const isActive = selectedCount > 0;

  const handleSave = () => {
    if (selectedStatus) {
      bulkUpdateStatus(selectedStatus);
      setIsOpen(false);
      setSelectedStatus("");
    }
  };

  const statusOptions = ["DELIVERED", "PENDING", "CANCELLED"];
  return (
    <>
      <div className="w-full h-19 flex items-center justify-between px-4 border-b border-[#e4e4e7]">
        <div className="w-fit flex h-fit flex-col">
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-gray-500">{orders} items</p>
        </div>
        <div className="w-fit h-fit flex gap-10">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
          <Button
            className={`rounded-full min-w-45 flex items-center justify-between ${
              isActive ? "" : "bg-gray-300 text-white cursor-not-allowed"
            }`}
            onClick={() => isActive && setIsOpen(true)}
            disabled={!isActive}
          >
            Change delivery state
            {isActive && (
              <div className="w-10 h-full bg-white text-black flex items-center justify-center rounded-full">
                {selectedCount}
              </div>
            )}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-91 relative flex flex-col gap-6">
            <div className="w-full h-fit flex items-center justify-between">
              <p className="font-semibold">Change delivery state</p>
              <button
                className="p-2 bg-gray-200 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="w-full flex justify-between items-center gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all duration-150
                    ${
                      selectedStatus === status
                        ? "border-red-500 border text-rose-500 bg-red-100"
                        : "bg-gray-200"
                    }`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            <Button
              className="w-full rounded-full"
              onClick={handleSave}
              disabled={!selectedStatus}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
