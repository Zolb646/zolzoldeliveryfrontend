import { Button } from "@/components/ui/button";
import { DateRangePicker } from "./dateRangePicker";

export const OrderHeader = () => {
  return (
    <div className="w-full h-19 flex items-center justify-between px-4 border-b border-[#e4e4e7]">
      <div className="w-fit flex h-fit flex-col">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-gray-500">{/* {orders}  */}1 items</p>
      </div>
      <div className="w-fit h-fit flex gap-10">
        <DateRangePicker />
        <Button
          className={`rounded-full min-w-45 flex items-center justify-between 
            
            // isActive ? "" : "bg-gray-300 text-white cursor-not-allowed"
          
          `}
          //   onClick={() => isActive && setIsOpen(true)}
          //   disabled={!isActive}
        >
          Change delivery state
          {/* {isActive && ( */}
          <div className="w-10 h-full bg-white text-black flex items-center justify-center rounded-full">
            {/* {selectedCount} */}1
          </div>
          {/* )} */}
        </Button>
      </div>
    </div>
  );
};
