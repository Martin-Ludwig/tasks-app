import AddTaskForm from "./AddTaskForm";

interface TaskFormProps {
  onAddTask: (text: string) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  return (
    <AddTaskForm onAddTask={onAddTask} />
  );
}
