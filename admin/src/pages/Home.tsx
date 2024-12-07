/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    const checkAdminAuthentication = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/admin/checklogin",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            if (response.ok) {
                // Admin is authenticated
                setIsAdminAuthenticated(true);
            } else {
                // Admin is not authenticated
                setIsAdminAuthenticated(false);
            }
        } catch (error) {
            console.error(
                "An error occurred during admin authentication check",
                error
            );
            setIsAdminAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAdminAuthentication();
    }, []);
    return (
        <div className="font-['Times_New_Roman',_Times,_sei2f]">
            {isAdminAuthenticated ? (
                <>
                    <h1 className="text-[54px] font-bold text-center mt-20">
                        ADMIN PANEL
                    </h1>
                    <div className="flex gap-[40px] my-[50px] mx-[500px] items-center justify-center">
                        <div
                            onClick={() => navigate("/pages/movie/createmovie")}
                            className="flex items-center justify-center [box-shadow:rgba(0,_0,_0,_0.19)_0px_10px_20px,_rgba(0,_0,_0,_0.23)_0px_6px_6px] w-[300px] h-[150px] bg-[rgb(248,68,100)] text-center text-white rounded-[10px] font-bold text-[38px] cursor-pointer [transition:0.5s] hover:bg-[#007bff]"
                        >
                            Add Movie
                        </div>
                        <div
                            onClick={() => navigate("/pages/screen")}
                            className="flex items-center justify-center [box-shadow:rgba(0,_0,_0,_0.19)_0px_10px_20px,_rgba(0,_0,_0,_0.23)_0px_6px_6px] w-[300px] h-[150px] bg-[rgb(248,68,100)] text-center text-white rounded-[10px] font-bold text-[38px] cursor-pointer [transition:0.5s] hover:bg-[#007bff]"
                        >
                            Add Screen
                        </div>
                    </div>
                    <div className="flex gap-[40px] my-[100px] mx-[500px] items-center justify-center">
                        <div
                            onClick={() => navigate("/pages/schedule")}
                            className="flex items-center justify-center [box-shadow:rgba(0,_0,_0,_0.19)_0px_10px_20px,_rgba(0,_0,_0,_0.23)_0px_6px_6px] w-[300px] h-[150px] bg-[rgb(248,68,100)] text-center text-white rounded-[10px] font-bold text-[38px] cursor-pointer [transition:0.5s] hover:bg-[#007bff]"
                        >
                            Add Schedule
                        </div>
                        <div
                            onClick={() => navigate("/pages/movie/addceleb")}
                            className="flex items-center justify-center [box-shadow:rgba(0,_0,_0,_0.19)_0px_10px_20px,_rgba(0,_0,_0,_0.23)_0px_6px_6px] w-[300px] h-[150px] bg-[rgb(248,68,100)] text-center text-white rounded-[10px] font-bold text-[38px] cursor-pointer [transition:0.5s] hover:bg-[#007bff]"
                        >
                            Add Celebrity
                        </div>
                    </div>
                </>
            ) : (
                <h1 className="text-[54px] font-bold text-center mt-20">
                    Log in to view admin panel
                </h1>
            )}
        </div>
    );
};

export default Home;
