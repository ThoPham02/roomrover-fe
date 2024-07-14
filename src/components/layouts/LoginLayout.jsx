import { Outlet } from "react-router-dom";

import Header from "../shares/ui/Header";

const LoginLayout = () => {
    return (
        <>
            <Header />
            <div className="child-center login-bg">
                <Outlet />
            </div>
        </>
    )
}

export default LoginLayout;