"use client";

import { Button } from "@/app/(landing)/components/ui/button";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import CategoryModal from "../../components/categories/category-modal";
import CategoryTable from "../../components/categories/category-table";
import { toast } from "sonner";
import {
  deleteCategory,
  getAllCategories,
} from "@/app/services/category.service";
import { Category } from "@/app/types";
import DeleteModal from "../../components/ui/delete-modal";

export default function CategoryManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categories, setCategories] = useState<Category[]>([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategoryToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDeleteId) return;
    try {
      await deleteCategory(categoryToDeleteId);
      fetchCategories();
      toast.success("Category deleted successfully");
      setIsDeleteModalOpen(false);
      setCategoryToDeleteId("");
    } catch (error) {
      console.error("Failed to delete category", error);
      toast.error("Failed to delete category");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl mb-1">Category Management</h1>
          <p className="opacity-50 text-sm">Organize your products into categories.</p>
        </div>
        <Button className="rounded-lg hover:scale-100 px-5 py-2.5 text-sm shadow-sm shadow-primary/30 font-medium" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={18} />
          Add Category
        </Button>
      </div>
      <CategoryTable
        categories={categories}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <CategoryModal
        category={selectedCategory}
        onSuccess={fetchCategories}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
