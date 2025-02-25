import React from "react";

const Footer = () => {
  return (
    <footer className="bg-navy-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0 md:w-1/2">
            <h2 className="text-xl font-semibold mb-2">TRỌ GIÁ RẺ</h2>
            <p className="text-sm">
              Chúng tôi giúp bạn tìm kiếm phòng trọ, căn hộ và nhà thuê nhanh
              chóng, chính xác với thông tin minh bạch và hình ảnh thực tế. Dễ
              dàng kết nối với chủ trọ, cập nhật tin đăng mới nhất và lựa chọn
              nơi ở phù hợp với nhu cầu của bạn.
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
      </div>
    </footer>
  );
};

export default Footer;
