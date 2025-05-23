import { OCRsendRequest } from "@/lib/OCR";
import CameraInput from "./CameraInput";
import OcrDialog from "./OcrDialog";
import { useState } from "react";
import Task from "@/types/Task";
import { sendToMistral } from "@/lib/OCR";

interface ImageToTextFeatureProps {
  onImportTasks: (tasks: Task[]) => void;
}

export default function ImageToTextFeature({
  onImportTasks,
}: ImageToTextFeatureProps) {
  const [step, setNextStep] = useState(0);
//   const [openOcrDialog, setOpenOcrDialog] = useState(false);
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [newTasks, setNewTasks] = useState<Task[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleCapture = (file: File) => {
    setCapturedImage(file);
    const fileUrl = URL.createObjectURL(file);
    setImageUrl(fileUrl);
    setNextStep(1);
  };

  const fileGetAsDataUrl = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageToTextProcess = async () => {

    if (true && capturedImage !== null) {
      fileGetAsDataUrl(capturedImage!).then((dataUrl) => {
        const x = sendToMistral(dataUrl);
        console.log("handleImageToTextProcess x: ", x);
      });
    }

    setIsProcessing(true);
    setNextStep(2);
    const tasks = await OCRsendRequest();
    setNewTasks(tasks);
    setIsProcessing(false);
    return tasks;
  };

  const handleTaskImport = () => {
    onImportTasks(newTasks);
    setNextStep(0);
    // setOpenOcrDialog(false);
  };

  return (
    <>
      <OcrDialog
        step={step}
        imageUrl={imageUrl}
        isProcessing={isProcessing}
        newTasks={newTasks}
        onClose={() => {  setNextStep(0) }}
        //nextStep={() => setNextStep(step + 1)}
        onProcess={handleImageToTextProcess}
        onImport={handleTaskImport}
      />

      <div className="absolute bottom-5 right-5 z-100">
        <CameraInput onCapture={handleCapture} />
      </div>
    </>
  );
}
