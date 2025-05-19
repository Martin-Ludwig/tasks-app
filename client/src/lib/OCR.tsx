import DateOnly from "@/types/DateOnly";
import { Task, TaskStatus } from "@/types/Task";

// const OCR_API_KEY = "your-mistral-api-key";
// const OCR_API_ENDPOINT = "your-mistral-api-key";

async function sendToMistral(imageAsBase64: string) {
  const response = await fetch("http://localhost:32768/tasks-read-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "base64": imageAsBase64})
  });

  console.log("sendToMistral response:\n", response);
  const data = await response.json();
  return data;
}



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

export { OCRsendRequest , sendToMistral};