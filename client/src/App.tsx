import Logo from "./components/Logo";
import TaskPage from "./pages/TaskPage";
import { LocalStorageMigrate } from "./repositories/LocalStorageMigrate";

export default function App() {
  if (!LocalStorageMigrate.IsCurrentVersion()) {
    LocalStorageMigrate.migrate();
  }

  return (
    <div className="max-w-xl mx-auto px-4">
      <div className="flex flex-col pt-10">
        <Logo />
        <h1 className="text-3xl font-bold">Tasks</h1>
      </div>
      <div className="flex flex-col pt-10">
        <TaskPage />
      </div>
    </div>
  );
}
