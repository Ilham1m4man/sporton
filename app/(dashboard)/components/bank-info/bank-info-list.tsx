import { Banks } from "@/app/types";
import { FiCreditCard, FiEdit2, FiTrash2 } from "react-icons/fi";

type TBankInfoListProps = {
  banks: Banks[];
  onEdit: (bank: Banks) => void;
  onDelete: (id: string) => void;
};

export default function BankInfoList({
  banks,
  onEdit,
  onDelete,
}: TBankInfoListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {banks.map((data) => (
        <div
          className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
          key={data.id}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4 items-center">
              <div className="bg-blue-50 text-blue-600 rounded-xl w-12 h-12 flex justify-center items-center">
                <FiCreditCard size={24} />
              </div>
              <div>
                <div className="font-bold text-lg">{data.bank_name}</div>
                <div className="text-gray-400 text-sm">Bank Transfer</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <button
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => onEdit(data)}
              >
                <FiEdit2 size={18} />
              </button>
              <button
                className="cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => onDelete(data.id)}
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
          <div className="mb-4 font-medium">
            <div className="text-xs text-gray-400 uppercase font-medium mb-1">
              ACCOUNT NUMBER
            </div>
            <div className="text-dark font-bold text-lg">
              {data.account_number}
            </div>
          </div>
          <div className="pt-4 border-t border-gray-50">
            <p className="text-xs text-gray-400">
              Holder :{" "}
              <span className="font-medium text-dark">{data.account_name}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
