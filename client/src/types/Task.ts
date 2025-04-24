import DateOnly from "./DateOnly";

type Task = {
  id: number;
  text: string;
  date: DateOnly
  completed: boolean;
};

export default Task;