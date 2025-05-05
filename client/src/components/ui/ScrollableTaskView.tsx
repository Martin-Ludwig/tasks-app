import DateOnly from "@/types/DateOnly";
import Task from "@/types/Task";
import TaskList from "@/components/TaskList";
import { useEffect, useState } from "react";

interface TaskItemProps {
  tasks: Task[];
  onChangeState: (id: number, state: number) => void;
  onDeleteTask: (id: number) => void;
  showToday: boolean;
}

export default function ScrollableTaskView({
  tasks,
  onChangeState,
  onDeleteTask,
  showToday,
}: TaskItemProps) {
  const [uniqueDates, setUniqueDates] = useState<DateOnly[]>([]);

  useEffect(() => {
    const rawDates = tasks.map((task) => task.date);
    const allDates = showToday ? [DateOnly.today(), ...rawDates] : rawDates;

    const uniqueSortedDates = removeDuplicateDates(allDates).sort((a, b) =>
      a.compareTo(b)
    );

    setUniqueDates(uniqueSortedDates);
  }, [tasks]);

  return (
    <div className="h-100 overflow-y-scroll snap-y snap-proximity  px-4 scrollbar-hidden">
      <div className="">
        {uniqueDates.map((date) => {
          return (
            <div
              key={date.toString()}
              className="snap-start py-5 flex-shrink-0 flex flex-col"
            >
              {/* <Separator className="my-4" /> */}
              <h2
                className={`text-xl font-bold text-center ${
                  !date.equal(DateOnly.today()) ? "text-muted-foreground" : ""
                }`}
              >
                {date.print()}
              </h2>
              <TaskList
                tasks={tasks.filter((task) => task.date.equal(date))}
                onChangeState={onChangeState}
                onDeleteTask={onDeleteTask}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  function removeDuplicateDates(dates: DateOnly[]): DateOnly[] {
    const seen: DateOnly[] = [];
    return dates.filter((date) => {
      const isDuplicate = seen.some((d) => d.equal(date));
      if (!isDuplicate) seen.push(date);
      return !isDuplicate;
    });
  }
}
