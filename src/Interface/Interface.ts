
export interface ISignup {
    name: string;
    mobile: string;
    email: string;
    password: string;
}

export interface ILogin {
    email: string;
    password: string;
}

// Redux Interfaces
// =======================================================
export interface ReduxInitialStateManage {
    isLoggedIn: boolean;
}

export interface LoginPayload {
    accessToken: string;
    refreshToken: string;
    isLoggedIn: boolean;
    change?: boolean
}
// =======================================================

// response Messages 
// =======================================================
export interface ISuccess {
    success: boolean;
    message: string;
}

export interface ILoginResponse extends ISuccess {
    accessToken: string;
    refreshToken: string;
}

export interface IGetUserData extends ISuccess {
    name: string;
}

export interface IURLShortener extends ISuccess {
    shortURL: string
}

// =======================================================