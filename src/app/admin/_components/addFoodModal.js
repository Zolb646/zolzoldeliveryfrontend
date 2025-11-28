import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { LuImage } from "react-icons/lu";

export const AddFoodModal = ({
  isDialogOpen,
  setIsDialogOpen,
  category,
  setFoodName,
  errorState,
  setIngredientsText,
  ingredientsText,
  setPrice,
  handleAddFood,
  uploading,
  imageUrl,
  setImageUrl,
  handleImageChange,
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="w-68 h-60 border-2 border-dashed border-red-400 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-red-50 transition gap-2.5">
          <div className="bg-red-500 rounded-full flex items-center justify-center p-2">
            <FiPlus className="text-white text-xl" />
          </div>
          <p className="font-semibold text-center">
            Add new Dish <br /> to {category.categoryName}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-lg gap-6 items-end" aria-describedby="">
        <DialogHeader>
          <DialogTitle className={`pb-4`}>
            Add new Dish to {category.categoryName}
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full h-fit justify-between">
          <div className="w-[46%] flex flex-col gap-2">
            <Label htmlFor="food-name">Food name</Label>
            <Input
              id="food-name"
              placeholder="Type food name"
              onChange={(e) => setFoodName(e.target.value)}
            />
            {errorState.foodName && (
              <p className="text-red-500 text-sm">{errorState.foodName}</p>
            )}
          </div>
          <div className="w-[46%] flex flex-col gap-2">
            <Label htmlFor="food-price">Food price</Label>
            <Input
              id="food-price"
              placeholder="Enter price"
              onChange={(e) =>
                setPrice(e.target.value ? Number(e.target.value) : "")
              }
            />
            {errorState.price && (
              <p className="text-red-500 text-sm">{errorState.price}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="ingredients">Ingredients</Label>
          <Textarea
            placeholder="List ingredients..."
            id="ingredients"
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
          />
          {errorState.ingredients && (
            <p className="text-red-500 text-sm">{errorState.ingredients}</p>
          )}
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="food-image">Food image</Label>
          <label
            htmlFor="food-image"
            className={`w-full h-40 border-2 border-dashed border-[#2563EB33] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition bg-[#2563EB0D] ${
              errorState.image ? "border-red-500" : ""
            } ${imageUrl ? "p-0 border-none hover:bg-transparent" : "p-4"}`}
          >
            {uploading ? (
              <div className="flex flex-col items-center justify-center gap-2 text-blue-600">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="text-sm font-medium">Uploading...</p>
              </div>
            ) : imageUrl ? (
              <>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl.preview}
                    alt="Preview"
                    fill
                    sizes="160px"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrl(null);
                    }}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 text-xs px-2 py-1 rounded-md"
                  >
                    ✕
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-white p-2">
                  <LuImage />
                </div>
                <p className="text-sm font-medium">
                  Choose a file or drag & drop it here
                </p>
              </div>
            )}

            <Input
              id="food-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={uploading}
            />
            {errorState.image && (
              <p className="text-red-500 text-sm mt-2">{errorState.image}</p>
            )}
          </label>
        </div>
        <div className="w-full h-fit flex justify-end pt-6">
          <Button className="w-fit z-60" onClick={handleAddFood}>
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
