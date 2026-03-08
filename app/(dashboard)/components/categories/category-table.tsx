import { getImageURL } from "@/app/lib/api";
import { Category } from "@/app/types";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

type TCategoryTableProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
};

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: TCategoryTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-sm">
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Description</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((data, index) => (
            <tr
              key={index}
              className="border-b border-gray-50 last:border-none hover:bg-gray-50/50 text-sm"
            >
              <td className="px-6 py-4 font-medium">
                <div className="flex gap-4 items-center">
                  <div className="aspect-square overflow-hidden bg-gray-100 rounded-md">
                    <Image
                      src={getImageURL(data.image_url)}
                      width={48}
                      height={48}
                      alt={data.name}
                      className="aspect-square object-contain"
                    />
                  </div>
                  <span>{data.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium">{data.description}</td>
              <td className="px-6 py-7.5 flex items-center gap-3 text-gray-400">
                <button
                  onClick={() => onEdit?.(data)}
                  className="cursor-pointer hover:text-primary"
                >
                  <FiEdit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete?.(data.id)}
                  className="cursor-pointer hover:text-primary"
                >
                  <FiTrash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
