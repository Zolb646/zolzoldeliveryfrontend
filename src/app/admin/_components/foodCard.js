"use client";
import { useState } from "react";
import Image from "next/image";
import { deleteOptions, patchOptions } from "@/app/utils/options";
import { EditFoodModal } from "./editFoodModal";

export const FoodCard = ({
  item,
  categories,
  getData,
  uploading,
  setUploading,
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    foodName: item.foodName || "",
    category: item.category?._id || "",
    categoryName: item.category?.categoryName || "",
    ingredients: Array.isArray(item.ingredients)
      ? item.ingredients.join(", ")
      : item.ingredients || "",
    price: item.price || "",
    imageUrl: item.imageUrl || "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    setFormData((prev) => ({
      ...prev,
      file: file,
      imageUrl: URL.createObjectURL(file),
    }));

    setUploading(false);
  };

  const handleSave = async () => {
    const options = patchOptions();
    const form = new FormData();
    form.append("foodName", formData.foodName);
    form.append("category", formData.category);

    formData.ingredients
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean)
      .forEach((i) => form.append("ingredients", i));

    form.append("price", formData.price);

    if (formData.file) {
      form.append("image", formData.file);
    }

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/food/${item._id}`, {
      method: "PATCH",
      headers: {
        Authorization: options.headers.Authorization,
      },
      body: form,
    });

    await getData();
    setOpen(false);
  };

  const deleteData = async () => {
    const options = deleteOptions();
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/food/${item._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: options.headers.Authorization,
          },
        }
      );

      await getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-68 h-60 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition relative overflow-hidden px-4 pt-4 flex flex-col gap-4">
      <div className="w-full h-[130px] relative">
        {formData.imageUrl ? (
          <Image
            src={formData.imageUrl}
            alt={formData.foodName}
            fill
            loading="eager"
            sizes="130px"
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            No Image
          </div>
        )}
        <EditFoodModal
          open={open}
          setOpen={setOpen}
          item={item}
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          deleteData={deleteData}
          handleSave={handleSave}
          uploading={uploading}
          handleImageUpload={handleImageUpload}
        />
      </div>

      <div className="flex flex-col justify-between h-fit">
        <div className="flex justify-between gap-2">
          <p className="font-semibold text-base text-red-600">
            {item.foodName}
          </p>
          <p className="font-semibold text-sm">{item.price} MNT</p>
        </div>
        <p className="text-xs flex flex-wrap">
          {Array.isArray(item.ingredients) && item.ingredients.length > 0
            ? item.ingredients.join(", ")
            : "No ingredients listed"}
        </p>
      </div>
    </div>
  );
};
