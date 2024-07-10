import { Outlet } from "react-router-dom";

import Header from "../shares/ui/Header";

const ManageLayout = () => {
    return (
        <div className="manage-layout">
            <Header />
            <div className="manage-layout__content">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
}

export default ManageLayout;