import DateOnly from "@/types/DateOnly";
import { Task, TaskStatus } from "@/types/Task";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function OCRsendRequest(): Promise<Task[]> {
  console.log("request image text...");
  await wait(3000);

  const newTasks = JSON.parse(sample_data.trim());

  console.log("... done");

  return newTasks.map((task: any, index: number) => ({
    id: Date.now() + index,
    text: task.text,
    date: DateOnly.today(),
    status: TaskStatus.Open,
    lastUpdated: new Date(),
  }));
}

const sample_data = `[
    {
      "text": "Zutaten einkaufen"
    },
    {
      "text": "Wäsche waschen"
    },
    {
      "text": "Termin mit Arzt vereinbaren"
}]`;

export { OCRsendRequest };