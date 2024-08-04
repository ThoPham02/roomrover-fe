import { Outlet } from "react-router-dom";
import {Header} from "../containers";

const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
