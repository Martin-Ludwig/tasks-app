import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TaskInput from "./ui/TaskInput";

interface AddTaskFormProps {
  setNewTask: (task: string) => void;
}

export default function AddTaskForm({ setNewTask }: AddTaskFormProps) {
  const [newTask, setNewTaskLocal] = useState("");

  const onSubmit = () => {
    if (newTask && newTask.trim() !== "") {
      setNewTask(newTask);
      setNewTaskLocal("");
    }
  };

  return (
    <div className="block relative h-12 mb-8 flex gap-2">
      <TaskInput
        autoFocus 
        type="text"
        placeholder="Neue Aufgabe"
        value={newTask}
        onChange={(e) => setNewTaskLocal(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        className="h-full text-lg "
      />
      <Button
        onClick={onSubmit}
        className="absolute right-2 top-1/2 size-8 -translate-y-1/2"
      >
        +
      </Button>
    </div>
  );
}
