import { EllipsisVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import TaskCheckbox from "./TaskCheckbox";
import StatusIconMap from "./StatusIconMap";
import TaskOptions from "./TaskOptions";
import Task, { TaskStatus } from "@/types/Task";

interface TaskItemProps {
  task: Task;
  onChangeState: (id: number, state: number) => void;
  //onDelete: (id: number) => void;
}

function toggleDoneOpenTaskStatus(task: Task): number {
  return task.status == TaskStatus.Open
    ? TaskStatus.Completed
    : TaskStatus.Open;
}

export default function TaskItem({ task, onChangeState }: TaskItemProps) {
    const [open, setOpen] = useState(false);
    const [interactionEnabled, setInteractionEnabled] = useState(false);
  
    useEffect(() => {
      if (open) {
        const timeout = setTimeout(() => setInteractionEnabled(true), 500);
        return () => clearTimeout(timeout);
      } else {
        setInteractionEnabled(false);
      }
    }, [open]);
  
    const toggleStatus = () => {
      onChangeState(task.id, toggleDoneOpenTaskStatus(task));
    };
  
    return (
      <div
        className="flex items-center gap-2 m-2 p-1 text-lg snap-start hover:bg-card-foreground"
        onClick={toggleStatus}
      >
        <StatusIconMap state={task.status} />

        <TaskCheckbox task={task} onToggle={toggleStatus} />
  
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className="ml-auto p-1 text-muted-foreground hover:text-blue focus:border-none rounded"
            >
              <EllipsisVertical className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <TaskOptions
            task={task}
            onChangeState={onChangeState}
            interactionEnabled={interactionEnabled}
          />
        </DropdownMenu>
      </div>
    );
  }