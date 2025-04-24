import AddTaskForm from "@/components/AddTaskForm";
import TaskList from "@/components/TaskList"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DateOnly from "@/types/DateOnly";
import Task from "@/types/Task";
import { useState } from "react";

export default function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (text: string) => {
        const task: Task = { id: Date.now(), date: DateOnly.from("2022-12-12"), text, completed: false };
        setTasks([...tasks, task]);
      };
    
      const toggleTask = (id: number) => {
        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
      };
    
      const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
      };

    return (
        <div>
            <h1>Task Page</h1>

            <Separator />
            <TaskList tasks={tasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />

            <Separator />
            <AddTaskForm setNewTask={addTask} />

        </div>
    );
}