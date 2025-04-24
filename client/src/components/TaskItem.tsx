import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import Task from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}


export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
      />
      <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
        {task.text}
      </span>
    </div>
  );
}
