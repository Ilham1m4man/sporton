import { Button } from "@/app/(landing)/components/ui/button";
import priceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { FiCheck, FiX } from "react-icons/fi";
import Modal from "../ui/modal";
import { Transaction } from "@/app/types";
import { useState } from "react";
import { getImageURL } from "@/app/lib/api";

type TTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onStatusChange: (id: string, status: "paid" | "rejected") => Promise<void>;
};

export default function TransactionModal({
  isOpen,
  onClose,
  transaction,
  onStatusChange,
}: TTransactionModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!transaction) return;

  const handleStatusUpdate = async (status: "paid" | "rejected") => {
    setIsUpdating(true);
    try {
      await onStatusChange(transaction.id, status);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
      <div className="flex gap-6">
        <div className="min-w-50">
          <h4 className="font-semibold text-sm mb-2">Payment Proof</h4>
          {transaction.payment_proof ? (
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-sm relative aspect-[3/5] flex items-center justify-center text-gray-500">
              <Image
                src={getImageURL(transaction.payment_proof)}
                alt="Payment Proof"
                width={200}
                height={401}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="text-center p-4">
              <p className="text-sm">No Payment proof uploaded</p>
            </div>
          )}
        </div>
        <div className="w-full">
          <h4 className="font-semibold text-sm mb-2">Order Details</h4>
          <div className="bg-gray-100 rounded-md flex flex-col gap-2.5 p-4  text-sm mb-5">
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Date</div>
              <div className="text-right">
                {new Date(transaction.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Customer</div>
              <div className="text-right">{transaction.customer_name}</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Contact</div>
              <div className="text-right">{transaction.customer_contact}</div>
            </div>
            <div className="flex justify-between gap-10 font-medium">
              <div className="opacity-50 whitespace-nowrap">
                Shipping Address
              </div>
              <div className="text-right">{transaction.customer_address}</div>
            </div>
          </div>

          <h4 className="font-semibold text-sm mb-2">Items Purchased</h4>

          <div className="space-y-3">
            {transaction.items.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-2 flex items-center gap-2"
              >
                {item.product_id ? (
                  <>
                    <div className="bg-gray-100 rounded aspect-square w-10.5 h-10.5">
                      <Image
                        src={getImageURL(item.product_id.image_url)}
                        width={48}
                        height={48}
                        alt="product image"
                        className="object-contain aspect-square"
                      />
                    </div>
                    <div className="font-medium text-sm">
                      {item.product_id.name}
                    </div>
                    <div className="font-medium ml-auto text-sm">
                      {item.qty} units
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center text-xs text-gray-400">
                        Img
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-dark">
                          Product ID: null
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">
                      {item.qty} units
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between  text-sm mt-6">
            <h4 className="font-semibold">Total </h4>
            <div className="text-primary font-semibold">
              {priceFormatter(transaction.total_payment)}
            </div>
          </div>
          <div className=" flex justify-end gap-5 mt-12">
            {transaction.status === "pending" ? (
              isUpdating ? (
                <div className="text-center">Updating...</div>
              ) : (
                <>
                  <Button
                    className="text-primary! bg-primary-light! rounded-md"
                    size="small"
                    onClick={() => handleStatusUpdate("rejected")}
                    disabled={isUpdating}
                  >
                    <FiX size={20} />
                    Reject
                  </Button>
                  <Button
                    className="text-white! bg-[#50C252]! rounded-md"
                    size="small"
                    onClick={() => handleStatusUpdate("paid")}
                    disabled={isUpdating}
                  >
                    <FiCheck size={20} />
                    Approve
                  </Button>
                </>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
