/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    
    const checkAdminAuthentication = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/checklogin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'

            });
            if (response.ok) {
                // Admin is authenticated
                setIsAdminAuthenticated(true);
            } else {
                // Admin is not authenticated
                setIsAdminAuthenticated(false);
               
            }
        }
        catch (error) {
            console.error('An error occurred during admin authentication check', error);
            setIsAdminAuthenticated(false);
        }
    }

    useEffect(() => {
        checkAdminAuthentication();
    }, []);

    const handlelogout = async () => {
        fetch("http://localhost:5000/admin/logout", {
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
                navigate("/");
                window.location.reload();
            }

        })
        .catch((error) => {
            console.log(error)
            navigate("/login");
        })
    };

    return (
        <div className='flex justify-between items-center bg-white border-b-[#eaeaea] border-b-[1px] border-solid h-[50px]'>
            <img src={logo} alt="Logo" width={200} height={100} className='m-2.5' />

            <div className='adminlinks'>
                {isAdminAuthenticated ? (
                    <>
                        <Link
                        to="/"
                        className="bg-[rgb(248,68,100)] text-[white] border-[none] rounded-[4px] px-[10px] py-[5px] no-underline mr-[10px]"
                        onClick={handlelogout}
                    >
                        Logout
                    </Link>
                    </>
                ) : (
                    <>
                        <Link to='/pages/auth/login' className='bg-[rgb(248,68,100)] text-[white] border-[none] rounded-[4px] px-[10px] py-[5px] no-underline mr-[10px]'>Login</Link>
                        <Link to='/pages/auth/signup' className='bg-[rgb(248,68,100)] text-[white] border-[none] rounded-[4px] px-[10px] py-[5px] no-underline mr-[10px]'>Signup</Link>
                    </>
                )}
            </div>
        </div >
    )
}

export default Navbar;