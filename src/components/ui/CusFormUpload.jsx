import { FaPlus } from "react-icons/fa";

const CusFormUpload = ({disabled}) => {
  return (
    <label className="w-40 h-40 mr-4 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md cursor-pointer">
      <FaPlus />
      <span className="text-gray-500 text-center mb-2">Upload</span>
      <input type="file" className="hidden" disabled={disabled}/>
    </label>
  );
};

export default CusFormUpload;
