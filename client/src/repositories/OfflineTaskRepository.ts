import DateOnly from "@/types/DateOnly";
import Task, { TaskStatus } from "@/types/Task";
import ITaskRepository from "./ITaskRepository";
import { LocalStorage } from "./LocalStorage";
import { sample_data } from "./sample_data";

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
      this.init()
    }
    
    let ret = this.tasks.filter((task) => task.date.equal(from));
    return Promise.resolve(ret);
  }

  fetchTasks(): Promise<Task[]> {
    if (this.tasks.length === 0) {
      this.init()
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
      this.tasks[index].status = TaskStatus.Done;
    } else {
      throw new Error("Task not found");
    }

    return Promise.resolve(LocalStorage.setLocalStorage(this.tasks));
  }

  reopenTask(id: number): Promise<void> {
    const index = this.tasks.findIndex((task) => task.id == id);
    if (index !== -1) {
      this.tasks[index].status = TaskStatus.Open;
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

  init() {
    let data = LocalStorage.getLocalStorage();
    
    if (import.meta.env.VITE_SAMPLE_DATA_ENABLED === "true") {
      let raw:Task[] = JSON.parse(sample_data);
      raw.forEach(task => {
        task.date = DateOnly.from(task.date.toString());
      });
      data = [...(raw)];
    }

    this.tasks = data;
    LocalStorage.setLocalStorage(this.tasks);
  }
}
