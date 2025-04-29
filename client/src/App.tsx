import TaskPage from './pages/TaskPage';

export default function App() {

  return (
    <div className="max-w-xl mx-auto px-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold pt-10">Cheri Tasks</h1>
        <TaskPage />
      </div>
    </div>
  );
}
