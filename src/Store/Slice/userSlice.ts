import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginPayload, ReduxInitialStateManage } from "../../Interface/Interface";

const storedToken: boolean = localStorage.getItem("userToken") ? true : false;

const initialState: ReduxInitialStateManage = {
    isLoggedIn: storedToken
}

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        loginSuccess: (state: ReduxInitialStateManage, action: PayloadAction<LoginPayload>) => {
            localStorage.setItem("userToken", action.payload.accessToken);
            localStorage.setItem("userRefreshToken", action.payload.refreshToken);
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        logout: (state: ReduxInitialStateManage) => {
            localStorage.removeItem("userToken");
            localStorage.removeItem("userRefreshToken");
            state.isLoggedIn = false;
        }
    }
});

export const { loginSuccess, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;