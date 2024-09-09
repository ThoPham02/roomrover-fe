import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/images/logo.png";
import { ROUTE_PATHS } from "../../common";
import User from "../ui/User";

const Header = () => {
  const { isLogined } = useSelector((state) => state.auth);

  return (
    <div>
      <header className="h-24 w-full bg-secondary2 fixed z-10 px-4">
        <div className="container mx-auto h-full flex items-center justify-between">
          <Link to={ROUTE_PATHS.HOME}>
            <div className="flex items-center">
              <img src={logo} alt="logo" className="h-20 w-20 rounded-full" />
              <h1 className="text-2xl font-bold ml-2 uppercase">
                Nhà Trọ
                <br />
                HUMG
              </h1>
            </div>
          </Link>
          {!isLogined ? (
            <nav>
              <ul className="flex items-center space-x-4">
                <li>
                  <Link to={ROUTE_PATHS.LOGIN}>Đăng Nhập</Link>
                </li>
                <li>
                  <Link to={ROUTE_PATHS.REGISTER}>Đăng Ký</Link>
                </li>
              </ul>
            </nav>
          ) : (
            <User />
          )}
        </div>
      </header>
      <div className="h-24"></div>
    </div>
  );
};

export default Header;
