import DateOnly from "@/types/DateOnly";
import Task from "@/types/Task";
import TaskList from "@/components/TaskList";
import { useEffect, useState, useRef } from "react";
import { Separator } from "./separator";
import Inspiration from "../Inspiration";

interface TaskItemProps {
  tasks: Task[];
  onChangeState: (id: number, state: number) => void;
  //onDeleteTask: (id: number) => void;
  showToday: boolean;
}

export default function ScrollableTaskView({
  tasks,
  onChangeState,
  //onDeleteTask,
  showToday,
}: TaskItemProps) {
  const [uniqueDates, setUniqueDates] = useState<DateOnly[]>([]);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const rawDates = tasks.map((task) => task.date);
    const allDates = showToday ? [DateOnly.today(), ...rawDates] : rawDates;

    const uniqueSortedDates = removeDuplicateDates(allDates).sort((a, b) =>
      a.compareTo(b)
    );

    console.log(uniqueSortedDates);

    setUniqueDates(uniqueSortedDates);
    setHasScrolled(false);
  }, [tasks]);

  const todayRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hasScrolled && scrollContainerRef.current && todayRef.current) {
      todayRef.current.scrollIntoView({
        behavior: "auto",
        block: "start",
      });

      setHasScrolled(true);
    }
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="h-100 overflow-y-scroll snap-y snap-proximity scrollbar-hidden"
    >
      <div className="p-2">
        {uniqueDates.map((date) => {
          return (
            <div
              key={date.toString()}
              className={`snap-start my-5 p-5 flex-shrink-0 flex flex-col shadow rounded-lg bg-card ${
                  !date.equal(DateOnly.today()) ? "" : ""
                }`}
            >
              {/* <Separator className="my-4" /> */}
              <h2
                ref={date.equal(DateOnly.today()) ? todayRef : null}
                className={`sticky top-0 bg-card z-1 text-xl font-bold text-center ${
                  !date.equal(DateOnly.today()) ? "text-muted-foreground" : ""
                }`}
              >
                {date.print()}
              </h2>
              <TaskList
                tasks={tasks.filter((task) => task.date.equal(date))}
                onChangeState={onChangeState}
                //onDeleteTask={onDeleteTask}
              />
            </div>
          );
        })}

        <Separator className="my-16" />
        <Inspiration count={3} />
        <Separator className="mt-16 mb-32" />

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