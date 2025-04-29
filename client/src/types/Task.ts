import DateOnly from "./DateOnly";

export type Task = {
  id: number;
  text: string;
  date: DateOnly;
  completed: boolean;
  lastUpdated?: Date;
};

export function taskFromJSON(obj: any): Task {
  return {
    id: obj.id,
    text: obj.text,
    date: obj.date,
    completed: obj.completed,
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