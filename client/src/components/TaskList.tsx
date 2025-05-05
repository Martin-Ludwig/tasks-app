import TaskItem from './TaskItem';
import Task from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onChangeState: (id: number, state: number) => void;
  //onDeleteTask: (id: number) => void;
}

export default function TaskList({ tasks, onChangeState }: TaskListProps) {
  return (
    <div className="my-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onChangeState={onChangeState}
          //onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}
