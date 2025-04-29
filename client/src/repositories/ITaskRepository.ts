import DateOnly from "../types/DateOnly";
import Task from "../types/Task";

export default interface ITaskRepository {
    fetchTask(from: DateOnly): Promise<Task[]>;
    fetchTasks(from: DateOnly, to?: DateOnly): Promise<Task[]>;
    createTask(task: Task): Promise<void>;
    completeTask(id: number): Promise<void>;
    reopenTask(id: number): Promise<void>;
    deleteTask(id: number): Promise<void>;
}