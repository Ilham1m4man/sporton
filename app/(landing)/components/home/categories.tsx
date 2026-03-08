import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { Category } from "@/app/types";
import { getImageURL } from "@/app/lib/api";

type TCategoriesProps = {
  categories: Category[];
};

export default function CategoriesSection({ categories }: TCategoriesProps) {
  console.log(categories)
  return (
    <section id="category-section" className="container mx-auto py-20">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Browse By Categories</h2>
        <Link href="#" className="flex gap-2 text-primary font-medium">
          <span className="self-center">See All Categories</span>
          <FiArrowRight className="self-center" />
        </Link>
      </div>
      <div className="grid grid-cols-6 gap-12 mt-8">
        {categories.map((category) => (
          <div
            className="rounded-lg bg-gradient-to-r from-[#F1F1F1] to-[#F7F7F7] w-full aspect-square flex justify-center"
            key={category.id}
          >
            <div className="self-center">
              {category.image_url ? (
                <Image
                  src={getImageURL(category.image_url)}
                  width={86}
                  height={86}
                  alt={category.name}
                  className="mb-[10px]"
                />
              ) : (
                <div>No Image</div>
              )}
              <div className="text-primary font-medium text-xl text-center">
                {category.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
