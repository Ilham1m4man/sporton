import { Button } from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import { Category, Product } from "@/app/types";
import { getAllCategories } from "@/app/services/category.service";
import { toast } from "sonner";
import { createProduct, updateProduct } from "@/app/services/product.service";
import { getImageURL } from "@/app/lib/api";

type TProductModalProps = {
  product?: Product | null
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void
};

type ProductFormData = {
  name: string;
  price: number;
  stock: number;
  category_id: string;
  description: string;
}

export default function ProductModal({ product, isOpen, onClose, onSuccess }: TProductModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    stock: 0,
    category_id: "",
    description: "",
  });

  const isEditMode = !!product;

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

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
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price.toString());
      data.append("stock", formData.stock.toString());
      data.append("category_id", formData.category_id);
      data.append("description", formData.description);
      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditMode) {
        await updateProduct(product.id, data);
      } else {
        await createProduct(data);
      }

      // Reset Form Data
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        category_id: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);

      toast.success(
        isEditMode
          ? "Product updated successfully!"
          : "Product created successfully!",
      );

      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(
        isEditMode ? "Failed to update product" : "Failed to create product",
        error,
      );
      toast.error(
        isEditMode ? "Failed to update product" : "Failed to create product",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category_id: product.category.id,
        stock: product.stock,
      });
      setImagePreview(product.image_url ? getImageURL(product.image_url) : null);
    } else if (isOpen) {
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        category_id: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [isOpen, product]);

  useEffect(() => {
    fetchCategories();
  }, []);
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Product" : "Add New Product"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ImageUploadPreview
              label="Product Image"
              value={imagePreview}
              onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="input-group-admin">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e. g. Running Shoes"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="input-group-admin">
                <label htmlFor="productPrice">Price (IDR)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="e. g. 500000"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group-admin">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="e. g. 100"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-group-admin">
              <label htmlFor="category">Category</label>
              <select
                name="category_id"
                id="category_id"
                value={formData.category_id}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="input-group-admin">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={7}
            placeholder="Product Details..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <Button
          className="ml-auto mt-3 rounded-lg font-medium hover:scale-100 shadow-sm shadow-primary/30"
          onClick={handleSubmit}
          disabled={isSubmitting}
          size="small"
          type="submit"
        >
          {isEditMode ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Modal>
  );
}
