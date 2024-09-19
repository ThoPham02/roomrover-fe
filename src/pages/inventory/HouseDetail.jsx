import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFillHouseAddFill } from "react-icons/bs";
import {
  FaBed,
  FaBath,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCog,
} from "react-icons/fa";

import * as actions from "../../store/actions";
import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import { Breadcrumbs } from "../../components/ui";
import { formatCurrencyVND } from "../../utils/utils";

const HouseDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.INVENTORY));
    dispatch(actions.getHouseDetail(id));
  }, [dispatch, id]);

  const { houseDetail } = useSelector((state) => state.invent.house);

  // Quản lý trạng thái ảnh chính
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    // Đặt ảnh đầu tiên làm ảnh chính ban đầu nếu có ảnh
    if (houseDetail?.albums?.length > 0) {
      setMainImage(houseDetail.albums[0]);
    }
  }, [houseDetail]);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const hasImages = houseDetail?.albums?.length > 0;

  return (
    <div className="house-detail-page">
      {/* Breadcrumbs for navigation */}
      <Breadcrumbs
        title={BREADCRUMB_DETAIL[ROUTE_PATHS.HOUSE_DETAIL]}
        backRoute={ROUTE_PATHS.INVENTORY}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.INVENTORY]}
        displayName={BREADCRUMB_DETAIL[ROUTE_PATHS.HOUSE_DETAIL]}
      />

      <div className="container mx-auto p-4 bg-white rounded shadow-lg">
        <div className="grid grid-cols-2 gap-8">
          {/* Left: Main image and other images */}
          <div className="house-images">
            {/* Main Image */}
            {hasImages ? (
              <div className="main-image mb-4">
                <img
                  src={mainImage?.url}
                  alt="Main House"
                  className="w-full h-[500px] object-cover rounded-lg"
                />
              </div>
            ) : (
              <div className="w-full h-[500px] flex flex-col justify-center items-center bg-gray-100 rounded-lg">
                <BsFillHouseAddFill size={100} className="text-gray-400" />
                <p className="text-gray-600 mt-4">
                  Không có hình ảnh phòng trọ
                </p>
              </div>
            )}

            {/* Other Images */}
            {hasImages && (
              <div className="grid grid-cols-4 gap-2">
                {houseDetail?.albums?.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`House Image ${index + 1}`}
                    className={`w-full h-[120px] object-cover rounded-md cursor-pointer ${
                      mainImage?.url === image.url
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: House Information */}
          <div className="house-details rounded-lg">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">{houseDetail?.name || 'House Name'}</h2>
            <p className="text-gray-600 text-lg mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-500" /> {houseDetail?.address || 'Address'}
            </p>
            <p className="text-3xl font-semibold text-green-600 mb-4">
              {houseDetail?.price ? `${formatCurrencyVND(houseDetail.price)}` : 'Price not available'}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <FaBed className="text-blue-500 mr-3" />
                <span>{houseDetail?.rooms?.length || 'N/A'} Bedrooms</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <FaBath className="text-green-500 mr-3" />
                <span>{houseDetail?.rooms?.filter(room => room.type === 'bathroom').length || 'N/A'} Bathrooms</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <FaCalendarAlt className="text-yellow-500 mr-3" />
                <span>{houseDetail?.createdAt ? new Date(houseDetail.createdAt * 1000).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <FaCog className="text-red-500 mr-3" />
                <span>{houseDetail?.type || 'N/A'}</span>
              </div>
            </div>

            {/* Description */}
            <div className="house-description mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Description</h3>
              <p>{houseDetail?.description || 'No description available.'}</p>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition">
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseDetail;
