import DateOnly from "@/types/DateOnly";
import Task from "../types/Task";

class Data {
  private static instance: Data
  private constructor() {}

  static getInstance() {
    if (!Data.instance) {
        Data.instance = new Data()
    }

    return Data.instance
  }

  data: Task[] = [];

    
  async fetchTasks(): Promise<void> {
    //const response = await fetch("/api/tasks");
    //this.data = await response.json();
    this.data = this.mock;
  }

  addTask(task: Task): void {
    this.data.push(task);
    // optionally send to server
  }

  getTasks(): Task[] {
    return this.data;
  }
  
  private mock: Task[] = [
    {
      id: 1,
      text: "Einkaufen gehen",
      date: DateOnly.from("2025-04-27"),
      completed: false,
      lastUpdated: new Date("2025-04-26T18:00:00Z")
    },
    {
      id: 2,
      text: "Workout machen",
      date: DateOnly.from("2025-04-27"),
      completed: true,
      lastUpdated: new Date("2025-04-27T07:30:00Z")
    },
    {
      id: 3,
      text: "Projektbericht schreiben",
      date: DateOnly.from("2025-04-27"),
      completed: false
    },
    {
      id: 4,
      text: "Freunde treffen",
      date: DateOnly.from("2025-04-27"),
      completed: false
    },
    {
      id: 5,
      text: "Auto waschen",
      date: DateOnly.from("2025-04-27"),
      completed: true,
      lastUpdated: new Date("2025-04-30T11:00:00Z")
    }
  ];
}

export default Data.getInstance();