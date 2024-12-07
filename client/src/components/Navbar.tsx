/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUserCircle, BiSearch } from "react-icons/bi";
import { RiArrowDropDownFill } from "react-icons/ri";
import logo from "../assets/logo.png";
import LocationPopup from "./LocationPopup";

interface User {
    email: string;
    name: string;
    password: string;
    bookings: string[];
    city: string;
}

const Navbar: React.FC = () => {
    const [showLocationPopup, setShowLocationPopup] =
        React.useState<boolean>(false);
    const [user, setUser] = React.useState<User>();
    const [loggenIn, setLoggenIn] = React.useState<boolean>(false);

    const navigate = useNavigate();

    const getUser = () => {
        fetch("http://localhost:5000/auth/getuser", {
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
                if (response.ok) {
                    setUser(response.data);
                    setLoggenIn(true);
                } else {
                    setLoggenIn(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        getUser();
    }, []);

    const handlelogout = async () => {
        fetch("http://localhost:5000/auth/logout", {
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
            console.log(response)
            if (response.ok) {
                navigate("/login");
            }

        })
        .catch((error) => {
            console.log(error)
            navigate("/login");
        })
    };

    return (
        <div className="bg-[#333444] text-[white] flex justify-between items-center px-[20px] py-[10px]">
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="logo"
                    width={200}
                    height={100}
                    className="h-[30px] mr-[10px]"
                />
                <div className="flex items-center bg-[white] rounded-[4px] ml-[10px] w-[500px] p-[3px]">
                    <BiSearch className="mr-[5px] text-[1.2rem] text-[#333444]" />
                    <input
                        type="text"
                        placeholder="Search For a Movie"
                        className="border-transparent outline-transparent bg-none text-black w-[500px] p-[7px]"
                    />
                </div>
            </div>
            <div className="flex items-center justify-end">
                <p
                    className="flex items-center mx-[20px] my-0 cursor-pointer"
                    onClick={() => setShowLocationPopup(true)}
                >
                    {user ? user.city : "Select city"}
                    <RiArrowDropDownFill className="text-[20px]" />
                </p>
                {!loggenIn ? (
                    <Link
                        to="/login"
                        className="bg-[rgb(248,68,100)] text-[white] border-[none] rounded-[4px] px-[10px] py-[5px] no-underline mr-[10px]"
                    >
                        LogIn
                    </Link>
                ) : (
                    <Link
                        to="/"
                        className="bg-[rgb(248,68,100)] text-[white] border-[none] rounded-[4px] px-[10px] py-[5px] no-underline mr-[10px]"
                        onClick={handlelogout}
                    >
                        Logout
                    </Link>
                )}

                <Link
                    to="/profile"
                    className="no-underline text-[white] mr-[20px]"
                >
                    <BiUserCircle className="text-[1.5rem]" />
                </Link>
            </div>
            {showLocationPopup && (
                <LocationPopup setShowLocationPopup={setShowLocationPopup} loggedin={setLoggenIn}/>
            )}
        </div>
    );
};

export default Navbar;
