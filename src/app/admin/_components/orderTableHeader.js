import { RxCaretSort } from "react-icons/rx";

export const OrderTableHeader = ({ selectAll, setSelectAll }) => {
  return (
    <div className="w-full h-14 flex items-center bg-[#f2f0f0] justify-between border-b border-[#e4e4e7] 2xl:px-5">
      <input
        type="checkbox"
        className="size-4.5 mx-5 cursor-pointer "
        checked={selectAll}
        onChange={(e) => setSelectAll(e.target.checked)}
      />
      <div className="w-14 pl-3 gap-2.5 text-base">№</div>
      <p className="px-5 font-medium text-[#71717A] w-2xs">Customer</p>
      <p className="px-5 font-medium text-[#71717A] w-43">Food</p>
      <div className="px-5 flex justify-between items-center w-43 font-medium text-[#71717A]">
        Date
        <RxCaretSort className="size-5" />
      </div>
      <p className="px-5 w-43 font-medium text-[#71717A]">Total</p>
      <p className="w-xs font-medium text-[#71717A]">Delivery Address</p>
      <div className="w-3xs px-5 font-medium text-[#71717A] flex items-center justify-center gap-5">
        Delivery State
        <RxCaretSort className="size-5" />
      </div>
    </div>
  );
};
