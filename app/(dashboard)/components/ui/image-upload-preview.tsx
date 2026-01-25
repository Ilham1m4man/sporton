import Image from "next/image";
import { useRef } from "react";
import { FiEdit, FiUploadCloud } from "react-icons/fi";

type TImageUploadPreviewProps = {
  label?: string;
  value?: string | null;
  onChange: (file: File) => void;
  className?: string;
};

export default function ImageUploadPreview({
  label,
  value,
  onChange,
  className,
}: TImageUploadPreviewProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange(file);
    }
  };
  return (
    <div className={className}>
      <label htmlFor="imageInput" className="block text-sm font-medium text-dark mb-2">{label}</label>
      <div
        onClick={handleImageClick}
        className="border-2 border-dashed border-primary/30 text-primary rounded-xl bg-primary-light/20 h-48 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary-light/40 transition-colors overflow-hidden relative"
      >
        {value ? (
          <Image
            src={value}
            alt="preview product"
            className="w-full h-full object-cover"
            width={190}
            height={190}
          />
        ) : (
          <>
            <FiUploadCloud className="text-primary" size={24} />
            <span className="text-sm font-medium">Click to Upload</span>
          </>
        )}
        <input
          id="imageInput"
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
