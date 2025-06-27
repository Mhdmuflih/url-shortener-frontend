import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 text-center">
            <h1 className="text-7xl font-bold animate-bounce">404</h1>
            <p className="text-2xl mt-4">Oops! Page not found.</p>
            <p className="text-gray-400 mt-2">The page you're looking for doesn't exist or has been moved.</p>
            <button
                onClick={() => navigate('/')}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300"
            >
                Go Back Home
            </button>
        </div>
    );
};

export default NotFoundPage;
