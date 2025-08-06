import { useEffect, useState } from "react";
import { getShortedURL } from "../Services/urlService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ShortedURL = () => {
    const [urls, setUrls] = useState<{ originalURL: string; shortURL: string }[]>([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const getAllShortedURL = async () => {
            try {
                const response = await getShortedURL();
                if (response.success) {
                    setUrls(response.URLs.reverse());
                    console.log(response.URLs.reverse());
                } else {
                    console.log("Failed to load URLs");
                }
            } catch (error: any) {
                console.log(error.message);
            }
        };
        getAllShortedURL();
    }, []);

    const copyToClipboard = (text: string) => {
        try {
            navigator.clipboard.writeText(text);
            toast.success("URL copied to clipboard!");
        } catch (error) {
            toast.error("Failed to copy URL.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white py-10">
            <div className="max-w-3xl mx-auto p-4">
                
                {/* 🔙 Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className="mb-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition"
                >
                    ← Back to Home
                </button>

                <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
                    📄 Shortened URLs
                </h1>

                <div className="space-y-4">
                    {urls.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 shadow-lg rounded-2xl p-4 border border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between"
                        >
                            <div className="mb-2 sm:mb-0">
                                <p className="text-sm text-gray-400">Original URL:</p>
                                <p className="text-blue-400 break-all">{item.originalURL}</p>
                                <p className="text-sm text-gray-400 mt-2">Short URL:</p>
                                <a
                                    href={item.shortURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-400 hover:underline break-all"
                                >
                                    {item.shortURL}
                                </a>
                            </div>
                            <button
                                onClick={() => copyToClipboard(item.shortURL)}
                                className="mt-2 sm:mt-0 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
                            >
                                Copy
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShortedURL;
