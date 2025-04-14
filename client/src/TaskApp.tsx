import { useState } from "react";
import { Container } from "@mui/material";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { Task } from "./types/Task";

export default function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) => {
    const task: Task = { id: Date.now(), text, completed: false };
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
    <Container>
      <h1>To-Do Liste</h1>
      <TaskList
        tasks={tasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
      />
      <AddTaskForm onAddTask={addTask} />
    </Container>
  );
}
