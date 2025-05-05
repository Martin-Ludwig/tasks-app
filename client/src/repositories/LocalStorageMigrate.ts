import { MigrateFrom0To1 } from "@/repositories/migration/MigrationFrom0To1";

export interface IMigration {
  version_from: string;
  version_to: string;
  migrate: () => string; // returns new version string
}


const STORAGE_KEY = `${import.meta.env.VITE_TASK_STORAGE_KEY}_storage_version`;

export class LocalStorageMigrate {
  private static readonly STORAGE_KEY = STORAGE_KEY;
  private static readonly LATEST_VERSION = "1";

  private static getCurrentVersion() {
    if (import.meta.env.VITE_TASK_OFFLINE_STORAGE_ENABLED === "false") 
      return LocalStorageMigrate.LATEST_VERSION;

    return localStorage.getItem(LocalStorageMigrate.STORAGE_KEY) ?? "0";
  }

  static IsCurrentVersion() {
    if (import.meta.env.VITE_TASK_OFFLINE_STORAGE_ENABLED === "false")
      return true;

    return (
      LocalStorageMigrate.getCurrentVersion() ===
      LocalStorageMigrate.LATEST_VERSION
    );
  }

  static migrate() {
    if (import.meta.env.VITE_TASK_OFFLINE_STORAGE_ENABLED === "false") return;

    const currentVersion = LocalStorageMigrate.getCurrentVersion();

    if (currentVersion === null) {
      LocalStorageMigrate.setNewVersion(LocalStorageMigrate.LATEST_VERSION);
      return;
    }
    switch (currentVersion) {
      case "0":
        let version = new MigrateFrom0To1().migrate();
        LocalStorageMigrate.setNewVersion(version);
        break;
      default:
        console.log("migration default");
        break;
    }
  }

  static setNewVersion(to: string) {
    if (import.meta.env.VITE_TASK_OFFLINE_STORAGE_ENABLED === "false") return;

    localStorage.setItem(LocalStorageMigrate.STORAGE_KEY, to);
  }
}
