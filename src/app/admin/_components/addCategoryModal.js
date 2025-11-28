"use client";
import { FiPlus } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AddCategoryModal = ({
  newCategory,
  setNewCategory,
  createData,
  setIsOpen,
  errorState,
  setErrorState,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-91 relative flex flex-col gap-6">
        <div className="w-full h-fit flex items-center justify-between">
          <p className="font-semibold">Add New Category</p>
          <button
            className="p-2 bg-gray-200 rounded-full"
            onClick={() => {
              setIsOpen(false);
              setNewCategory("");
              setErrorState({});
            }}
          >
            <FiPlus className="rotate-45" />
          </button>
        </div>

        <div className="flex flex-col w-full h-fit">
          <span className="font-medium mb-2">Category Name</span>
          <Input
            value={newCategory}
            placeholder="Enter category name"
            onChange={(e) => setNewCategory(e.target.value)}
          />
          {errorState.message && (
            <p className="text-red-500 font-medium mt-2">
              {errorState.message}
            </p>
          )}
        </div>

        <Button className="w-full rounded-full" onClick={createData}>
          Save
        </Button>
      </div>
    </div>
  );
};
