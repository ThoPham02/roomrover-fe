import instance from "./axios";

const api = () => {
    return {
        login: (username, password) => {
            return instance.post("/login", {
                username,
                password,
            });
        },
        register: (username, password) => {
            return instance.post("/register", {
                username,
                password,
            });
        },
        logout: () => {
            return instance.post("/logout");
        },
    };
}

export default api;