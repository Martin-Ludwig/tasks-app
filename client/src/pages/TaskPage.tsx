import AddTaskForm from "@/components/AddTaskForm";
import TaskList from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DateOnly from "@/types/DateOnly";
import Task from "@/types/Task";
import { useEffect, useState } from "react";
import { OnlineTaskRepository } from "@/repositories/OnlineTaskRepository";
import { OfflineTaskRepository } from "@/repositories/OfflineTaskRepository";
import ScrollableTaskView from "@/components/ui/ScrollableTaskView";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  //const db = OnlineTaskRepository.getInstance();
  const db = OfflineTaskRepository.getInstance();

  useEffect(() => {
    let ignore = false;
    db.fetchTasks().then((tasks) => {
      if (!ignore) {
        setTasks(tasks);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const addTask = (text: string) => {
    const task: Task = {
      id: Date.now(),
      date: DateOnly.today(),
      text,
      completed: false,
    };
    setTasks([...tasks, task]);
    db.createTask(task).then(() => {
      console.log("Task created");
    });
  };

  const toggleTask = (id: number, state: boolean) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
    if (state) {
      db.reopenTask(id).then(() => {
        console.log("Task reopeened");;
      });
    } else {
      db.completeTask(id).then(() => {
        console.log("Task completed");
      });
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    db.deleteTask(id).then(() => {
      console.log("Task deleted");
    });
  };

  return (
    <div className="">

      <AddTaskForm setNewTask={addTask} />

      <ScrollableTaskView 
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
      />

    </div>
  );
}
