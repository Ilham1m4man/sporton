import { Button } from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import { Banks } from "@/app/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateBank, createBank } from "@/app/services/bank.service";

type TBankInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  bank: Banks | null;
  onSuccess: () => void;
};

export default function BankInfoModal({
  isOpen,
  onClose,
  bank,
  onSuccess,
}: TBankInfoModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Banks>>({
    account_name: "",
    account_number: "",
    bank_name: "",
  });

  const isEditMode = !!bank;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateBank(bank.id, formData);
      } else {
        await createBank(formData);
      }

      setFormData({
        account_name: "",
        account_number: "",
        bank_name: "",
      });
      onSuccess?.();
      onClose();
      toast.success(
        isEditMode
          ? "Bank info updated successfully"
          : "Bank info created succesfully",
      );
    } catch (error) {
      console.error(
        isEditMode
          ? "Failed to update bank info"
          : "Failed to create bank info",
        error,
      );
      toast.error(
        isEditMode
          ? "Failed to update bank info"
          : "Failed to create bank info",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        account_name: bank.account_name,
        account_number: bank.account_number,
        bank_name: bank.bank_name,
      });
    } else if (isOpen) {
      setFormData({
        account_name: "",
        account_number: "",
        bank_name: "",
      });
    }
  }, [bank, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Bank Account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 w-full">
          <div className="input-group-admin">
            <label htmlFor="bank_name">Bank Name</label>
            <input
              type="text"
              id="bank_name"
              name="bank_name"
              placeholder="e. g. Mandiri, BCA, BRI"
              value={formData.bank_name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-admin">
            <label htmlFor="account_number">Account Number</label>
            <input
              type="text"
              id="account_number"
              name="account_number"
              placeholder="123124344234234"
              value={formData.account_number}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-admin">
            <label htmlFor="account_name">Account Name / Holder</label>
            <input
              type="text"
              id="account_name"
              name="account_name"
              placeholder="Holder Name as registered on the account"
              value={formData.account_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          className="ml-auto mt-3 rounded-lg font-medium hover:scale-100 shadow-sm shadow-primary/30"
          type="submit"
          size="small"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isEditMode ? "Update Bank Info" : "Create Bank Info"}
        </Button>
      </form>
    </Modal>
  );
}
