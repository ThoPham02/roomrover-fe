import { Outlet } from "react-router-dom";
import { Footer, Header } from "../containers";

const DefaultLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="min-h-screen bg-slate-200">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
