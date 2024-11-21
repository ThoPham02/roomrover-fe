import { Link } from "react-router-dom";
import { FaRegFlag } from "react-icons/fa6";

const Breadcrumbs = ({ backRoute, backName, displayName }) => {
  return (
    <div className="d-flex align-items-center py-2">
      <FaRegFlag
        className={`${displayName ? "text-blue-700" : "text-black"} text-2xl`}
      />
      <nav aria-label="breadcrumb" className="ms-2">
        <ol className="breadcrumb m-0 p-0 d-flex list-unstyled">
          {backName && (
            <li className="breadcrumb-item">
              {displayName ? (
                <Link to={backRoute} className="text-blue-700 font-bold">
                  {backName}
                </Link>
              ) : (
                <span className="text-black font-bold">{backName}</span>
              )}
            </li>
          )}
          {displayName && (
            <li
              className="breadcrumb-item active text-muted"
              aria-current="page"
            >
              {displayName}
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
