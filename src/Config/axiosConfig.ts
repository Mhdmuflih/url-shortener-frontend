import axios from "axios";
import store from "../Store/store";
import { loginSuccess, logout } from "../Store/Slice/userSlice";

const baseURL = import.meta.env.VITE_BASE_URL;
console.log(baseURL,' this is base url ');

const UnProtectedAPI = axios.create({
    baseURL: baseURL
});

const ProtectedAPI = axios.create({
    baseURL: baseURL
});

// Add request interceptor
ProtectedAPI.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem("userToken");

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: any) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);


// Add response interceptor
ProtectedAPI.interceptors.response.use(
    (response: any) => response, 
    async (error: any) => {
        const originalRequest = error.config


        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {

            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("userRefreshToken");
                const response: any = await axios.post(`${baseURL}/auth/refresh-token`, { refreshToken });

                if (response.data.success) {
                    store.dispatch(loginSuccess({
                        isLoggedIn: true,
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken
                    }));

                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
                    return ProtectedAPI(originalRequest);
                }
            } catch (refreshError) {
                console.error("Refresh Token Error:", refreshError);
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        }

        // Return the original error if not a 401
        return Promise.reject(error);
    }
);


export { UnProtectedAPI, ProtectedAPI };