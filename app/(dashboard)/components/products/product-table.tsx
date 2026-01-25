import Image from "next/image";
import priceFormatter from "@/app/utils/price-formatter";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Product } from "@/app/types";
import { getImageURL } from "@/app/lib/api";

type TProductTableProps = {
  products: Product[]
  onEdit?: (product: Product) => void
  onDelete?: (id: string) => void
}

export default function ProductTable({products, onEdit, onDelete}: TProductTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-sm">
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Price</th>
            <th className="px-6 py-4 font-semibold">Stock</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((data, index) => (
            <tr
              key={index}
              className="border-b border-gray-50 last:border-none hover:bg-gray-50/50 text-sm"
            >
              <td className="px-6 py-4 font-medium">
                <div className="flex gap-2 items-center">
                  <div className="aspect-square bg-gray-100 rounded-md">
                    <Image
                      src={getImageURL(data.imageUrl)}
                      width={52}
                      height={52}
                      alt={data.name}
                      className="aspect-square object-contain"
                    />
                  </div>
                  <span>{data.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium">
                <div className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600 w-fit">
                  {data.category.name}
                </div>
              </td>
              <td className="px-6 py-4 font-medium">
                {priceFormatter(data.price)}
              </td>
              <td className="px-6 py-4 font-medium">{data.stock} units</td>
              <td className="px-6 py-7.5 flex items-center gap-3 text-gray-400">
                <button onClick={() => onEdit?.(data)} className="cursor-pointer hover:text-primary">
                  <FiEdit2 size={18} />
                </button>
                <button onClick={() => onDelete?.(data._id)} className="cursor-pointer hover:text-primary">
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
