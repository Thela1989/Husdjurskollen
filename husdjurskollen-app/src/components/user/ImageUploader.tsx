// src/components/ImageUpload.tsx
import { useState } from "react";

interface ImageUploadProps {
  onImageChange?: (imageUrl: string) => void;
}

function ImageUpload({ onImageChange }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    onImageChange?.(imageUrl);
  };

  return (
    <div className="image-upload">
      <label htmlFor="pet-image">Ladda upp foto</label>

      <input
        id="pet-image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {selectedImage && (
        <img
          src={selectedImage}
          alt="Förhandsvisning"
          className="image-preview"
        />
      )}
    </div>
  );
}

export default ImageUpload;
