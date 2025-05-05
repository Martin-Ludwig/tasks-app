import DateOnly from "./DateOnly";

export enum TaskStatus {
  Open = 0, // 	Default/incomplete task
  Done, // Task is finished
  Cancelled, // 	No longer relevant
  Scheduled, // Scheduled for a future date
}

export type Task = {
  id: number;
  text: string;
  date: DateOnly;
  status: number; // Is TaskStatus, but its number for future customization
  lastUpdated?: Date;
};

export function taskFromJSON(obj: any): Task {
  return {
    id: obj.id,
    text: obj.text,
    date: obj.date,
    status: obj.status ?? TaskStatus.Open,
    lastUpdated: obj.lastUpdated ? new Date(obj.lastUpdated) : new Date(Date.now()),
  };
}

export function rehydrateTasks(raw: any[]): Task[] {
  return raw.map((task) => ({
    ...task,
    date: new DateOnly(task.date.year, task.date.month, task.date.day),
    lastUpdated: task.lastUpdated ? new Date(task.lastUpdated) : undefined,
  }));
}

export default Task;