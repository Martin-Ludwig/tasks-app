import Task from "../types/Task";
import ITaskRepository from "./ITaskRepository";

class OnlineTaskRepository implements ITaskRepository {

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
        const response = await fetch("/api/tasks");
        return await response.json();
    }
    
}