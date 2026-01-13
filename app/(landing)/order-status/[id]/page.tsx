import { getTransactionById } from "@/app/services/transaction.service";
import OrderConfirmed from "../../components/order-status/order-confirmed";
import OrderRejected from "../../components/order-status/order-rejected";
import OrderSubmitted from "../../components/order-status/order-submitted";
import { TPageProps } from "../../product/[id]/page";

export default async function OrderStatus({ params }: TPageProps) {
  const { id } = await params;
  const transaction = await getTransactionById(id);
  return (
    <main className="bg-gray-100 min-h-[80vh]">
      <div className="max-w-5xl mx-auto py-20">
        <h1 className="text-5xl font-bold text-center mb-11">Order Status</h1>
        {transaction.status === "pending" && <OrderSubmitted />}
        {transaction.status === "paid" && <OrderConfirmed />}
        {transaction.status === "rejected" && <OrderRejected />}
      </div>
    </main>
  );
}
