/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Seat {
    row: string;
    col: number;
    seat_id: string;
    price: number;
}

interface Schedule {
    _id: string;
    showTime: string;
    notAvailableSeats: Seat[];
}

interface Screen {
    screen: {
        name: string;
        seats: {
            type: string;
            price: number;
            rows: {
                rowname: string;
                cols: {
                    seats: {
                        seat_id: string;
                    }[];
                }[];
            }[];
        }[];
    };
    movieSchedulesforDate: Schedule[];
}

interface Movie {
    title: string;
    genre: string[];
}

const Screens: React.FC = () => {
    const pathname = window.location.pathname;
    const params = useParams();
    const { movieid, city, screenid } = params;
    const [searchParams] = useSearchParams();
    const date = searchParams.get("date");

    // console.log(movieid, city, screenid, date);

    const [screen, setScreen] = useState<Screen>();
    const [selectedTime, setSelectedTime] = useState<Schedule>();
    const [movie, setMovie] = useState<Movie>();
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    const getSchedules = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/movie/schedulebymovie/${screenid}/${date}/${movieid}`,
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
                console.log(data.data);
                setScreen(data.data);
                setSelectedTime(data.data.movieSchedulesforDate[0]);
            } else {
                console.error("Error fetching schedules:", data.message);
            }
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    };

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
                setMovie(data.data);
            }
        } catch (error) {
            console.error("Error fetching movie:", error);
        }
    };

    useEffect(() => {
        getSchedules();
        getMovie();
    }, []);

    const selectdeselectseat = (seat: Seat) => {
        const isSelected = selectedSeats.some(
            (s) =>
                s.row === seat.row &&
                s.col === seat.col &&
                s.seat_id === seat.seat_id
        );

        if (isSelected) {
            setSelectedSeats(
                selectedSeats.filter(
                    (s) =>
                        s.row !== seat.row ||
                        s.col !== seat.col ||
                        s.seat_id !== seat.seat_id
                )
            );
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    // Generate seat layout
    const generateSeatLayout = () => {
        if (!screen || !selectedTime) return null;

        const scheduleIndex = screen.movieSchedulesforDate.findIndex(
            (t) => t.showTime === selectedTime.showTime
        );

        const unavailableSeats =
            screen.movieSchedulesforDate[scheduleIndex].notAvailableSeats;
        return (
            <div>
                {screen.screen.seats.map((seatType, index) => (
                    <div className="bg-white m-2.5 px-5 py-2.5" key={index}>
                        <h2 className="text-[15px] font-normal border w-max mb-2.5 px-5 py-[5px] rounded-[25px] border-solid border-[#ccc]">
                            {seatType.type} - Rs. {seatType.price}
                        </h2>
                        <div className="seat-rows">
                            {seatType.rows.map((row, rowIndex) => (
                                <div
                                    className={
                                        row.rowname == "J"
                                            ? "flex flex-row items-center justify-between gap-5 mb-[100px]"
                                            : "flex flex-row items-center justify-between gap-5 mb-[15px]"
                                    }
                                    key={rowIndex}
                                >
                                    <p className="w-[30px] font-medium text-[14px] bg-[white] text-[rgb(248,68,100)] h-[30px] flex justify-center items-center p-0">
                                        {row.rowname}
                                    </p>
                                    <div className="flex justify-between w-full gap-[80px]">
                                        {row.cols.map((col, colIndex) => (
                                            <div
                                                className="flex"
                                                key={colIndex}
                                            >
                                                {col.seats.map(
                                                    (seat, seatIndex) => (
                                                        <div key={seatIndex}>
                                                            {unavailableSeats.some(
                                                                (s) =>
                                                                    s.row ===
                                                                        row.rowname &&
                                                                    s.seat_id ===
                                                                        seat.seat_id &&
                                                                    s.col ===
                                                                        colIndex
                                                            ) ? (
                                                                <span className="w-[30px] h-[30px] flex justify-center items-center shadow-[0px_0px_5px_0px_#ccc] mr-[5px] text-[#2a2a2a] bg-[rgb(230,230,230)] hover:cursor-not-allowed">
                                                                    {
                                                                        seat.seat_id
                                                                    }
                                                                </span>
                                                            ) : (
                                                                <span
                                                                    className={
                                                                        selectedSeats.some(
                                                                            (
                                                                                s
                                                                            ) =>
                                                                                s.row ===
                                                                                    row.rowname &&
                                                                                s.seat_id ===
                                                                                    seat.seat_id &&
                                                                                s.col ===
                                                                                    colIndex
                                                                        )
                                                                            ? "w-[30px] h-[30px] flex justify-center items-center shadow-[0px_0px_5px_0px_#ccc] mr-[5px] cursor-pointer text-[white] bg-[rgb(248,68,100)] border-solid border-[1px] border-[rgb(248,68,100)]"
                                                                            : "w-[30px] h-[30px] flex justify-center items-center shadow-[0px_0px_5px_0px_#ccc] mr-[5px] cursor-pointer text-[#000000] bg-[white] border-solid border-[1px] border-[rgb(248,68,100)]"
                                                                    }
                                                                    onClick={() =>
                                                                        selectdeselectseat(
                                                                            {
                                                                                row: row.rowname,
                                                                                col: colIndex,
                                                                                seat_id:
                                                                                    seat.seat_id,
                                                                                price: seatType.price,
                                                                            }
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        seat.seat_id
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const handleBooking = () => {
        fetch(`http://localhost:5000/movie/bookticket`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                showTime: selectedTime?.showTime,
                showDate: date,
                movieId: movieid,
                screenId: screenid,
                seats: selectedSeats,
                totalPrice: selectedSeats.reduce(
                    (acc, seat) => acc + seat.price,
                    0
                ),
                paymentId: "123456789",
                paymentType: "online",
            }),
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.ok) {
                    toast.success("Booking Successful");
                    window.location.reload();
                    console.log(response);
                } else {
                    console.log("Error in res: "+response);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="bg-[rgb(228,228,228)] min-h-screen w-full">
                {movie && screen && (
                    <div className="bg-[white]">
                        <div className="bg-[#333444] p-2.5">
                            <h1 className="text-[white] text-[25px] font-semibold">
                                {movie.title} - {screen?.screen?.name}
                            </h1>
                            <h3 className="text-[gray] text-[13px] font-semibold border w-fit px-5 py-[5px] rounded-[25px] border-solid border-[gray]">
                                {movie.genre.join(" / ")}
                            </h3>
                        </div>
                    </div>
                )}

                {screen && (
                    <div className="flex flex-col items-center bg-[white]">
                        <div className="flex justify-center items-center gap-2.5 m-5">
                            {screen.movieSchedulesforDate.map((time, index) => (
                                <h3
                                    className={
                                        selectedTime?._id === time._id
                                            ? "text-xs font-normal cursor-pointer px-5 py-[5px] rounded-[25px] border-2 border-solid border-[#ccc] selected"
                                            : "text-xs font-normal cursor-pointer px-5 py-[5px] rounded-[25px] border-[rgb(248,68,100)] text-[rgb(248,68,100)] border-2 border-solid"
                                    }
                                    onClick={() => {
                                        setSelectedTime(time);
                                        setSelectedSeats([]);
                                    }}
                                    key={index}
                                >
                                    {time.showTime}
                                </h3>
                            ))}
                        </div>
                        <div className="flex flex-row items-center justify-center gap-5 m-5">
                            <div className="flex flex-row items-center gap-2.5">
                                <span className="flex w-5 h-5 justify-center items-center text-[10px] font-semibold m-0 p-0 rounded-[50%] text-[#313131] bg-[rgb(230,230,230)] hover:cursor-not-allowed"></span>
                                <p className="flex text-xs font-semibold text-[gray] m-0 p-0">
                                    Not available
                                </p>
                            </div>
                            <div className="flex flex-row items-center gap-2.5">
                                <span className="flex w-5 h-5 justify-center items-center text-[10px] font-semibold text-[white] m-0 p-0 rounded-[50%] border-[rgb(248,68,100)] border-solid border-[1px]"></span>
                                <p className="flex text-xs font-semibold text-[gray] m-0 p-0">
                                    Available
                                </p>
                            </div>
                            <div className="flex flex-row items-center gap-2.5">
                                <span className="flex w-5 h-5 justify-center items-center text-[10px] font-semibold text-[white] m-0 p-0 rounded-[50%] bg-[rgb(248,68,100)]"></span>
                                <p className="flex text-xs font-semibold text-[gray] m-0 p-0">
                                    Selected
                                </p>
                            </div>
                        </div>

                        {generateSeatLayout()}

                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="-1 -1 262 22"
                                width="260"
                                height="20"
                            >
                                <defs>
                                    <path
                                        id="da"
                                        d="M27.1 0h205.8L260 14.02H0z"
                                    />
                                    <path
                                        id="db"
                                        d="M0 13.88h260l-3.44 6.06H3.44z"
                                    />
                                </defs>
                                <g fill="none" fillRule="evenodd" opacity=".3">
                                    <use fill="#E1E8F1" xlinkHref="#da" />
                                    <path
                                        stroke="#4F91FF"
                                        strokeWidth=".65"
                                        d="M27.19.33L1.34 13.7h257.32L232.81.32H27.2z"
                                    />
                                    <path
                                        fill="#8FB9FF"
                                        d="M28.16 2.97h203.86l17.95 9.14H10.35z"
                                    />
                                    <use fill="#E3ECFA" xlinkHref="#db" />
                                    <path
                                        stroke="#4F91FF"
                                        strokeWidth=".65"
                                        d="M.56 14.2l3.07 5.41h252.74l3.07-5.4H.56z"
                                    />
                                </g>
                            </svg>
                        </div>

                        <div className="flex flex-row items-center justify-between bg-[white] shadow-[0px_0px_5px_0px_#ccc] w-[300px] m-5 p-5 rounded-[10px]">
                            <div className="flex justify-center gap-[15px] items-center">
                                <h2 className="text-[15px] font-semibold text-[gray]">
                                    Total
                                </h2>
                                <h3 className="text-[15px] font-semibold text-[rgb(248,68,100)]">
                                    Rs.{" "}
                                    {selectedSeats.reduce(
                                        (acc, seat) => acc + seat.price,
                                        0
                                    )}
                                </h3>
                            </div>

                            <button
                                className="theme_btn1 linkstylenone"
                                onClick={handleBooking}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Screens;
