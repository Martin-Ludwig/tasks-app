import Task, { TaskStatus } from "@/types/Task";
import { Checkbox } from "../ui/checkbox";

export default function TaskCheckbox({
    task,
    onToggle,
  }: {
    task: Task;
    onToggle: () => void;
  }) {
    return (
      <>
        <Checkbox
          id="taskCheckbox"
          className="hidden border-muted-foreground"
          checked={task.status === TaskStatus.Completed}
          onCheckedChange={onToggle}
          onClick={(e) => e.stopPropagation()}
        />
        <label
          htmlFor="taskCheckbox"
          className={`
            ${![TaskStatus.Open, TaskStatus.Event, TaskStatus.Note].includes(task.status) ? "text-muted-foreground" : ""}
            ${task.status === TaskStatus.Completed ? "line-through" : ""}
            cursor-default
          `}
        >
          {task.text}
        </label>
      </>
    );
  }