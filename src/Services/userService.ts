import { UnProtectedAPI } from "../Config/axiosConfig";
import type { ILogin, ILoginResponse, ISignup, ISuccess } from "../Interface/Interface";

const handleError = (error: any): never => {
    // Log the error
    console.error("API Error:", error);

    // Check if the error has a response object from the server
    const errorMessage = error.response?.data?.message || "An unexpected error occurred.";

    // Throw a structured error with the message
    throw new Error(errorMessage);
};

export const SingUP = async (formData: ISignup): Promise<ISuccess> => {
    try {
        const response = await UnProtectedAPI.post<ISuccess>('/auth/register', formData)
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}

export const UserLogin = async (formData: ILogin): Promise<ILoginResponse> => {
    try {
        const response = await UnProtectedAPI.post<ILoginResponse>('/auth/login',formData);
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}