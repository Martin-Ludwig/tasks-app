import AddTaskForm from "@/components/AddTaskForm";
import DateOnly from "@/types/DateOnly";
import { Task, TaskStatus } from "@/types/Task";
import { useEffect, useState } from "react";
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
      text: text,
      status: TaskStatus.Open,
    };
    setTasks([...tasks, task]);
    db.createTask(task).then(() => {
      console.log("Task created");
    });
  };

  const changeState = (id: number, state: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: state } : task
    );

    setTasks(updatedTasks);
    // simple toggle open/done
    // todo later: support other states

    switch (state) {
      case TaskStatus.Open: {
        db.reopenTask(id).then(() => {
          console.log("Task reopeened");
        });
        break;
      }
      case TaskStatus.Done: {
        db.completeTask(id).then(() => {
          console.log("Task completed");
        });
        break;
      }
      default: {
        console.log("Task status not supported");
        break;
      }
    }
  };

  // const deleteTask = (id: number) => {
  //   setTasks(tasks.filter((task) => task.id !== id));
  //   db.deleteTask(id).then(() => {
  //     console.log("Task deleted");
  //   });
  // };

  return (
    <div className="">
      <AddTaskForm setNewTask={addTask} />

      <ScrollableTaskView
        tasks={tasks}
        onChangeState={changeState}
        //onDeleteTask={deleteTask}
        showToday={true}
      />
    </div>
  );
}
