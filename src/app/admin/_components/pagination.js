import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export const Pagination = ({ setPage, page, totalPages, getPageNumbers }) => {
  return (
    <div className="w-full h-20 flex items-center justify-end gap-2">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="p-2 border rounded-full shadow-sm disabled:opacity-50 flex items-center bg-white text-black border-gray-300"
      >
        <FaAngleLeft />
      </button>

      {getPageNumbers().map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1 border rounded-full shadow-sm ${
            p === page
              ? "bg-[#18181B] text-white"
              : "bg-white text-black border-gray-300"
          }`}
        >
          {p}
        </button>
      ))}

      {totalPages > 5 && page < totalPages - 2 && (
        <span className="text-black rounded-full bg-white shadow-sm border border-gray-300 px-2.5 py-1">
          ...
        </span>
      )}

      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
        className="p-2 border rounded-full shadow-sm disabled:opacity-50 flex items-center bg-white text-black border-gray-300"
      >
        <FaAngleRight />
      </button>
    </div>
  );
};
