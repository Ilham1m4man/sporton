import { Transaction } from "@/app/types";
import priceFormatter from "@/app/utils/price-formatter";
import { FiEye } from "react-icons/fi";

type TTransactionTableProps = {
  onViewDetails: (transaction: Transaction) => void;
  transactions: Transaction[]
};

export default function TransactionTable({
  onViewDetails,
  transactions,
}: TTransactionTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "rejected":
        return "bg-red-100 text-red-600";
      case "paid":
        return "bg-green-100 text-green-600";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-sm">
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Contact</th>
            <th className="px-6 py-4 font-semibold">Total</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((data, index) => (
            <tr
              key={data._id}
              className="border-b text-sm border-gray-50 last:border-none hover:bg-gray-50/50"
            >
              <td className="px-6 py-4 font-medium">{new Date(data.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</td>
              <td className="px-6 py-4 font-medium">{data.customerName}</td>
              <td className="px-6 py-4 font-medium">{data.customerContact}</td>
              <td className="px-6 py-4 font-medium">
                {priceFormatter(parseInt(data.totalPayment))}
              </td>

              <td className="px-6 py-4 font-bold">
                <div
                  className={`px-3 py-1 rounded-full text-center w-fit text-xs uppercase ${getStatusColor(
                    data.status
                  )}`}
                >
                  {data.status}
                </div>
              </td>
              <td className="px-6 py-4 flex items-center gap-3 text-gray-600">
                <button
                  onClick={() => onViewDetails(data)}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 w-fit rounded-md"
                >
                  <FiEye size={18} />
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
