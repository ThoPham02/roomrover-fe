import { FaPlus } from "react-icons/fa6";

const CreateButton = ({ text, icon, className, onClick }) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 px-4 py-2 max-w-xs bg-cyan-400 text-black rounded-md z-10 ${className}`}
      onClick={onClick}
    >
      {icon ? icon : <FaPlus />}
      {text ? text : "Thêm mới"}
    </button>
  );
};

export default CreateButton;
