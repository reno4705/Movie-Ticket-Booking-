/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors: Record<string, string> = {};
        if (!formData.email) {
            validationErrors.email = "Email is required";
        }
        if (!formData.password) {
            validationErrors.password = "Password is required";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                console.log("login res ", response);
                if (response.ok) {
                    toast(response.message, {
                        type: "success",
                        position: "top-right",
                        autoClose: 2000,
                    });
                    navigate("/");
                    // await setCookie('authToken', response.data.authToken)
                    // await setCookie('refreshToken', response.data.refreshToken)
                    // const authToken = await getCookie('authToken');
                    // console.log('My Cookie Value:', authToken);
                    // checkLogin();
                } else {
                    toast(response.message, {
                        type: "error",
                        position: "top-right",
                        autoClose: 2000,
                    });
                }
            })
            .catch((error) => {
                toast(error.message, {
                    type: "error",
                    position: "top-right",
                    autoClose: 2000,
                });
            });
    };

    const checkLogin = async () => {
        // let authToken = await getCookie('authToken')
        // let refreshToken = await getCookie('refreshToken')

        // console.log(authToken, refreshToken)
        await fetch(`http://localhost:5000/auth/checklogin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                console.log("check login res ", response);

                if (response.ok) {
                    // toast(response.message, {
                    //     type: 'success',
                    //     position: 'top-right',
                    //     autoClose: 2000
                    // })

                    window.location.href = "/";
                } else {
                    // toast(response.message, {
                    //     type: 'error',
                    //     position: 'top-right',
                    //     autoClose: 2000
                    // });
                }
            })
            .catch((error) => {
                window.location.href = "/";
                console.log(error);
            });
    };

    return (
        <div>
            <div className="px-[600px] pt-[150px] font-poppins">
                <div className="w-[550px] h-[570px] bg-[#ffffff] px-[100px] py-[80px]  [box-shadow:rgba(0,_0,_0,_0.3)_0px_19px_38px,_rgba(0,_0,_0,_0.22)_0px_15px_12px] rounded-xl">
                    <h2 className="text-[2.2rem] text-[#444] mb-[10px] text-center">
                        Log-in
                    </h2>
                    <form onSubmit={handlesubmit}>
                        <div className="mb-[10px] text-[18px] font-normal">
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className=" w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc] rounded-[25px]"
                            />
                        </div>
                        {errors.email && (
                            <span className="text-red-600 text-[15px] font-normal mb-[20px] ml-2">
                                {errors.email}
                            </span>
                        )}

                        <div className="mb-[10px] text-[18px] font-normal">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc] rounded-[25px]"
                            />
                        </div>
                        {errors.password && (
                            <span className="text-red-600 text-[15px] font-normal mb-[20px] ml-2">
                                {errors.password}
                            </span>
                        )}

                        <Link to="/forgot-password">
                            <p className="ml-2">Forgot Password?</p>
                        </Link>

                        <button
                            type="submit"
                            className="w-[150px] bg-[rgb(248,68,100)] border-[none] outline-[none] h-[49px] rounded-[49px] text-[#fff] uppercase font-semibold mx-[0] my-[10px] cursor-pointer [transition:0.5s] ml-[32%] hover:bg-[#007bff]"
                        >
                            Log in
                        </button>
                    </form>

                    <p className="text-[18px] text-center pt-[15px]">
                        New to BookMyShow?{" "}
                        <Link
                            to="/signup"
                            className="text-[rgb(248,68,100)] underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
