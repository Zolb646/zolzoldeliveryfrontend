import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Trash } from "lucide-react";
import Image from "next/image";
import { FiEdit3 } from "react-icons/fi";
import { LuImage } from "react-icons/lu";

export const EditFoodModal = ({
  open,
  setOpen,
  item,
  formData,
  setFormData,
  categories,
  deleteData,
  handleSave,
  handleImageUpload,
  uploading,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
          <FiEdit3 className="text-red-600 text-xl" />
        </button>
      </DialogTrigger>
      <DialogContent aria-describedby="">
        <DialogHeader>
          <DialogTitle className={`mb-6`}>Dishes info</DialogTitle>
        </DialogHeader>

        <div className="flex justify-between py-3">
          <Label htmlFor="dish-name" className={`py-0 h-fit text-[#71717A]`}>
            Dish name
          </Label>
          <Input
            id="dish-name"
            defaultValue={item.foodName}
            onChange={(e) =>
              setFormData({ ...formData, foodName: e.target.value })
            }
            className={`w-xs`}
          />
        </div>
        <div className="flex justify-between py-3">
          <Label htmlFor="dish-name" className={`py-0 h-fit text-[#71717A]`}>
            Dish category
          </Label>
          <Select
            value={formData.category}
            onValueChange={(val) => {
              const selectedCat = categories.find((cat) => cat._id === val);
              setFormData({
                ...formData,
                category: selectedCat._id,
                categoryName: selectedCat.categoryName,
              });
            }}
          >
            <SelectTrigger className="w-xs">
              <Badge variant={`secondary`} className={`px-2`}>
                {formData.categoryName
                  ? formData.categoryName
                  : item.category.categoryName}
              </Badge>
            </SelectTrigger>
            <SelectContent className={`w-52`} align="start">
              <SelectGroup>
                <SelectLabel className={`w-50`}>All Dishes</SelectLabel>
                {categories.map((cat, index) => (
                  <SelectItem className={`w-52`} value={cat._id} key={index}>
                    <Badge variant={`secondary`} className={`px-2`}>
                      {cat.categoryName}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between py-3">
          <Label htmlFor="ingredients" className={`py-0 h-fit text-[#71717A]`}>
            Ingredients
          </Label>
          <Textarea
            htmlFor="ingredients"
            className={`w-xs`}
            value={formData.ingredients}
            onChange={(e) =>
              setFormData({ ...formData, ingredients: e.target.value })
            }
          />
        </div>
        <div className="flex justify-between py-3 relative">
          <Label htmlFor="dish-price" className={`py-0 h-fit text-[#71717A]`}>
            Price
          </Label>
          <span className="absolute left-38 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            ₮
          </span>
          <Input
            id="dish-price"
            type={`number`}
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className={`w-xs px-6`}
          />
        </div>

        <div className="flex justify-between py-3">
          <Label htmlFor="dish-image" className="py-0 h-fit text-[#71717A]">
            Image
          </Label>
          <label
            htmlFor="dish-image"
            className={`w-xs h-40 border-2 border-dashed border-[#2563EB33] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition bg-[#2563EB0D] ${
              formData.imageUrl ? "p-0 border-none hover:bg-transparent" : "p-4"
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center justify-center gap-2 text-blue-600">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="text-sm font-medium">Uploading...</p>
              </div>
            ) : formData.imageUrl ? (
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={formData.imageUrl}
                  alt="Preview"
                  fill
                  sizes="160px"
                  loader={uploading}
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: "" })}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 text-xs px-2 py-1 rounded-md"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-white p-2">
                  <LuImage />
                </div>
                <p className="text-sm font-medium text-gray-600 text-center">
                  Choose a file or drag & drop
                </p>
              </div>
            )}

            <Input
              id="dish-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>
        </div>

        <DialogFooter className={`justify-between pt-6`}>
          <Button
            variant={`outline`}
            className={`border-red-500`}
            onClick={deleteData}
          >
            <Trash className="text-red-500" />
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
