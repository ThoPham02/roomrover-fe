import { Outlet } from "react-router-dom";
import { Header } from "../containers";

const DefaultLayout = () => {
  return (
    <div className="min-h-screen h-full w-screen bg-slate-200">
      <Header />
      <div className="bg-white h-full w-full p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
