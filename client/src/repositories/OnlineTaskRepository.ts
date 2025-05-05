import Task, { TaskStatus } from "@/types/Task";
import ITaskRepository from "@/repositories/ITaskRepository";
import DateOnly from "@/types/DateOnly";

export class OnlineTaskRepository implements ITaskRepository {
  private static instance: OnlineTaskRepository;
  private constructor() {}

  fetchTask(from: DateOnly): Promise<Task[]> {
    throw new Error("Method not implemented.");
  }

  static getInstance() {
    if (!OnlineTaskRepository.instance) {
      OnlineTaskRepository.instance = new OnlineTaskRepository();
    }

    return OnlineTaskRepository.instance;
  }

  createTask(task: Task): Promise<void> {
    throw new Error("Method not implemented.");
  }

  completeTask(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  reopenTask(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  deleteTask(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async fetchTasks(): Promise<Task[]> {
    //const response = await fetch("/api/tasks");
    //return await response.json();

    return this.mock;
  }

  private mock: Task[] = [
    {
      id: 1,
      text: "Einkaufen gehen",
      date: DateOnly.from("2025-04-27"),
      status: TaskStatus.Open,
      lastUpdated: new Date("2025-04-26T18:00:00Z"),
    },
    {
      id: 2,
      text: "Workout machen",
      date: DateOnly.from("2025-04-27"),
      status: TaskStatus.Done,
      lastUpdated: new Date("2025-04-27T07:30:00Z"),
    },
    {
      id: 3,
      text: "Projektbericht schreiben",
      date: DateOnly.from("2025-04-27"),
      status: TaskStatus.Open,
    },
    {
      id: 4,
      text: "Freunde treffen",
      date: DateOnly.from("2025-04-27"),
      status: TaskStatus.Open,
    },
    {
      id: 5,
      text: "Auto waschen",
      date: DateOnly.from("2025-04-27"),
      status: TaskStatus.Done,
      lastUpdated: new Date("2025-04-30T11:00:00Z"),
    },
  ];
}