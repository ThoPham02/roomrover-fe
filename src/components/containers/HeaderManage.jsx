import { TfiViewList } from "react-icons/tfi";
import { LuBellRing } from "react-icons/lu";
import { useSelector } from "react-redux";

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
  const { isLogined } = useSelector((state) => state.auth);

  console.log("isLogined", isLogined);

  return (
    <div>
      <header
        className={`fixed flex items-center justify-between h-70 px-4 bg-secondary2 shadow-md z-20 transition-width duration-300 ${
          isExpanded ? "width260px" : "width80px"
        }`}
      >
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
      <div className="h-70"></div>
    </div>
  );
};

export default HeaderManage;
