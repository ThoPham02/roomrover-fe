import { Outlet } from "react-router-dom";
import { useState } from "react";

import { HeaderManage, NavBarManage } from "../containers";

const ManageLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex h-screen">
      <NavBarManage isExpanded={isExpanded} />
      <div className="flex flex-col flex-grow">
        <HeaderManage isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <main className="flex-grow p-4 min-w-[1000px] max-w-[1300px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ManageLayout;
