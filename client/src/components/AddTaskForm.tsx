import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Neue Aufgabe"
        value={newTask} 
        onChange={e => setNewTaskLocal(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        className="flex-1"
      />
      {/* //className="bg-black text-white" */}
      <Button onClick={onSubmit} >Hinzufügen</Button>
    </div>
  );
}
