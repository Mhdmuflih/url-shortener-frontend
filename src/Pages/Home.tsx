import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../Store/Slice/userSlice";
import { toast } from "react-toastify";
import { getUserData, urlShort } from "../Services/urlService";
import logo from "../assets/mainLogo.jpeg";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import type { IGetUserData, IURLShortener } from "../Interface/Interface";
import { isValidURL } from "../Validation/urlValidation";

const Home = () => {

    const dispatch: Dispatch<UnknownAction> = useDispatch();
    const navigate: NavigateFunction = useNavigate();
    const [longUrl, setLongUrl] = useState<string>("");
    const [shortUrl, setShortUrl] = useState<string>("");
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const getUser = async () => {
            try {
                const response: IGetUserData = await getUserData();
                if (response.success) {
                    setUserName(response.name);
                } else {
                    toast.error(response.message);
                }
            } catch (error: any) {
                console.log(error.message);
                toast.error(error.message);
            }
        }
        getUser();
    }, []);

    const handleShorten = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!longUrl.trim() && !isValidURL(longUrl)) {
            toast.error("Please enter a valid URL.");
            return;
        }

        try {
            const response: IURLShortener = await urlShort(longUrl);
            if (response.success) {
                setShortUrl(response.shortURL);
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            toast.success("URL copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy URL.");
        }
    };


    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div>


            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">

                <div className="absolute top-4 left-4">
                    <img
                        src={logo}
                        onClick={() => navigate('/')}
                        alt="Company Logo"
                        className="h-14 w-auto rounded-xl shadow-md hover:cursor-pointer"
                    />
                </div>


                <div className="absolute top-4 right-4 flex items-center gap-4">
                    <span className="text-white font-medium hidden sm:inline">Hi, {userName}</span>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
                    >
                        Logout
                    </button>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center animate-pulse">
                    🔗 URL Shortener
                </h1>
                <p className="text-lg text-gray-400 mb-8 text-center max-w-xl">
                    Paste your long URL below and we'll give you a short and shareable version in seconds.
                </p>

                <form
                    onSubmit={handleShorten}
                    className="w-full max-w-xl flex flex-col sm:flex-row gap-4 items-center bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300"
                >
                    <input
                        type="text"
                        placeholder="Enter your long URL"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        className="w-full p-3 rounded-xl bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-green-600 rounded-xl hover:bg-green-700 transition transform duration-300 hover:scale-105 font-semibold"
                    >
                        Shorten
                    </button>

                </form>
                <button
                    onClick={() => navigate("/shortened-urls")}
                    className="mt-6 px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition transform duration-300 hover:scale-105 font-semibold"
                >
                    View My Shortened URLs
                </button>

                {shortUrl && (
                    <div className="mt-6 text-center bg-gray-700 px-4 py-2 rounded-xl shadow animate-fade-in space-y-2">
                        <p className="text-gray-300">Your shortened URL:</p>
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:underline break-all"
                            >
                                {shortUrl}
                            </a>
                            <button
                                onClick={copyToClipboard}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm font-medium transition duration-200"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                )}


                {/* <div className="mt-10 text-sm text-gray-400 text-center">
                    <p>
                        Already have an account?{" "}
                        <a href="/login" className="text-purple-400 hover:underline">
                            Log in
                        </a>
                    </p>
                    <p className="mt-1">
                        New here?{" "}
                        <a href="/signup" className="text-purple-400 hover:underline">
                            Create an account
                        </a>
                    </p>
                </div> */}
            </div>
        </div>
    )
}

export default Home;
