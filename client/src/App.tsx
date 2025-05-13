import Logo from "./components/Logo";
import TaskPage from "./pages/TaskPage";
import { LocalStorageMigrate } from "./repositories/LocalStorageMigrate";

export default function App() {
  console.log(`running app in --mode ${import.meta.env.MODE}`);

  if (!LocalStorageMigrate.IsCurrentVersion()) {
    LocalStorageMigrate.migrate();
  }

  return (
    <>
      <div className="h-dvh max-w-xl mx-auto px-4 flex flex-col overflow-hidden">
        <div className="flex gap-4 pt-4 items-baseline px-2">
          <Logo />
          <h1 className="text-4xl font-bold h-full bg-linear-to-b from-title from-10% to-primary bg-clip-text text-transparent">Tasks</h1>
        </div>

        <div className="flex-grow pt-4">
          <TaskPage />
        </div>
      </div>
    </>
  );
}
