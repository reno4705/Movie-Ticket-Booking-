/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { toast } from "react-toastify";

interface schedule {
    screenId: string;
    movieId: string;
    showTime: string;
    showDate: string;
}

interface Seat {
    seat_id: string;
}

interface Row {
    rowname: string;
    cols: { seats: Seat[] }[];
}

interface SeatLayout {
    type: string;
    rows: Row[];
    price: number;
}

interface Screen {
    _id: string;
    name: string;
    location: string;
    seats: SeatLayout[];
    city: string;
    screenType: string;
}

interface Movie {
    _id: string;
    title: string;
    description: string;
    portraitImgUrl: string;
    portraitImg: File | null;
    landscapeImgUrl: string;
    landscapeImg: File | null;
    rating: number;
    language: string[];
    genre: string[];
    duration: number;
    date: string;
}

const Schedule: React.FC = () => {
    const [schedule, setSchedule] = React.useState<schedule>({
        screenId: "",
        movieId: "",
        showTime: "",
        showDate: "",
    });

    const [city, setCity] = React.useState("");
    const [screens, setScreens] = React.useState<Screen[]>([]);
    const [movies, setMovies] = React.useState<Movie[]>([]);

    const getMovies = async () => {
        const res = await fetch("http://localhost:5000/movie/movies");
        const data = await res.json();
        setMovies(data.data);
        console.log(data.data);
    };

    React.useEffect(() => {
        getMovies();
    }, []);

    const getScreensByCity = async () => {
        if (city === "") {
            return toast.error("Please select a city");
        }
        const res = await fetch(
            `http://localhost:5000/movie/screensbycity/${city.toLowerCase()}`
        );
        const data = await res.json();
        setScreens(data.data);
        console.log(data.data);
    };

    const createSchedule = async () => {
        if (
            !schedule.screenId ||
            !schedule.movieId ||
            !schedule.showTime ||
            !schedule.showDate
        ) {
            toast.error("Please fill all the fields");
            return;
        }

        const res = await fetch(
            `http://localhost:5000/movie/addmoviescheduletoscreen`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(schedule),
            }
        );

        const data = await res.json();
        console.log(data);
        if (data.ok) {
            toast.success("Schedule created successfully");
        } else {
            toast.error("Schedule creation failed");
        }
    };

    return (
        <div className="">
            <div className="flex items-center justify-center mb-[20px]">
                <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-[10px] text-[16px] border-[1px] border-[solid] border-[#ccc] rounded-[4px]"
                />
                <button onClick={() => getScreensByCity()} className="bg-[#007bff] text-[#fff] border-[none] rounded-[4px] px-[20px] py-[10px] ml-[10px] cursor-pointer text-[16px]">Search</button>
            </div>

            <div className="flex flex-wrap gap-[20px] mb-[30px]">
                <h1 className="text-[18px] mb-[10px]">Screens</h1>
                {screens?.map((screen, index) => (
                    <div
                        className={
                            schedule.screenId === screen._id
                                ? "border-[1px] border-[solid] border-[#ddd] rounded-[4px] p-[20px] cursor-pointer w-[300px] [transition:background-color_0.3s_ease] hover:bg-[#ff9e9e] bg-[#007bff] text-[#fff]"
                                : "bg-[#f5f5f5] border-[1px] border-[solid] border-[#ddd] rounded-[4px] p-[20px] cursor-pointer w-[300px] [transition:background-color_0.3s_ease] hover:bg-[#ff9e9e]"
                        }
                        key={index}
                        onClick={() => {
                            setSchedule({ ...schedule, screenId: screen._id });
                        }}
                    >
                        <p className="mx-[0] my-[5px]">{screen.name}</p>
                        <p className="mx-[0] my-[5px]">{screen.location}</p>
                        <p className="mx-[0] my-[5px]">{screen.city}</p>
                        <p className="mx-[0] my-[5px]">{screen.screenType}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-[20px] mb-[30px]">
                <h1 className="text-[18px] mb-[10px]">Movies</h1>
                {movies?.map((movie, index) => (
                    <div
                        className={
                            schedule.movieId === movie._id
                                ? "border-[1px] border-[solid] border-[#ddd] rounded-[4px] p-[20px] cursor-pointer w-[300px] [transition:background-color_0.3s_ease] hover:bg-[#ff9e9e] bg-[#007bff] text-[#fff]"
                                : "bg-[#f5f5f5] border-[1px] border-[solid] border-[#ddd] rounded-[4px] p-[20px] cursor-pointer w-[300px] [transition:background-color_0.3s_ease] hover:bg-[#ff9e9e]"
                        }
                        key={index}
                        onClick={() => {
                            setSchedule({ ...schedule, movieId: movie._id });
                        }}
                    >
                        <p className="mx-[0] my-[5px]">{movie.title}</p>
                        <p className="mx-[0] my-[5px]">{movie.description}</p>
                        <p className="mx-[0] my-[5px]">{movie.rating}</p>
                        <p className="mx-[0] my-[5px]">{movie.genre}</p>
                        <p className="mx-[0] my-[5px]">{movie.duration}</p>
                    </div>
                ))}
            </div>

            <input
                type="time"
                name="showTime"
                id="showTime"
                onChange={(e) =>
                    setSchedule({ ...schedule, showTime: e.target.value })
                }
                className="p-[10px] text-[16px] border-[1px] border-[solid] border-[#ccc] rounded-[4px] mr-[10px]"
            />
            <input
                type="date"
                name="showDate"
                id="showDate"
                onChange={(e) =>
                    setSchedule({ ...schedule, showDate: e.target.value })
                }
                className="p-[10px] text-[16px] border-[1px] border-[solid] border-[#ccc] rounded-[4px] mr-[10px]"
            />

            <button
                onClick={() => {
                    createSchedule();
                }}
                className="bg-[#007bff] text-[#fff] border-[none] rounded-[4px] px-[20px] py-[10px] ml-[10px] cursor-pointer text-[16px]"
            >
                Save
            </button>
        </div>
    );
};

export default Schedule;
