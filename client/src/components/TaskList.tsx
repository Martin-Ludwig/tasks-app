import TaskItem from './TaskItem';
import Task from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number, state: boolean) => void;
  onDeleteTask: (id: number) => void;
}

export default function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  return (
    <div className="my-6">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}
