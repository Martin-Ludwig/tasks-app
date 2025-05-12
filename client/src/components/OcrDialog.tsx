import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
// import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import Task from "@/types/Task";

interface OcrDialogProps {
  step: number;
  imageUrl: string;
  isProcessing: boolean;
  newTasks: Task[];
  onClose: () => void;
  onProcess: () => Promise<Task[]>;
  onImport: () => void;
 // nextStep: () => void;
}

export default function OcrDialog({
  step,
  imageUrl,
  isProcessing,
  newTasks,
  onClose,
  onProcess,
  onImport,
//  nextStep
}: OcrDialogProps) {

  return (
    <>
      <Dialog
        open={step > 0}
        onOpenChange={(isOpen) => !isOpen && onClose()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Extract text from image</DialogTitle>
            <DialogDescription>
              This action will extract text from an image.
            </DialogDescription>
          </DialogHeader>

          {/* Dynamischer Inhalt */}
          {step === 1 && <PreviewImageStep imageUrl={imageUrl} />}

          {step === 2 && (
            <ProessImageStep
              isProcessing={isProcessing}
              newTasks={newTasks}
            />
          )}

          {step === 3 && <ImportTasksStep />}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={onClose}>
                Close
              </Button>
            </DialogClose>

            {step < 2 ? (
              <Button onClick={onProcess}>Extract</Button>
            ) : (
              <DialogClose asChild>
                <Button
                  className={isProcessing ? "hidden" : ""}
                  onClick={onImport}
                >
                  Import
                </Button>
              </DialogClose>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function PreviewImageStep({ imageUrl }: { imageUrl: string }) {
  return (
    <>
      {imageUrl !== "" && (
        <div>
          <img className="h-48 w-96 object-cover" src={imageUrl} />
        </div>
      )}
    </>
  );
}

interface ProessImageStepProps {
  isProcessing: boolean;
  newTasks: Task[];
//   onProcess: () => Promise<Task[]>;
}

function ProessImageStep({
  isProcessing,
  newTasks,
//   onProcess,
}: ProessImageStepProps) {
//   useEffect(() => {
//     (async () => {
//       console.log("ProessImageStep: processing started");
//       onProcess();
//     })();
//   }, []);

  return (
    <>
      <div className="not-prose overflow-auto rounded-lg bg-white outline outline-white/5 p-8">
        <div
          className={`flex items-center justify-center 
        ${isProcessing ? "" : "hidden"}`}
        >
          <LoaderCircle className="mr-3 size-5 animate-spin" />
          Processing...
        </div>
        <ul>
          {newTasks.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

// interface ImportTasksStepProps {
//   onImport: () => void;
// }

function ImportTasksStep() {
//   useEffect(() => {
//     (async () => {
//       console.log("ImportTasksStep: adding new tasks started");
//       onImport();
//     })();
//   }, []);

  return (
    <div>
      <div className="not-prose overflow-auto rounded-lg bg-white outline outline-white/5 p-8">
        <div className="flex items-center justify-center">
          <LoaderCircle className="mr-3 size-5 animate-spin" />
          Adding tasks...
        </div>
      </div>
    </div>
  );
}
