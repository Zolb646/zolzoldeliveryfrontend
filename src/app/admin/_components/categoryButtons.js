"use client";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";

export const CategoryButtons = ({
  categories,
  food,
  onAdd,
  setSelectedCategory,
  selectedCategory,
}) => {
  console.log(food);

  return (
    <div className="w-full h-fit flex flex-wrap gap-4">
      <Button
        variant="outline"
        className={`rounded-full min-w-35 flex items-center justify-between font-medium ${
          selectedCategory === "all" ? "border-red-500" : ""
        }`}
        onClick={() => setSelectedCategory("all")}
      >
        All Dishes
        <div className="w-10 h-full bg-black text-white flex items-center justify-center rounded-full">
          {food.all?.food.length || 0}
        </div>
      </Button>

      {categories.map((category) => (
        <Button
          key={category._id}
          variant="outline"
          className={`rounded-full min-w-35 flex items-center justify-between font-medium ${
            selectedCategory === category._id ? "border-red-500" : ""
          }`}
          onClick={() => setSelectedCategory(category._id)}
        >
          {category.categoryName}
          <div className="w-10 h-full bg-black text-white flex items-center justify-center rounded-full">
            {food.byCategory.find((fc) => fc.categoryId === category._id)?.items
              .food.length || 0}
          </div>
        </Button>
      ))}

      <Button
        variant="destructive"
        size={`icon`}
        className="rounded-full"
        onClick={onAdd}
      >
        <FiPlus className="font-medium" />
      </Button>
    </div>
  );
};
