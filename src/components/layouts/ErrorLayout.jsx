import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

import Header from "../shares/ui/Header";

const ErrorLayout = () => {
  // const showToastMessage = () => {
  //   const myPromise = new Promise((resolve) =>
  //     fetch("https://jsonplaceholder.typicode.com/posts/1")
  //       .then((response) => response.json())
  //       .then((json) => setTimeout(() => resolve(json), 3000))
  //   );
  
  //   toast.promise(myPromise, {
  //     pending: "Promise is pending",
  //     success: "Promise  Loaded",
  //     error: "error",
  //   });
  // };

  return (
    <>
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
    </>
  );
};

export default ErrorLayout;
