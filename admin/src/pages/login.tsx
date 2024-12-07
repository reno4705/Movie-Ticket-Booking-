/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleLogin = async (): Promise<void> => {
        try {
            const response = await fetch(`http://localhost:5000/admin/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                // Handle successful login, e.g., store adminAuthToken in a secure way
                console.log("Admin login successful", data);

                toast.success("Admin Login Successful", {
                    position: "top-right",
                });
                navigate("/");
                window.location.reload();
            } else {
                // Handle login error
                console.error("Admin login failed", response.statusText);
                toast.error("Admin Login Failed", {
                    position: "top-right",
                });
            }
        } catch (error) {
            toast.error("An error occurred during registration");
            console.error("An error occurred during registration", error);
        }
    };

    return (
        <>
            <div className="px-[600px] pt-[150px] font-poppins">
                <div className="w-[550px] h-[500px] bg-[#ffffff] px-[100px] py-[80px]  [box-shadow:rgba(0,_0,_0,_0.3)_0px_19px_38px,_rgba(0,_0,_0,_0.22)_0px_15px_12px] rounded-xl">
                    <h2 className="text-[2.2rem] text-[#444] mb-[30px] text-center">
                        Admin Log-in
                    </h2>
                    <div className="mb-[30px] text-[18px] font-normal">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className=" w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc] rounded-[25px]"
                        />
                    </div>
                    <div className="mb-[30px] text-[18px] font-normal">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc] rounded-[25px]"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-[150px] bg-[rgb(248,68,100)] border-[none] outline-[none] h-[49px] rounded-[49px] text-[#fff] uppercase font-semibold mx-[0] my-[10px] cursor-pointer [transition:0.5s] ml-[32%] hover:bg-[#007bff]"
                        >
                        Log in
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;
