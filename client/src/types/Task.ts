import DateOnly from "./DateOnly";

// Using short-form notation paired with symbols to quickly capture, categorize, and prioritize your thoughts into Notes, Events, and Tasks.
export enum TaskStatus {
  SoftDelete = -1, // Entries that have been deleted.
  Open = 0, // Entries that require you to take action. (Default)
  Completed, // Action has been completed.
  Irrelevant, // Sometimes the things we task ourselves with end up not mattering anymore. Their meaning simply expires or circumstances change. If it no longer matters, then it’s a distraction. Strike it off your list. One less thing to worry about.
  Migrated, //  Tasks that have been moved forward (hence the right arrow >) into your next Monthly Log or into a specific Collection.
  Scheduled, // A Task tied to a date that falls outside of the current month and is therefore moved backward (hence the left arrow <) into the Future Log (this page ) at the front of your book.
  Note,
  Event,
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
    date: DateOnly.from(obj.date),
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