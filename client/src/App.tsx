import TaskPage from './pages/TaskPage';

export default function App() {

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">To-Do Liste</h1>
        <TaskPage />
      </div>
    </div>
  );
}
