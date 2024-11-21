import { FaPlus } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import { FiDownloadCloud } from "react-icons/fi";
import { ImageModal } from "..";
import { uploadImage } from "../../../store/services/inventServices";

const CusFormProof = ({ state, onChange, label }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [img, setImg] = useState(state);
  const [showImg, setShowImg] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    setIsUploading(true);

    try {
      const url = await uploadImage(file);

      console.log("url", url);

      setImg(url);
      onChange(url);
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="flex">
      {label && <p className="font-bold min-w-36 mr-2 mt-2">{label}</p>}
      <label className="w-full flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md cursor-pointer">
        {!isUploading ? (
          img ? (
            <div className="flex items-center space-x-2 p-2">
              <FiDownloadCloud className="text-blue-600" />
              <button
                className="text-gray-500 text-center text-blue-600"
                onClick={() => setShowImg(true)}
              >
                Xem chứng từ
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 p-2">
              <FaPlus />
              <span className="text-gray-500 text-center">Upload</span>
              <input type="file" className="hidden" onChange={handleUpload} />
            </div>
          )
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </label>

      <ImageModal
        show={showImg}
        handleClose={() => setShowImg(false)}
        image={img}
      />
    </div>
  );
};

export default CusFormProof;
