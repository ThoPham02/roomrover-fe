import { FaPlus } from "react-icons/fa6";

const CreateButton = ({ text, icon, className, onClick }) => {
  return (
    <button
      className={`flex items-center justify-center bg-blue-500 text-white rounded-md py-2 px-4 rounded hover:bg-blue-600 z-10 transition duration-300 min-w-36 ${className}`}
      onClick={onClick}
    >
      {icon ? icon : <FaPlus />}
      {text ? text : "Thêm mới"}
    </button>
  );
};
// w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300
export default CreateButton;
