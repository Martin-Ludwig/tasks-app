import { Camera } from "lucide-react";
import { useEffect, useState } from "react";

interface CameraInputProps {
  onCapture: (file: File) => void;
}

export default function CameraInput({ onCapture }: CameraInputProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (imageFile) {
      onCapture(imageFile);
    }
  }, [imageFile]);

  return (
    <>
      <input
        id="cameraInput"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setImageFile(file);
          }
        }}
        className="hidden"
      />
      <label
        htmlFor="cameraInput"
        className="flex items-center justify-center w-14 h-14 bg-linear-to-br from-primary to-title hover:brightness-110 text-white rounded-full cursor-pointer transition"
      >
        <Camera size={24} />
      </label>
    </>
  );
}
