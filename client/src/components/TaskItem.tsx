import { Checkbox } from "@/components/ui/checkbox";
import Task, { TaskStatus } from "../types/Task";

interface TaskItemProps {
  task: Task;
  onChangeState: (id: number, state: number) => void;
  //onDelete: (id: number) => void;
}

function toggleDoneOpenTaskStatus(task: Task): number {
  return task.status == TaskStatus.Open ? TaskStatus.Done : TaskStatus.Open;
}

export default function TaskItem({ task, onChangeState }: TaskItemProps) {
  return (
    <div
      className="flex items-center gap-2 m-2 p-1 text-lg snap-start hover:bg-card-foreground"
      onClick={() => onChangeState(task.id, toggleDoneOpenTaskStatus(task))}
    >
      <Checkbox
      className="border-muted-foreground"
        checked={task.status === TaskStatus.Done}
        onCheckedChange={() =>
          onChangeState(task.id, toggleDoneOpenTaskStatus(task))
        }
        onClick={(e) => e.stopPropagation()} // verhindert doppelten Trigger
      />
      <span
        className={`${
          task.status === TaskStatus.Done
            ? "line-through text-muted-foreground"
            : ""
        } cursor-default`}
      >
        {task.text}
      </span>
    </div>
  );
}
