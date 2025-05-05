import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Layouts/Sidebar";

function App() {
  return (
    <div className="flex font-sans">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
