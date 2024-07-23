import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

import Header from "../shares/ui/Header";

const ErrorLayout = () => {
  return (
    <div>
      <Header />
      <div className="child-center login-bg">
        <div className="error-content">
          <h1>
            SORRY <br />
            PAGE ERROR!
          </h1>
          <Link to="/" title="Trở về trang chủ" className="btn btn-primary">
            Trở về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorLayout;
