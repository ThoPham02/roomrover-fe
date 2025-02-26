import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";
import { ROUTE_PATHS } from "../../common";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogined } = useSelector((state) => state.auth);

  useEffect(() => {
    isLogined && navigate(ROUTE_PATHS.ROOT);
  }, [isLogined, navigate]);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate số điện thoại (9-10 số, bắt đầu bằng số 0)
    const phoneRegex = /^0\d{8,9}$/;
    if (!phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    // Validate mật khẩu (tối thiểu 6 ký tự)
    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Đăng nhập thành công với:", { phone, password });
      const form = e.currentTarget;

      if (form.checkValidity() === false) {
        e.stopPropagation();
        return;
      }

      dispatch(actions.login({ phone, password }));
    }
  };

  return (
    <div className="flex items-center justify-center mt-24">
      <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-orange w-96">
        <h2 className="text-navy text-2xl font-bold text-center mb-6">
          Đăng Nhập
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Số điện thoại */}
          <div className="mb-4">
            <label className="block text-navy font-medium">Số điện thoại</label>
            <input
              type="text"
              className={`w-full p-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-orange`}
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Mật khẩu */}
          <div className="mb-4">
            <label className="block text-navy font-medium">Mật khẩu</label>
            <input
              type="password"
              className={`w-full p-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-orange`}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full bg-orange text-white py-2 rounded-lg hover:bg-orange-dark transition duration-300"
          >
            Đăng Nhập
          </button>

          {/* Quên mật khẩu */}
          <div className="text-center mt-4">
            <a href="#" className="text-orange hover:underline">
              Quên mật khẩu?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
