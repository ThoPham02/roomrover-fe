import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { FaUser, FaUserPlus } from "react-icons/fa";

import logo from "../../assets/images/logo.png";
import { ROUTE_PATHS } from "../../common";
import User from "../ui/User";

const Header = () => {
  const { isLogined } = useSelector((state) => state.auth);

  return (
    <div>
      <header className="bg-secondary2 p-4 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <Link to={ROUTE_PATHS.ROOT}>
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
            <div className="flex space-x-4">
              <Link to={ROUTE_PATHS.LOGIN}>
                <button
                  className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold flex items-center transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  aria-label="Login"
                >
                  <FaUser className="mr-2" />
                  Login
                </button>
              </Link>
              <Link to={ROUTE_PATHS.REGISTER}>
                <button
                  className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-semibold flex items-center transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-50"
                  aria-label="Register"
                >
                  <FaUserPlus className="mr-2" />
                  Register
                </button>
              </Link>
            </div>
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
