import { Checkbox } from "@/components/ui/checkbox";
import Task, { TaskStatus } from "../types/Task";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  ArrowLeft,
  ArrowRight,
  CircleSmall,
  Dot,
  EllipsisVertical,
  Minus,
  X,
} from "lucide-react";
import StatusIconMap from "./StatusIconMap";

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
  return (
    <div
      className="flex items-center gap-2 m-2 p-1 text-lg snap-start hover:bg-card-foreground"
      onClick={() => onChangeState(task.id, toggleDoneOpenTaskStatus(task))}
    >
      <Checkbox
        id="taskCeckbox"
        className="hidden border-muted-foreground"
        checked={task.status === TaskStatus.Completed}
        onCheckedChange={() =>
          onChangeState(task.id, toggleDoneOpenTaskStatus(task))
        }
        onClick={(e) => e.stopPropagation()} // verhindert doppelten Trigger
      />

      <StatusIconMap state={task.status} />

      <label
        htmlFor="taskCheckbox"
        className={`
          ${
            ![TaskStatus.Open, TaskStatus.Event, TaskStatus.Note].includes(
              task.status
            )
              ? "text-muted-foreground"
              : ""
          }
          ${task.status === TaskStatus.Completed ? "line-through" : ""}
          cursor-default
        `}
      >
        {task.text}
      </label>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            onClick={(e) => e.stopPropagation()}
            className="ml-auto p-1 text-muted-foreground hover:text-blue focus:border-none rounded"
          >
            <EllipsisVertical className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem
            disabled={task.status === TaskStatus.Open}
            onClick={() => {
              onChangeState(task.id, TaskStatus.Open);
            }}
          >
            <Dot className="w-4 h-4 mr-2" />
            Open
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={task.status === TaskStatus.Completed}
            onClick={() => {
              onChangeState(task.id, TaskStatus.Completed);
            }}
          >
            <X className="w-4 h-4 mr-2" />
            Completed
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={task.status === TaskStatus.Migrated}
            onClick={() => {
              onChangeState(task.id, TaskStatus.Migrated);
            }}
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Migrieren
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={task.status === TaskStatus.Scheduled}
            onClick={() => {
              onChangeState(task.id, TaskStatus.Scheduled);
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Planen
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={task.status === TaskStatus.Note}
            onClick={() => {
              onChangeState(task.id, TaskStatus.Note);
            }}
          >
            <Minus className="w-4 h-4 mr-2 text-blue-500" />
            Note
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={task.status === TaskStatus.Event}
            onClick={() => {
              onChangeState(task.id, TaskStatus.Event);
            }}
          >
            <CircleSmall className="w-4 h-4 mr-2 text-blue-500" />
            Event
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={task.status === TaskStatus.Irrelevant}
            onClick={() => {
              onChangeState(task.id, TaskStatus.Irrelevant);
            }}
          >
            <X className="w-4 h-4 mr-2 text-red-500" />
            Löschen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
