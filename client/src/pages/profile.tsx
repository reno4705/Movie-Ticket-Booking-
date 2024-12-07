/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { UserType } from "../types/type";

interface Booking {
    _id: string;
    showTime: string;
    showDate: string;
    movieId: string;
    movieName: string;
    screenId: string;
    screenName: string;
    seats: {
        row: string;
        col: number;
        seat_id: string;
        price: number;
        _id: string;
    }[];
    totalPrice: number;
    paymentId: string;
    paymentType: string;
    userId: string;
}

const Profile: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>();
    const [user, setUser] = useState<UserType>();

    const getBookings = async () => {
        try {
            const res = await fetch(
                `http://localhost:5000/movie/getuserbookings`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            const data = await res.json();
            if (data.ok) {
                console.log(data);
                setBookings(data.data);
            } else {
                console.log(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getUserData = async () => {
        try {
            const res = await fetch(`http://localhost:5000/auth/getuser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();
            if (data.ok) {
                console.log(data);
                setUser(data.data);
            } else {
                console.error(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBookings();
        getUserData();
    }, []);

    return (
        <div className="max-w-[800px] mx-[auto] my-[0] p-[20px] flex flex-col gap-[20px] items-center">
            <h1 className="text-center w-full text-[rgb(248,68,100)] font-normal">
                Profile
            </h1>
            <div className="mt-[20px] w-full flex flex-col items-center justify-center">
                <h2>User Details</h2>
                <div className="flex flex-wrap gap-[10px] w-full justify-center">
                    <div className="flex-[1] m-[10px] p-[10px] border-[1px] border-[solid] border-[#ccc] rounded-[5px]">
                        <h3 className="m-0 text-[rgb(248,68,100)] font-normal">
                            Name
                        </h3>
                        <p>{user?.name}</p>
                    </div>
                    <div className="flex-[1] m-[10px] p-[10px] border-[1px] border-[solid] border-[#ccc] rounded-[5px]">
                        <h3 className="m-0 text-[rgb(248,68,100)] font-normal">
                            Email
                        </h3>
                        <p>{user?.email}</p>
                    </div>
                    <div className="flex-[1] m-[10px] p-[10px] border-[1px] border-[solid] border-[#ccc] rounded-[5px]">
                        <h3 className="m-0 text-[rgb(248,68,100)] font-normal">
                            City
                        </h3>
                        <p>{user?.city}</p>
                    </div>
                </div>
            </div>

            <div className="mt-[20px] w-full flex flex-col items-center justify-center">
                <h2>Bookings</h2>
                <div className="flex flex-wrap gap-[10px] w-full justify-center">
                    {bookings?.map((booking) => (
                        <div
                            className="mx-[0] my-[20px] border-[1px] border-[solid] border-[#ccc] rounded-[5px] p-[15px]"
                            key={booking._id}
                        >
                            <div className="flex-[1] m-[10px] p-[10px] border-[1px] border-[solid] border-[#ccc] rounded-[5px]">
                                <h3 className="m-0 text-[rgb(248,68,100)] font-normal">
                                    Movie
                                </h3>
                                <p>{booking.movieName}</p>
                            </div>
                            <div className="flex-[1] m-[10px] p-[10px] border-[1px] border-[solid] border-[#ccc] rounded-[5px]">
                                <h3 className="m-0 text-[rgb(248,68,100)] font-normal">
                                    Screen
                                </h3>
                                <p>{booking.screenName}</p>
                            </div>
                            <div className="flex-[1] m-[10px] p-[10px] border-[1px] border-[solid] border-[#ccc] rounded-[5px]">
                                <h3 className="m-0 text-[rgb(248,68,100)] font-normal">
                                    Seats
                                </h3>
                                <p>
                                    {booking.seats.map((seat, index) => (
                                        <span key={index}>
                                            {seat.seat_id},{" "}
                                        </span>
                                    ))}
                                </p>
                            </div>
                            <div className="flex-[1] m-[10px] p-[10px] border-[1px] border-[solid] border-[#ccc] rounded-[5px]">
                                <h3 className="m-0 text-[rgb(248,68,100)] font-normal">
                                    Price
                                </h3>
                                <p>{booking.totalPrice}</p>
                            </div>
                            <div className="flex-[1] m-[10px] p-[10px] border-[1px] border-[solid] border-[#ccc] rounded-[5px]">
                                <h3 className="m-0 text-[rgb(248,68,100)] font-normal">
                                    Payment Type
                                </h3>
                                <p>{booking.paymentType}</p>
                            </div>
                            <div className="flex-[1] m-[10px] p-[10px] border-[1px] border-[solid] border-[#ccc] rounded-[5px]">
                                <h3 className="m-0 text-[rgb(248,68,100)] font-normal">
                                    Payment Id
                                </h3>
                                <p>{booking.paymentId}</p>
                            </div>
                            <div className="flex-[1] m-[10px] p-[10px] border-[1px] border-[solid] border-[#ccc] rounded-[5px]">
                                <h3 className="m-0 text-[rgb(248,68,100)] font-normal">
                                    Show Date
                                </h3>
                                <p>{booking.showDate}</p>
                            </div>
                            <div className="flex-[1] m-[10px] p-[10px] border-[1px] border-[solid] border-[#ccc] rounded-[5px]">
                                <h3 className="m-0 text-[rgb(248,68,100)] font-normal">
                                    Show Time
                                </h3>
                                <p>{booking.showTime}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
