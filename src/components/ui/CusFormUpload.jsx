import { FaPlus } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";

const CusFormUpload = ({ disabled, handleUpload, isUploading }) => {
  return (
    <label className="w-40 h-40 mr-4 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md cursor-pointer">
      {!isUploading ? (
        <>
          <FaPlus />
          <span className="text-gray-500 text-center mb-2">Upload</span>
          <input
            type="file"
            className="hidden"
            multiple
            disabled={disabled}
            onChange={handleUpload}
          />
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </label>
  );
};

export default CusFormUpload;
