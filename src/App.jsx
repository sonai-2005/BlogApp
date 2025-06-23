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
                    dispatch(login( userData ));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setloading(false));
    }, []);
        if (loading) {
        return <div className="text-white text-center mt-20">Loading...</div>; // ⚠️ do not return null
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
