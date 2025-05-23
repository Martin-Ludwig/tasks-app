import { useState } from "react";
import { Button } from "@/components/ui/button";
import TaskInput from "../ui/TaskInput";
import { Plus } from "lucide-react";
import { TaskStatus } from "@/types/Task";

interface AddTaskFormProps {
  setNewTask: (task: string, state: number) => void;
}

export default function AddTaskForm({ setNewTask }: AddTaskFormProps) {
  const [newTask, setNewTaskLocal] = useState("");

  const onSubmit = (state: number) => {
    if (newTask && newTask.trim() !== "") {
      setNewTask(newTask, state);
      setNewTaskLocal("");
    }
  };

  return (
    <div className="block relative h-12 flex gap-2">
      {/* TODO: fix text going behind add button */}
      <TaskInput
        autoFocus
        type="text"
        placeholder="Neue Aufgabe"
        value={newTask}
        onChange={(e) => setNewTaskLocal(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit(TaskStatus.Open)}
        className="h-12 full text-lg pr-30"
      />
      <div className="flex gap-1 absolute top-1/2 -translate-y-1/2 right-2">
        {/* <Button
          onClick={() => onSubmit(TaskStatus.Note)}
          className="rounded-full size-8 bg-blue-400 p-0"
        >
          <Minus size={20} />
        </Button>
        <Button
          onClick={() => onSubmit(TaskStatus.Event)}
          className="rounded-full size-8 bg-blue-400 p-0"
        >
          <CircleSmall size={20} />
        </Button> */}
        <Button onClick={() => onSubmit(TaskStatus.Open)} className="rounded-full size-8 p-0">
          <Plus size={20} />
        </Button>
      </div>
    </div>
  );
}
