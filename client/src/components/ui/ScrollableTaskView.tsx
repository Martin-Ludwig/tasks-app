import DateOnly from "@/types/DateOnly";
import Task from "@/types/Task";
import TaskList from "@/components/TaskList";
import { Separator } from "@/components/ui/separator";

interface TaskItemProps {
  tasks: Task[];
  onToggleTask: (id: number, state: boolean) => void;
  onDeleteTask: (id: number) => void;
}

export default function ScrollableTaskView({
  tasks,
  onToggleTask,
  onDeleteTask,
}: TaskItemProps) {

  const uniqueDates = [...new Set(tasks.map((task) => task.date.toString()))];


  return (
    <div className="h-100 bg-red-50 overflow-y-scroll snap-y snap-mandatory px-4 scrollbar-hidden ">
      {uniqueDates.map((date) => {

        return (
          <div key={date} className="snap-center py-10 flex-shrink-0 flex flex-col"
          >
            {/* <Separator className="my-4" /> */}
            <h2 className="text-xl font-bold text-center">{date}</h2>
            <TaskList
              tasks={tasks.filter((task) =>
                task.date.equal(DateOnly.from(date))
              )}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
            />
          </div>
        );
      })}
    </div>
  );
}
