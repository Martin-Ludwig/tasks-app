import { OCRsendRequest } from "@/lib/OCR";
import CameraInput from "./CameraInput";
import OcrDialog from "./OcrDialog";
import { useState } from "react";
import Task from "@/types/Task";

interface ImageToTextFeatureProps {
  onImportTasks: (tasks: Task[]) => void;
}

export default function ImageToTextFeature({
  onImportTasks,
}: ImageToTextFeatureProps) {
  const [step, setNextStep] = useState(0);
//   const [openOcrDialog, setOpenOcrDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [newTasks, setNewTasks] = useState<Task[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleCapture = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    setImageUrl(fileUrl);
    setNextStep(1);
    // setOpenOcrDialog(true);
  };

  const handleImageToTextProcess = async () => {
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
