import Task, { TaskStatus } from "@/types/Task";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Square,
  SquareCheck,
  Trash
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../ui/alert-dialog";
import { useState } from "react";

export default function TaskOptions({
  task,
  onChangeState,
  interactionEnabled,
}: {
  task: Task;
  onChangeState: (id: number, status: number) => void;
  interactionEnabled: boolean;
}) {
  const disabled = (status: TaskStatus) => task.status === status;
  const handleChange = (status: TaskStatus) => () =>
    onChangeState(task.id, status);

  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        className={interactionEnabled ? "" : "pointer-events-none opacity-50"}
      >
        <DropdownMenuItem
          disabled={disabled(TaskStatus.Open)}
          onClick={handleChange(TaskStatus.Open)}
        >
          <Square className="w-4 h-4 mr-2" /> Open
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={disabled(TaskStatus.Completed)}
          onClick={handleChange(TaskStatus.Completed)}
        >
          <SquareCheck className="w-4 h-4 mr-2" /> Completed
        </DropdownMenuItem>
        {/* <DropdownMenuItem disabled={disabled(TaskStatus.Migrated)} onClick={handleChange(TaskStatus.Migrated)}>
          <ArrowRight className="w-4 h-4 mr-2" /> Migrieren
        </DropdownMenuItem>
        <DropdownMenuItem disabled={disabled(TaskStatus.Scheduled)} onClick={handleChange(TaskStatus.Scheduled)}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Planen
        </DropdownMenuItem> */}

        {/* <DropdownMenuSeparator />
        <DropdownMenuItem disabled={disabled(TaskStatus.Note)} onClick={handleChange(TaskStatus.Note)}>
          <Minus className="w-4 h-4 mr-2 text-blue-500" /> Note
        </DropdownMenuItem>
        <DropdownMenuItem disabled={disabled(TaskStatus.Event)} onClick={handleChange(TaskStatus.Event)}>
          <CircleSmall className="w-4 h-4 mr-2 text-blue-500" /> Event
        </DropdownMenuItem> */}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={disabled(TaskStatus.Irrelevant)}
          onClick={() => {
            setTimeout(() => setConfirmDeleteDialogOpen(true), 0);
          }}
        >
          <Trash className="w-4 h-4 mr-2 text-red-500" /> Löschen
        </DropdownMenuItem>
      </DropdownMenuContent>

      <AlertDialog
        open={confirmDeleteDialogOpen}
        onOpenChange={setConfirmDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove task from your list?</AlertDialogTitle>
            <AlertDialogDescription>{task.text}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDeleteDialogOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.stopPropagation();
                onChangeState(task.id, TaskStatus.Irrelevant);
                setConfirmDeleteDialogOpen(false);
              }}
            >
              <Trash className="w-4 h-4" /> Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
