import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./Slice/userSlice";

const store = configureStore({
    reducer: {
        userAuth: userAuth
    }
});

export default store;