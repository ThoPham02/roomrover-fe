import { TfiViewList } from "react-icons/tfi";

const HeaderManage = ({ setIsExpanded, isExpanded }) => {
  return (
    <header className="flex items-center justify-between h-70 px-4 bg-gray-100 shadow-md w-full">
      <div className="flex items-center">
        <button
          className="p-2 bg-blue-500 text-white rounded flex items-center justify-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <TfiViewList className="text-xl" />
        </button>
      </div>

      <div className="flex items-center"></div>
    </header>
  );
};

export default HeaderManage;
