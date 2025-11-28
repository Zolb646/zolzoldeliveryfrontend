"use client";
import { useEffect, useState } from "react";
// import { Profile } from "../_components/profile";
// import { CategoryButtons } from "../_components/categoryButtons";
// import { AddCategoryModal } from "../_components/addCategoryModal";
// import { CategorySection } from "../_components/categorySection";
import { FiCheck } from "react-icons/fi";
import { Profile } from "../_components/profile";
import { createOptions, getOptions } from "@/app/utils/options";
import { CategoryButtons } from "../_components/categoryButtons";
import { CategorySection } from "../_components/categorySection";
import { AddCategoryModal } from "../_components/addCategoryModal";

export const MenuSection = () => {
  const [categories, setCategories] = useState([]);
  const [food, setFood] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [errorState, setErrorState] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getData = async () => {
    try {
      const getOption = getOptions();

      const catRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/food-category`,
        getOption
      );
      if (!catRes.ok) throw new Error("Failed to fetch categories");

      const catJson = await catRes.json();
      const foodRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/food`,
        getOption
      );

      const foodJson = await foodRes.json();
      const foodsByCategory = await Promise.all(
        catJson.map(async (category) => {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/food/${category._id}`,
            getOption
          );
          const data = await res.json();
          return { categoryId: category._id, items: data };
        })
      );

      setCategories(catJson || []);
      setFood({ all: foodJson || [], byCategory: foodsByCategory || [] });
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCategory =
    selectedCategory === "all"
      ? categories
      : categories.filter((category) => category._id === selectedCategory);

  const validateErrors = () => {
    const errors = {};
    if (!newCategory.trim()) {
      errors.message = "Valid category name is required.";
    }
    if (newCategory.length < 3 || newCategory.length > 20) {
      errors.message = "Category name must be between 3 and 20 characters.";
    }
    if (
      categories.find(
        (cat) => cat.categoryName.toLowerCase() === newCategory.toLowerCase()
      )
    ) {
      errors.message = "Category already exists.";
    }

    setErrorState(errors);
    return Object.keys(errors).length === 0;
  };

  const createData = async () => {
    try {
      const createOption = createOptions();
      if (!validateErrors()) return;

      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/food-category`, {
        ...createOption,
        body: JSON.stringify({ categoryName: newCategory }),
      });

      await getData();
      setIsOpen(false);
      setNewCategory("");
      setErrorState({});
      setSuccessMessage("New Category is being added to the menu");

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="w-[80%] mt-6 flex flex-col gap-6">
        <div className="w-full h-fit flex items-end flex-col justify-between sticky">
          <Profile logo={"/_.jpeg"} />
          <div className="flex flex-col w-full rounded-xl bg-white border-2 border-[#e4e4e7] justify-between mt-6 p-6 gap-4">
            <p className="font-semibold text-2xl">Dishes category</p>
            <CategoryButtons
              categories={categories}
              food={food}
              onAdd={() => setIsOpen(true)}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
        <div className="w-full h-fit flex flex-col overflow-auto pb-10 gap-6">
          {filteredCategory.map((cat) => {
            const categoryFoods =
              food.byCategory.find((fc) => fc.categoryId === cat._id)?.items
                .food || [];
            return (
              <CategorySection
                key={cat._id}
                category={cat}
                categories={categories}
                foods={categoryFoods}
                createOptions={createOptions}
                errorState={errorState}
                setErrorState={setErrorState}
                getData={getData}
              />
            );
          })}
        </div>
      </div>

      {isOpen && (
        <AddCategoryModal
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          createData={createData}
          setIsOpen={setIsOpen}
          errorState={errorState}
          setErrorState={setErrorState}
        />
      )}
      {successMessage && (
        <div className="fixed inset-0 flex h-fit mt-52 justify-center z-50">
          <div className="bg-black text-white flex gap-2.5 px-6 py-3 rounded-sm shadow-lg text-base font-medium animate-fade-in items-center">
            <FiCheck className="size-5" />
            {successMessage}
          </div>
        </div>
      )}
    </>
  );
};
