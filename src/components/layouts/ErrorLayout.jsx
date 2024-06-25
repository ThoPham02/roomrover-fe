import { useNavigate } from "react-router-dom";
import { AUTH_PATHS } from "../../features/auth/const";

export default function ErrorLayout() {
    const navigate = useNavigate();

    return (
        <div >
            <div className="mt-10" onClick={() => navigate(AUTH_PATHS.IN)}>
                Quay lại
            </div>
        </div>
    );
}