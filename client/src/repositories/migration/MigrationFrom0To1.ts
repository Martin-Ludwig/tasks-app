import DateOnly from "@/types/DateOnly";
import { IMigration } from "@/repositories/LocalStorageMigrate";
import Task, { TaskStatus } from "@/types/Task";
import { LocalStorage } from "../LocalStorage";

interface TaskV0 {
    id: number;
    text: string;
    date: DateOnly;
    completed: boolean;
    lastUpdated?: Date;
}

export class MigrateFrom0To1 implements IMigration {
    version_from = "0";
    version_to = "1";
    
    migrate() {
        console.log(`Migrating local storage from ${this.version_from} to ${this.version_to}`);

        let db = LocalStorage.getLocalStorageRaw();
        if (db === null) {
            return this.version_to;
        }
        
        let tasksV0 = JSON.parse(db.trim()) as TaskV0[];
        let tasksV1: Task[] = [];

        tasksV1 = tasksV0.map((task) => {
            return {
                id: task.id,
                text: task.text,
                date: task.date,
                status: task.completed ? TaskStatus.Completed : TaskStatus.Open,
                lastUpdated: task.lastUpdated,
            };
        });

        LocalStorage.setLocalStorage(tasksV1);

        return this.version_to;
    }
}

export default MigrateFrom0To1;