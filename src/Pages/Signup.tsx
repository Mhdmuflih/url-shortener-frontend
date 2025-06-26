import { useState, type ChangeEvent } from "react";
import type { ISignup, ISuccess } from "../Interface/Interface";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { SingUP } from "../Services/userService";
import { toast } from "react-toastify";

const Signup = () => {

    const navigate: NavigateFunction = useNavigate();
    const [formData, setFormData] = useState<ISignup>({
        name: "",
        mobile: "",
        email: "",
        password: ""
    });

    const handleToChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleToSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.log(formData, 'this is formData');
            const response: ISuccess = await SingUP(formData);
            if (response.success) {
                toast.success(response.message);
                navigate("/login")
            } else {
                toast.error(response.message);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
                toast.error(error.message);
            }
        }
    }

    const handleToNavigate = () => {
        navigate('/login');
    }

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
                <form
                    onSubmit={handleToSubmit}
                    className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-[1.02]"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6 text-center animate-pulse">
                        Signup Form
                    </h2>

                    <input
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        onChange={handleToChange}
                        className="w-full mb-4 p-3 rounded-xl bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    />
                    <input
                        type="text"
                        placeholder="Enter Mobile"
                        name="mobile"
                        onChange={handleToChange}
                        className="w-full mb-4 p-3 rounded-xl bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    />
                    <input
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        onChange={handleToChange}
                        className="w-full mb-4 p-3 rounded-xl bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        onChange={handleToChange}
                        className="w-full mb-6 p-3 rounded-xl bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Submit
                    </button>

                    <p className="mt-6 text-center text-gray-400 text-sm animate-fade-in">
                        Already have an account?{" "}<span onClick={handleToNavigate} className="text-white hover:text-green-300 hover: cursor-pointer underline transition duration-200"> Sign In </span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup;
