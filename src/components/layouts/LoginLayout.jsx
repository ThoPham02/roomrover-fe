import { Outlet } from "react-router-dom";

const LoginLayout = () => {
    return (
        <div className="child-center login-bg">
            <Outlet />
        </div>   
    )
}

export default LoginLayout;