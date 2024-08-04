import { Outlet } from "react-router-dom";

const ManageLayout = () => {
  return (
    <div className="manage-layout">
      <Outlet />
    </div>
  );
};

export default ManageLayout;
