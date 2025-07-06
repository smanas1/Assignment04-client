import "./App.css";
import { LibraryMenu } from "./components/modules/menu/LibraryMenu";
import { ModeToggle } from "./components/features/mode-toggle";
import { BookOpen } from "lucide-react";
import { Link, Outlet } from "react-router";
import Footer from "./components/modules/footer/Footer";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <div className="container mx-auto">
        <div className="flex justify-evenly mt-5">
          <Link to={"/"} className="flex items-center">
            <BookOpen size={30} />
            <h1 className="text-lg font-bold ms-2">LibraHub </h1>
          </Link>

          <LibraryMenu />
          <ModeToggle />
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
