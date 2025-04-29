import { Task, rehydrateTasks } from "@/types/Task";

export class LocalStorage {
  private static readonly STORAGE_KEY = "tasks_records";

  static setLocalStorage(data: Task[]) {
    localStorage.setItem(LocalStorage.STORAGE_KEY, JSON.stringify(data));
  }

  static getLocalStorage(): Task[] {
    try {
      const storage = localStorage.getItem(LocalStorage.STORAGE_KEY) ?? "[]";
      const raw = JSON.parse(storage);
      return rehydrateTasks(raw);
    } catch (e) {
      console.error("Fehler beim Parsen von localStorage:", e);
      return [];
    }
  }

  static clearLocalStorage() {
    localStorage.removeItem(LocalStorage.STORAGE_KEY);
  }
}
