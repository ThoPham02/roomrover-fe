import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import { Breadcrumbs } from "../../components/ui";

const HouseUpdate = ({ houseId }) => {
  const dispatch = useDispatch();

  const [house, setHouse] = useState({
    name: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    area: "",
    price: "",
    status: "",
    description: "",
    albums: [],
    mainImageIndex: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.INVENTORY));
    dispatch(actions.getHouseDetail(houseId));
  }, [dispatch, houseId]);

  const { houseDetail } = useSelector((state) => state.invent.house);

  setHouse(houseDetail);

  const validateField = (name, value) => {
    if (value.trim() === "") {
      return "Không được để trống thông tin";
    }
    if (name === "price" && isNaN(value)) {
      return "Giá phải là số";
    }
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHouse((prevHouse) => ({
      ...prevHouse,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAlbums = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setHouse((prevHouse) => ({
      ...prevHouse,
      albums: [...prevHouse.albums, ...newAlbums],
    }));
  };

  const handleMainImageSelect = (index) => {
    setHouse((prevHouse) => ({
      ...prevHouse,
      mainImageIndex: index,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    [
      "name",
      "address",
      "province",
      "district",
      "ward",
      "area",
      "price",
    ].forEach((field) => {
      const error = validateField(field, house[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    console.log(house);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <>
      <Breadcrumbs
        title={BREADCRUMB_DETAIL[ROUTE_PATHS.INVENTORY]}
        backRoute={ROUTE_PATHS.INVENTORY}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.INVENTORY]}
        displayName={BREADCRUMB_DETAIL["UPDATE"]}
      />
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-8">
            <div>
              {/* Tên nhà trọ */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tên nhà trọ:</label>
                <input
                  type="text"
                  name="name"
                  value={house.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>

              {/* Địa chỉ cụ thể */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Địa chỉ cụ thể:
                </label>
                <input
                  type="text"
                  name="address"
                  value={house.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}
              </div>

              {/* Khu vực */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Tỉnh/Thành:
                  </label>
                  <input
                    type="text"
                    name="province"
                    value={house.province}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.province && (
                    <p className="text-red-500">{errors.province}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Huyện/Quận:
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={house.district}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.district && (
                    <p className="text-red-500">{errors.district}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Xã/Phường:</label>
                  <input
                    type="text"
                    name="ward"
                    value={house.ward}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.ward && <p className="text-red-500">{errors.ward}</p>}
                </div>
              </div>

              {/* Diện tích */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Diện tích (m²):
                </label>
                <input
                  type="number"
                  name="area"
                  value={house.area}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.area && <p className="text-red-500">{errors.area}</p>}
              </div>

              {/* Giá thuê */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Giá thuê (VNĐ):
                </label>
                <input
                  type="text"
                  name="price"
                  value={house.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.price && <p className="text-red-500">{errors.price}</p>}
                {house.price && <p>{formatCurrency(house.price)}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Mô tả:</label>
                <textarea
                  name="description"
                  value={house.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="4"
                />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tải lên ảnh:</label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                  className="w-full p-2"
                />
              </div>

              {house.albums.length > 0 ? (
                <div>
                  <p className="mb-2">Chọn ảnh chính:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {house.albums.map((image, index) => (
                      <div
                        key={index}
                        className={`relative cursor-pointer ${
                          house.mainImageIndex === index
                            ? "border-4 border-blue-500"
                            : ""
                        }`}
                        onClick={() => handleMainImageSelect(index)}
                      >
                        <img
                          src={image.url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-[120px] object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-lg">
                  <p className="text-gray-600">
                    Chưa có hình ảnh nào được tải lên
                  </p>
                </div>
              )}
            </div>
          </div>

          {loading && <p className="text-center">Đang cập nhật...</p>}
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
            >
              Cập nhật nhà trọ
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default HouseUpdate;
