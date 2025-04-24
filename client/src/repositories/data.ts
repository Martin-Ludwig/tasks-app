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
    const response = await fetch("/api/tasks");
    this.data = await response.json();
  }

  addTask(task: Task): void {
    this.data.push(task);
    // optionally send to server
  }

  getTasks(): Task[] {
    return this.data;
  }
}

export default Data.getInstance();