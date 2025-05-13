import { Task, rehydrateTasks } from "@/types/Task";

const STORAGE_KEY = import.meta.env.VITE_TASK_STORAGE_KEY;
const STORAGE_ENABLED = import.meta.env.VITE_TASK_OFFLINE_STORAGE_ENABLED;


export class LocalStorage {
  private static readonly STORAGE_KEY = STORAGE_KEY;
  private static readonly STORAGE_ENABLED = STORAGE_ENABLED;

  static setLocalStorage(data: Task[]) {
    if (LocalStorage.STORAGE_ENABLED === "false") return;

    console.log(`Saving to local storage. (${data.length} items)`);
    localStorage.setItem(LocalStorage.STORAGE_KEY, JSON.stringify(data));
  }

  static getLocalStorageRaw(): string {
    if (LocalStorage.STORAGE_ENABLED === "false")
      return "[]";

    console.log("Get raw local storage");
    return localStorage.getItem(LocalStorage.STORAGE_KEY) ?? "[]";
  }

  static getLocalStorage(): Task[] {
    if (LocalStorage.STORAGE_ENABLED === "false")
      return [];

    try {
      const storage = localStorage.getItem(LocalStorage.STORAGE_KEY) ?? "[]";
      const raw = JSON.parse(storage);
      const tasks = rehydrateTasks(raw);
      console.log(`Get local storage. (${tasks.length} items)`);
      return tasks;
    } catch (e) {
      console.error("Fehler beim Parsen von localStorage:", e);
      return [];
    }
  }

  static clearLocalStorage() {
    if (LocalStorage.STORAGE_ENABLED === "false") return;

    console.log("Clear local storage");
    localStorage.removeItem(LocalStorage.STORAGE_KEY);
  }
}
