import { useState, useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authservice from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from "./components/index";
import { Outlet } from 'react-router-dom'; // ✅ Required for nested routes

function App() {
    const [loading, setloading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authservice.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setloading(false));
    }, []);
    if (loading) {
        return (
            <div className="w-full py-8 flex justify-center items-center min-h-[200px]">
                <div className="relative w-17 h-17">
                    <div className="absolute inset-0 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        Loading...
                    </div>
                </div>
            </div>

        )
    }
    else
        return (
            <div className='min-h-screen w-xl flex flex-wrap content-between bg-gray-500'>
                <div className='w-full block'>
                    <Header />
                    <main>
                        <Outlet /> {/* ✅ This renders your Login/Signup/Home/etc */}
                    </main>
                    <Footer />
                </div>
            </div>
        )
}

export default App;
