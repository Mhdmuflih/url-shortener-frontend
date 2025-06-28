import { useState, type ChangeEvent } from "react";
import type { ILogin, ILoginResponse } from "../Interface/Interface";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { UserLogin } from "../Services/userService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { loginSuccess } from "../Store/Slice/userSlice";
import { LoginValidation } from "../Validation/loginValidation";

const Login = () => {

    const dispatch: Dispatch<UnknownAction> = useDispatch();
    const navigate: NavigateFunction = useNavigate();
    const [formData, setFormData] = useState<ILogin>({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        const validation = LoginValidation({ ...formData, [name]: value }, name);
        setErrors((prevErrors: { [key: string]: string }) => ({ ...prevErrors, [name]: validation.errors[name] || "" }));
    }

    const handleLoginSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {

            const validation = LoginValidation(formData);
            setErrors(validation.errors);

            if (!validation.valid) {
                return;
            }

            const response: ILoginResponse = await UserLogin(formData);
            if (response.success) {
                dispatch(loginSuccess({
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken,
                    isLoggedIn: true
                }))
                toast.success(response.message);
                navigate("/");
            } else {
                toast.error(response.message)
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
                toast.error(error.message);
            }
        }
    }

    const handleToNavigate = () => {
        navigate('/registration')
    }

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
                <form
                    onSubmit={handleLoginSubmit}
                    className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-[1.02]"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6 text-center animate-pulse">
                        Login to Your Account
                    </h2>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={handleLoginChange}
                        className="w-full mb-4 p-3 rounded-xl bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mb-3 animate-fade-in">{errors.email}</p>
                    )}
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        onChange={handleLoginChange}
                        className="w-full mb-6 p-3 rounded-xl bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mb-3 animate-fade-in">{errors.password}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Log In
                    </button>

                    <p className="mt-6 text-center text-gray-400 text-sm">
                        Don’t have an account?{" "} <span onClick={handleToNavigate} className="text-green-400 hover:text-green-300 hover: cursor-pointer underline transition duration-200">Create one here</span>
                    </p>
                </form>
            </div>

        </div>
    )
}

export default Login;
