import { ProtectedAPI } from "../Config/axiosConfig";
import type { IGetUserData, IURLShortener } from "../Interface/Interface";

const handleError = (error: any): never => {
    // Log the error
    console.error("API Error:", error);

    // Check if the error has a response object from the server
    const errorMessage = error.response?.data?.message || "An unexpected error occurred.";

    // Throw a structured error with the message
    throw new Error(errorMessage);
};


export const urlShort = async (longURL: string): Promise<IURLShortener> => {
    try {
        const response = await ProtectedAPI.post<IURLShortener>('/url/shorten', {originalURL: longURL});
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}

export const getUserData = async (): Promise<IGetUserData> => {
        try {
        const response = await ProtectedAPI.get<IGetUserData>('/users/user-data');
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}