"use client";

import { Button } from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankInfoModal from "../../components/bank-info/bank-info-modal";
import { useEffect, useState } from "react";
import DeleteModal from "../../components/ui/delete-modal";
import { toast } from "sonner";
import { deleteBank, getAllBanks } from "@/app/services/bank.service";
import { Banks } from "@/app/types";

export default function BankInformationManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banks, setBanks] = useState<Banks[]>([]);
  const [selectedBank, setSelectedBank] = useState<Banks | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bankToDeleteId, setBankToDeleteId] = useState("");

  const fetchBanks = async () => {
    try {
      const data = await getAllBanks();
      setBanks(data);
    } catch (error) {
      console.error("Failed to fetch bank data", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBank(null);
  };

  const handlEdit = (bank: Banks) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setBankToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handlDeleteConfirm = async () => {
    if (!bankToDeleteId) return;

    try {
      await deleteBank(bankToDeleteId);
      toast.success("Bank info deleted succesfully");
      setBankToDeleteId("");
      setIsDeleteModalOpen(false);
      fetchBanks();
    } catch (error) {
      console.error("Failed to delete bank info");
      toast.error("Failed to delete bank info ");
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl mb-1">Bank Information Management</h1>
          <p className="opacity-50 text-sm">
            Manage destination accounts for customer transfers.
          </p>
        </div>
        <Button className="rounded-lg hover:scale-100 px-5 py-2.5 text-sm shadow-sm shadow-primary/30 font-medium" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={18} />
          Add Bank Account
        </Button>
      </div>
      <BankInfoList banks={banks} onEdit={handlEdit} onDelete={handleDelete} />
      <BankInfoModal
        isOpen={isModalOpen}
        onSuccess={fetchBanks}
        onClose={handleCloseModal}
        bank={selectedBank}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handlDeleteConfirm}
      />
    </div>
  );
}
