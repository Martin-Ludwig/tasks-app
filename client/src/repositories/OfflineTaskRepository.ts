import DateOnly from "@/types/DateOnly";
import Task from "@/types/Task";
import ITaskRepository from "./ITaskRepository";
import { LocalStorage } from "./LocalStorage";

export class OfflineTaskRepository implements ITaskRepository {
  private static instance: OfflineTaskRepository;
  private constructor() {}

  private tasks: Task[] = [];

  static getInstance() {
    if (!OfflineTaskRepository.instance) {
      OfflineTaskRepository.instance = new OfflineTaskRepository();
    }

    return OfflineTaskRepository.instance;
  }

  fetchTask(from: DateOnly): Promise<Task[]> {
    if (this.tasks.length === 0) {
      const data = LocalStorage.getLocalStorage();
      this.tasks = data;
    }
    
    let ret = this.tasks.filter((task) => task.date.equal(from));
    return Promise.resolve(ret);
  }

  fetchTasks(): Promise<Task[]> {
    if (this.tasks.length === 0) {
      const data = LocalStorage.getLocalStorage();
      this.tasks = data;
    }
    
    //let ret = this.tasks.filter((task) => task.date.equal(from));
    return Promise.resolve(this.tasks);
  }

  createTask(task: Task): Promise<void> {
    this.tasks.push(task);
    return Promise.resolve(LocalStorage.setLocalStorage(this.tasks));
  }

  completeTask(id: number): Promise<void> {
    const index = this.tasks.findIndex((task) => task.id == id);
    if (index !== -1) {
      this.tasks[index].completed = true;
    } else {
      throw new Error("Task not found");
    }

    return Promise.resolve(LocalStorage.setLocalStorage(this.tasks));
  }

  reopenTask(id: number): Promise<void> {
    const index = this.tasks.findIndex((task) => task.id == id);
    if (index !== -1) {
      this.tasks[index].completed = false;
    } else {
      throw new Error("Task not found");
    }

    return Promise.resolve(LocalStorage.setLocalStorage(this.tasks));
  }

  deleteTask(id: number): Promise<void> {
    let ret = this.tasks.filter(task => task.id != id);
    this.tasks = ret;

    return Promise.resolve(LocalStorage.setLocalStorage(this.tasks));
  }
}
