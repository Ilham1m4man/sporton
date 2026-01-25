"use client"

import { Button } from "@/app/(landing)/components/ui/button";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import ProductTable from "../../components/products/product-table";
import ProductModal from "../../components/products/product-modal";
import { deleteProduct, getAllProducts } from "@/app/services/product.service";
import { Product } from "@/app/types";
import { toast } from "sonner";
import DeleteModal from "../../components/ui/delete-modal";

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>();
  const [productToDeleteId, setProductToDeleteId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchProducts = async() => {
    try {
      const data = await getAllProducts();
      if (data) setProducts(data)
    } catch (e) {
      console.log("Failed to fetch products", e)
    }
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setProductToDeleteId(id)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async() => {
    if (!productToDeleteId) return
    try {
      await deleteProduct(productToDeleteId)
      fetchProducts()
      toast.success("Product deleted successfully!")
      setIsDeleteModalOpen(false)
      setProductToDeleteId("")
    } catch (err) {
      console.error("Failed to delete product", err)
      toast.error("Failed to delete product")
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null)
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl mb-1">Product Management</h1>
          <p className="opacity-50 text-sm">Manage your inventory, prices and stock.</p>
        </div>
        <Button className="rounded-lg hover:scale-100 px-5 py-2.5 text-sm shadow-sm shadow-primary/30 font-medium" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={18} />
          Add Product
        </Button>
      </div>
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ProductModal
        product={selectedProduct}
        onSuccess={fetchProducts}
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
