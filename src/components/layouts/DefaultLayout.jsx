import { Outlet } from "react-router-dom";
import {Header} from "../containers";

const DefaultLayout = () => {
  return (
    <div className="h-screen w-screen bg-slate-50">
      <Header />
      <div className="default-body">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
