import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ROUTE_PATHS, USER_ROLES } from "../../common";
import { login_user } from "../../assets/images";
import * as actions from "../../store/actions";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);
  const [role, setRole] = useState(USER_ROLES.RENTER);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (password !== confirmPassword) {
      setCheckPassword(true);
      event.stopPropagation();
      return;
    } else {
      setCheckPassword(false);
    }
    setValidated(true);

    dispatch(
      actions.register({
        phone,
        password,
        user_role: role,
      })
    );
  };

  const { isLogined } = useSelector((state) => state.auth);

  useEffect(() => {
    isLogined && navigate(ROUTE_PATHS.ROOT);
  }, [isLogined, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-orange w-full max-w-2xl">
        <h2 className="text-navy text-2xl font-bold text-center mb-6">
          Đăng Ký Tài Khoản
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            {/* Họ và Tên */}
            <div>
              <label className="block text-navy font-medium">Họ và Tên</label>
              <input
                {...register("fullName")}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange"
                placeholder="Nhập họ và tên"
              />
              <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-navy font-medium">
                Số điện thoại
              </label>
              <input
                {...register("phoneNumber")}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange"
                placeholder="Nhập số điện thoại"
              />
              <p className="text-red-500 text-sm">
                {errors.phoneNumber?.message}
              </p>
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block text-navy font-medium">Mật khẩu</label>
              <input
                type="password"
                {...register("password")}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange"
                placeholder="Nhập mật khẩu"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            {/* Xác nhận mật khẩu */}
            <div>
              <label className="block text-navy font-medium">
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange"
                placeholder="Xác nhận mật khẩu"
              />
              <p className="text-red-500 text-sm">
                {errors.confirmPassword?.message}
              </p>
            </div>

            {/* Số CCCD */}
            <div>
              <label className="block text-navy font-medium">Số CCCD</label>
              <input
                {...register("cccd")}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange"
                placeholder="Nhập số CCCD"
              />
              <p className="text-red-500 text-sm">{errors.cccd?.message}</p>
            </div>

            {/* Ngày cấp */}
            <div>
              <label className="block text-navy font-medium">Ngày cấp</label>
              <input
                type="date"
                {...register("issueDate")}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange"
              />
              <p className="text-red-500 text-sm">
                {errors.issueDate?.message}
              </p>
            </div>

            {/* Nơi cấp */}
            <div className="col-span-2">
              <label className="block text-navy font-medium">Nơi cấp</label>
              <input
                {...register("issuePlace")}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange"
                placeholder="Nhập nơi cấp"
              />
              <p className="text-red-500 text-sm">
                {errors.issuePlace?.message}
              </p>
            </div>
          </div>

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="w-full bg-orange text-white py-2 rounded-lg hover:bg-orange-dark transition duration-300 mt-4"
          >
            Đăng Ký
          </button>

          {/* Đã có tài khoản? */}
          <div className="text-center mt-4">
            <a href="#" className="text-orange hover:underline">
              Đã có tài khoản? Đăng nhập
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
