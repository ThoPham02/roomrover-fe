import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ title, backRoute, backName, displayName }) => {
  return (
    <div>
      <h1 className="font-semibold text-lg mb-1">{title}</h1>

      {backName && (
        <Breadcrumb>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: backRoute }}
            className="text-blue-700"
          >
            {backName}
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link}>{displayName}</Breadcrumb.Item>
        </Breadcrumb>
      )}
    </div>
  );
};

export default Breadcrumbs;
