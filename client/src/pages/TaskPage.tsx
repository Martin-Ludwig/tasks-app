import AddTaskForm from "@/components/AddTaskForm";
import DateOnly from "@/types/DateOnly";
import { Task, TaskStatus } from "@/types/Task";
import { useEffect, useState } from "react";
import { OfflineTaskRepository } from "@/repositories/OfflineTaskRepository";
import ScrollableTaskView from "@/components/ui/ScrollableTaskView";
import ImageToTextFeature from "@/components/ImageToTextFeature";

export default function TaskPage() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  //const db = OnlineTaskRepository.getInstance();
  const db = OfflineTaskRepository.getInstance();

  useEffect(() => {
    let ignore = false;
    db.fetchTasks().then((tasks) => {
      if (!ignore) {
        setAllTasks(tasks);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const addTask = (text: string, state: number) => {
    const task: Task = {
      id: Date.now(),
      date: DateOnly.today(),
      text: text,
      status: state,
    };
    setAllTasks([...allTasks, task]);
    db.createTask(task).then(() => {
      console.log("Task created");
    });
  };

  const removeTask = (id: number) => {
    const updatedTasks = allTasks.filter((task) => task.id !== id);
    setAllTasks(updatedTasks);
  };

  const changeState = (id: number, state: number) => {
    const updatedTasks = allTasks.map((task) =>
      task.id === id ? { ...task, status: state } : task
    );
    setAllTasks(updatedTasks);
    

    switch (state) {
      case TaskStatus.Open: {
        db.reopenTask(id).then(() => {
          console.log("Task reopeened");
        });
        break;
      }
      case TaskStatus.Completed: {
        db.completeTask(id).then(() => {
          console.log("Task completed");
        });
        break;
      }
      case TaskStatus.Irrelevant: {
        db.deleteTask(id).then(() => {
          console.log("Task deleted");
        });
        removeTask(id); // remove from local task state
        break;
      }
      default: {
        if (state >= 0 && state <= 7) {
          db.changeStatus(id, state).then(() => {
            console.log("Task status changed");
          });
          break;
        }
      }
    }



  };

  const addTasks = (newTasks: Task[]) => {
    for (const task of newTasks) {
      const newTask: Task = {
        id: Date.now() + Math.random(),
        date: task.date,
        text: task.text,
        status: task.status,
      };
      setAllTasks((prevTasks) => [...prevTasks, newTask]);
      db.createTask(task).then(() => {
        console.log("Task created", task.id);
      });
    }
  };

  return (
    <>
      <div className="p-2 mb-4">
        <AddTaskForm setNewTask={addTask} />
      </div>

      <ScrollableTaskView
        tasks={allTasks}
        onChangeState={changeState}
        showToday={true}
      />

      <div className="z-100">
        <ImageToTextFeature onImportTasks={addTasks} />
      </div>
    </>
  );
}
