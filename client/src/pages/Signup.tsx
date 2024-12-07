/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface FormData {
    name: string;
    email: string;
    password: string;
    city: string;
}

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        city: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);
        setErrors({});

        const validationErrors: Record<string, string> = {};
        if (!formData.name) {
            validationErrors.name = "name is required";
        }
        if (!formData.email) {
            validationErrors.email = "email is required";
        }
        if (!formData.password) {
            validationErrors.password = "password is required";
        }
        if (!formData.password) {
            validationErrors.city = "city is required";
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log(formData);

        fetch("http://localhost:5000/auth/register", {
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
            if (response.ok) {
                toast.success(response.message, {
                    position: "top-right",
                });
                window.location.href = "/login";
            } else {
                toast.error(response.message, {
                    position: "top-right",
                });
            }
        })
        .catch((err) => {
            toast.error(err.message, {
                position: "top-right",
            });
            console.log(err);
        });
    };

    return (
        <div>
            <div className="px-[600px] pt-[150px] font-poppins">
                <div className="w-[550px] h-[570px] bg-[#ffffff] px-[100px] py-[80px]  [box-shadow:rgba(0,_0,_0,_0.3)_0px_19px_38px,_rgba(0,_0,_0,_0.22)_0px_15px_12px] rounded-xl">
                    <h2 className="text-[2.2rem] text-[#444] mb-[10px] text-center">
                        Sign-up
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-[10px] text-[18px] font-normal">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="block  w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc] rounded-[25px]"
                            />
                            {errors.name && (
                                <span className="text-red-600 text-[15px] font-normal mb-[20px] ml-2">
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        <div className="mb-[10px] text-[18px] font-normal">
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc] rounded-[25px]"
                            />
                            {errors.email && (
                                <span className="text-red-600 text-[15px] font-normal mb-[20px] ml-2">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div className="mb-[10px] text-[18px] font-normal">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc] rounded-[25px]"
                            />
                            {errors.password && (
                                <span className="text-red-600 text-[15px] font-normal mb-[20px] ml-2">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <div className="mb-[10px] text-[18px] font-normal">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                className="block  w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc] rounded-[25px]"
                            />
                            {errors.city && (
                                <span className="text-red-600 text-[15px] font-normal mb-[20px] ml-2">
                                    {errors.city}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-[150px] bg-[rgb(248,68,100)] border-[none] outline-[none] h-[49px] rounded-[49px] text-[#fff] uppercase font-semibold mx-[0] my-[10px] cursor-pointer [transition:0.5s] ml-[32%] hover:bg-[#007bff]"
                        >
                            Sign up
                        </button>
                    </form>

                    <p className="text-[18px] text-center pt-[15px]">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-[rgb(248,68,100)] underline"
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
