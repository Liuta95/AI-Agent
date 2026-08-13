import { Sidebar } from "./components/Sidebar";
import { HomePage } from "./components/HomePage";

export default function App() {
  return (
    <div className="h-screen bg-white">
      <div className="flex h-full items-stretch justify-between">
        <Sidebar />
        <HomePage />
      </div>
    </div>
  );
}
