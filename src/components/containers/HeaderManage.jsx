import { TfiViewList } from "react-icons/tfi";
import { LuBellRing } from "react-icons/lu";

import User from "../ui/User";

const HeaderButton = ({ icon, onClick }) => {
  return (
    <button
      className="p-3 text-black rounded-circle flex items-center justify-center hover:bg-blue-400 ml-2"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

const HeaderManage = ({ setIsExpanded, isExpanded }) => {
  return (
    <header className="flex items-center justify-between h-70 px-4 bg-secondary2 shadow-md w-full">
      <div className="flex items-center">
        <HeaderButton
          icon={<TfiViewList className="text-xl" />}
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <HeaderButton
          icon={<LuBellRing className="text-xl" />}
          onClick={() => console.log("Notification button clicked")}
        />
      </div>

      <User />
    </header>
  );
};

export default HeaderManage;
