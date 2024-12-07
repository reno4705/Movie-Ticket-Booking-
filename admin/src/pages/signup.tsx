/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Signup: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignup = async (): Promise<void> => {
        try {
            const response = await fetch(
                `http://localhost:5000/admin/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                    credentials: "include",
                }
            );

            if (response.ok) {
                const data = await response.json();
                // Handle successful signup, e.g., show a success message
                console.log("Admin registration successful", data);

                toast.success("Admin Registration Successful", {
                    position: "top-right",
                });
            } else {
                // Handle signup error
                console.error("Admin registration failed", response.statusText);
                toast.error("Admin Registration Failed", {
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
                <div className="w-[550px] h-[570px] bg-[#ffffff] px-[100px] py-[80px]  [box-shadow:rgba(0,_0,_0,_0.3)_0px_19px_38px,_rgba(0,_0,_0,_0.22)_0px_15px_12px] rounded-xl">
                    <h2 className="text-[2.2rem] text-[#444] mb-[30px] text-center">
                        Admin Sign-up
                    </h2>
                    <div className="mb-[30px] text-[18px] font-normal">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className=" w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc] rounded-[25px]"
                        />
                    </div>

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
                            className=" w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc] rounded-[25px]"
                        />
                    </div>

                    <button
                        onClick={handleSignup}
                        className="w-[150px] bg-[rgb(248,68,100)] border-[none] outline-[none] h-[49px] rounded-[49px] text-[#fff] uppercase font-semibold mx-[0] my-[10px] cursor-pointer [transition:0.5s] ml-[32%] hover:bg-[#007bff]"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </>
    );
};

export default Signup;
