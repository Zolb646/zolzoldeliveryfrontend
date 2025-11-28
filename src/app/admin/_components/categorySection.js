"use client";
import { useState } from "react";
import { createOptions } from "@/app/utils/options";
import { AddFoodModal } from "./addFoodModal";
import { FoodCard } from "./foodCard";

export const CategorySection = ({
  category,
  foods = [],
  setErrorState,
  errorState,
  getData,
  categories,
}) => {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState(0);
  const [ingredientsText, setIngredientsText] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const validateErrors = () => {
    const errors = {};
    if (
      !foodName ||
      !foodName.trim() ||
      foodName.length < 3 ||
      foodName.length > 50 ||
      foodName.startsWith(" ") ||
      foodName.endsWith(" ")
    ) {
      errors.foodName = "Invalid food name";
    }
    if (!price || !Number.isFinite(price) || price <= 0) {
      errors.price = "Invalid price";
    }
    if (!ingredientsText) {
      errors.ingredients = "Invalid ingredients";
    }
    if (!imageUrl) {
      errors.image = "Image is required";
    }
    setErrorState(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddFood = async () => {
    const arr = ingredientsText
      .split(", ")
      .map((s) => s.trim())
      .filter(Boolean);
    const formData = new FormData();
    formData.append("foodName", foodName);
    formData.append("price", price);
    formData.append("category", category._id);
    arr.forEach((i) => formData.append("ingredients", i));
    formData.append("image", imageUrl.file);

    try {
      const options = createOptions();
      if (!validateErrors()) return;
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/food`, {
        method: "POST",
        headers: {
          Authorization: options.headers.Authorization,
        },
        body: formData,
      });
      await getData();
      setErrorState({});
      setFoodName("");
      setPrice(0);
      setIngredientsText("");
      setImageUrl(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setImageUrl({
      file,
      preview: URL.createObjectURL(file),
    });
    setUploading(false);
  };

  return (
    <>
      <div className="flex flex-col w-full rounded-xl bg-white border-2 border-[#e4e4e7] p-6 gap-4">
        <div className="flex items-center mb-4 font-semibold text-xl gap-2">
          <h2 className="font-semibold text-xl">{category.categoryName}</h2>
          <span>({foods?.length || 0})</span>
        </div>

        <div className="flex gap-4 flex-wrap">
          <AddFoodModal
            setErrorState={setErrorState}
            handleAddFood={handleAddFood}
            setFoodName={setFoodName}
            setPrice={setPrice}
            setIngredientsText={setIngredientsText}
            errorState={errorState}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            category={category}
            ingredientsText={ingredientsText}
            uploading={uploading}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleImageChange={handleImageChange}
          />

          {Array.isArray(foods) && foods.length > 0 ? (
            foods.map((item) => (
              <FoodCard
                key={item._id}
                item={item}
                categories={categories}
                errorState={errorState}
                getData={getData}
                uploading={uploading}
                setUploading={setUploading}
              />
            ))
          ) : (
            <div className="flex items-center justify-center text-gray-400 italic min-w-60">
              No dishes yet
            </div>
          )}
        </div>
      </div>
    </>
  );
};
