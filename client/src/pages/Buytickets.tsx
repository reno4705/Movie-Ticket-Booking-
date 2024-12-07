/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-horizontal-datepicker";
// import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
// import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import { MovieCardType } from "../types/type";

interface Theatre {
    _id: string;
    name: string;
    location: string;
}

const Buytickets: React.FC = () => {
    const pathname = window.location.pathname;
    const { movieid } = useParams();
    const { city } = useParams();
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split("T")[0]
    );
    const [movie, setMovie] = useState<MovieCardType>();
    const [theatres, setTheatres] = useState<Theatre[]>([]);

    const getMovie = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/movie/movies/${movieid}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );

            const data = await response.json();
            if (data.ok) {
                console.log(data);
                setMovie(data.data);
            }
        } catch (error) {
            console.error("Error fetching movie:", error);
        }
    };

    const getTheatres = async (date: string) => {
        try {
            console.log("selected-date-ingettheatres: " + date);
            const response = await fetch(
                `http://localhost:5000/movie/screensbymovieschedule/${city}/${date}/${movieid}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );

            const data = await response.json();
            if (data.ok) {
                console.log("screen details:" + data);
                setTheatres(data.data);
            } else {
                console.log("data not ok:" + data);
            }
        } catch (error) {
            console.error("Error fetching theatres:", error);
        }
    };

    useEffect(() => {
        getMovie();
    }, []);

    useEffect(() => {
        getTheatres(selectedDate);
    }, [selectedDate]);

    const onSelectedDay = (d:Date) => {
        setSelectedDate(d.toISOString().split("T")[0]);
        console.log(d);
    };

    // const movie = {
    //     moviename: 'Jawan',
    //     screen: '4Dx',
    //     date: new Date(),
    //     language: 'Hindi',
    //     type: 'Action/Thriller',
    //     screens: [
    //         {
    //             name: 'Screen 1',
    //             location: 'PVR Cinemas, Forum Mall, Koramangala'
    //         },
    //         {
    //             name: 'Screen 2',
    //             location: 'PVR Cinemas, Forum Mall, Koramangala'
    //         },
    //         {
    //             name: 'Screen 3',
    //             location: 'PVR Cinemas, Forum Mall, Koramangala'
    //         }
    //     ]
    // }

    return (
        <>
            {movie && (
                <div className="bg-[rgb(228,_228,_228)] min-h-screen w-full">
                    <div className="bg-[white]">
                        <div className="bg-[#333444] p-[20px]">
                            <h1 className="text-[white] text-[35px] font-semibold">
                                {movie?.title}
                            </h1>
                            <h3 className="text-[gray] text-[13px] font-semibold border-[1px] border-[solid] border-[gray] px-[20px] py-[5px] rounded-[25px] w-[fit-content]">
                                {movie.genre.join(", ")}
                            </h3>
                        </div>
                        <DatePicker
                            getSelectedDay={(date: Date) => {
                                // console.log(date);
                                setSelectedDate(
                                    date.toISOString().split("T")[0]
                                );
                            }}
                            endDate={100}
                            selectDate={new Date(selectedDate)}
                            labelFormat={"MMMM"}
                            color={"rgb(248,68,100)"}
                        />
                        {/* <ReactHorizontalDatePicker
                            selectedDay={onSelectedDay}
                            enableScroll={true}
                            enableDays={180}
                            color={"#987876"}
                        /> */}
                    </div>

                    {/* THEATRES */}
                    {theatres && theatres.length > 0 && (
                        <div className="w-[90%] mx-[auto] my-[20px] [box-shadow:0px_0px_10px_0px_rgba(0,0,0,0.2)] bg-[white] p-[20px] rounded-[10px]">
                            {theatres.map((screen) => {
                                return (
                                    <div
                                        className="flex justify-between items-center mx-0 my-[10px] p-[10px] [transition:all_0.3s_ease] border-b-[1px_solid_rgba(0,0,0,0.1)]"
                                        key={screen._id}
                                    >
                                        <div>
                                            <h2 className="text-[20px] font-semibold">
                                                {screen.name}
                                            </h2>
                                            <h3 className="text-[15px] font-semibold">
                                                {screen.location}
                                            </h3>
                                        </div>
                                        <Link
                                            to={`${pathname}/${screen._id}?date=${selectedDate}`}
                                            className="bg-[rgb(248,68,100)] text-[white] border-[none] rounded-[4px] px-[10px] py-[5px] no-underline mr-[10px]"
                                        >
                                            Select
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Buytickets;
