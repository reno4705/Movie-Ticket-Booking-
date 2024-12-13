/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, toast } from "react-toastify";

const Resetpassword: React.FC = () => {
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate();
    const { id, token } = useParams();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:5000/auth/reset-password/${id}/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
        });
        const done = await res.json();
        if (done.ok) {
            toast.success("Your Password is Successfully Updated")
            // alert("Your Password is Successfully Updated");
            navigate("/login");
        }
        else {
            toast.error("Error Occured Please Try Again Later!")
            // alert("Error Occured Please Try Again Later!");
            console.log(done)
        }
    };
    return (
        <div>
            <div className="px-[600px] pt-[150px] font-poppins">
                <div className="w-[550px] h-[570px] bg-[#ffffff] px-[100px] py-[80px]  [box-shadow:rgba(0,_0,_0,_0.3)_0px_19px_38px,_rgba(0,_0,_0,_0.22)_0px_15px_12px] rounded-xl">
                    <h2 className="text-[2.2rem] text-[#444] mb-[10px] text-center">
                        Reset Password
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-[10px] text-[18px] font-normal">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter new Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className=" w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc] rounded-[25px]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-[150px] bg-[rgb(248,68,100)] border-[none] outline-[none] h-[49px] rounded-[49px] text-[#fff] uppercase font-semibold mx-[0] my-[10px] cursor-pointer [transition:0.5s] ml-[32%] hover:bg-[#007bff]"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Resetpassword;
