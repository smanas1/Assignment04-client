import "./App.css";
import { LibraryMenu } from "./components/modules/menu/LibraryMenu";
import { ModeToggle } from "./components/features/mode-toggle";
import { BookOpen } from "lucide-react";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-evenly mt-5">
        <div className="flex items-center">
          <BookOpen size={30} />
          <h1 className="text-lg font-bold ms-2">Library Management </h1>
        </div>
        <LibraryMenu />
        <ModeToggle />
      </div>
      <Outlet />
    </div>
  );
}

export default App;
