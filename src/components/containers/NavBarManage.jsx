import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import { ROUTE_PATHS } from "../../common";
import { useState } from "react";

const NavBarManage = ({ isExpanded }) => {
  const [isHovered, setIsHovered] = useState(false);
  const menuItems = [
    { icon: "🏠", label: "Home" },
    { icon: "📁", label: "Files" },
    { icon: "⚙️", label: "Settings" },
  ];

  const shouldExpand = isExpanded || isHovered;

  return (
    <div
      className={`relative h-screen transition-width duration-300 ${
        shouldExpand ? "w-260" : "w-80"
      } shadow-custom bg-white`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full text-black">
        <Link to={ROUTE_PATHS.HOME}>
          <div
            className={`flex items-center p-4 ${
              shouldExpand ? "text-left" : "text-center justify-center"
            } h-70`}
          >
            <img
              src={logo}
              alt="logo"
              className={`rounded-full ${
                shouldExpand ? "w-16 h-16" : "w-10 h-10"
              }`}
            />
            {shouldExpand ? (
              <h1 className="text-xl font-bold ml-4 uppercase whitespace-nowrap">
                Nha Tro <br /> HUMG
              </h1>
            ) : null}
          </div>
        </Link>

        <div className="flex-grow">
          <ul className="list-unstyled">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`flex items-center p-4 hover:text-blue-700 cursor-pointer ${
                  shouldExpand ? "justify-start" : "justify-center"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                {shouldExpand && <span className="ml-4">{item.label}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBarManage;
