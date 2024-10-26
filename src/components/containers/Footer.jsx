import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0 md:w-1/2">
            <h2 className="text-xl font-semibold mb-2">
              Nhà Trọ Sinh Viên HUMG
            </h2>
            <p className="text-sm">
              Chúng tôi hỗ trợ các bạn sinh viên HUMG tìm kiếm nhà trọ phù hợp
              quanh khu vực trường đại học Mỏ - Địa Chất, giúp bạn nhanh chóng
              có nơi ở tiện nghi và an toàn.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-6">
            <a href="#!" className="text-sm hover:underline mb-2 md:mb-0">
              Về chúng tôi
            </a>
            <a href="#!" className="text-sm hover:underline mb-2 md:mb-0">
              Quy định nhóm
            </a>
            <a href="#!" className="text-sm hover:underline">
              Liên hệ
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-white mt-6">
          &copy; {new Date().getFullYear()} PhamBaTho. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
