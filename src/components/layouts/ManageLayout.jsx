import { Outlet } from "react-router-dom";
import { useState } from "react";

import { HeaderManage, NavBarManage } from "../containers";
import Breadcrumbs from "../ui/Breadcrumbs";

const ManageLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex h-full">
      <NavBarManage isExpanded={isExpanded} />
      <div className="relative flex flex-col flex-grow bg-gray-100">
        <HeaderManage isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <main className="flex-grow p-4 min-w-[1000px] max-w-[1300px] w-full mx-auto">
          <Breadcrumbs />
          <div className="p-3 bg-white rounded">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageLayout;
