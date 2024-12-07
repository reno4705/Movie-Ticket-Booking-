/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MovieCardType } from "../types/type";

const defaultMovie: MovieCardType = {
    title: "Movie_name",
    description:
        "movie_description",
    portraitImgUrl:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/amaran-et00388085-1728627184.jpg",
    landscapeImgUrl:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/amaran-et00388085-1728627184.jpg",
    _id: "",
    rating: 7,
    language: ["Tamil", "Telugu", "Hindi", "Malayalam", "Kannada"],
    genre: ["Action", "Drama", "Thriller"],
    duration: 183,
    releaseDate: "22 May 2024",
    cast: [
        {
            celebType: "cast",
            celebName: "Sivakarthikeyan",
            celebImage: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sivakarthikeyan-1042969-18-09-2017-03-37-23.jpg",
        }
    ],
    crew: [
        {
            celebType: "crew",
            celebName: "Sivakarthikeyan",
            celebImage: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sivakarthikeyan-1042969-18-09-2017-03-37-23.jpg",
        }
    ]
};

const Moviepage: React.FC = () => {
    const pathname = window.location.pathname;

    const { movieid } = useParams();

    const [movie, setMovie] = React.useState<MovieCardType>(defaultMovie);
    // const movie = {
    //     title: "Amaran",
    //     description:
    //         "Amaran is a true-life story of Major Mukund Varadarajan (Sivakarthikeyan), a commissioned officer in the Indian Army`s Rajput Regiment, who was posthumously awarded the Ashok Chakra for his valor during a counterterrorism operation while on deputation to the 44th Rashtriya Rifles battalion in Jammu and Kashmir. Besides being a tale of courage, it portrays the selfless love of his wife, Indhu Rebecaa Varghese (Sai Pallavi). The supporting cast includes Bhuvan Arora, Rahul Bose, and Rohman Shawl, all contributing to this real-life story that deserves to be told and shared in the annals of history. From the well-known house of Raaj Kamal Films International and Sony Pictures Films India, Director Rajkumar Periasamy has deftly woven the threads of this story with reality, allowing the audience to relate to the daily trials and tribulations our brave soldiers face, which many of us tend to take for granted. It`s time to stand and salute these brave warriors of our frontiers! The film is produced by Kamal Haasan, Sony Pictures International Productions, and R. Mahendran.",
    //     portraitImgUrl:
    //         "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/amaran-et00388085-1728627184.jpg",
    //     landscapeImgUrl:
    //         "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/amaran-et00388085-1728627184.jpg",
    //     rating: 9.4,
    //     language: ["Tamil", "Telugu", "Hindi", "Malayalam", "Kannada"],
    //     genre: ["Action", "Drama", "Thriller"],
    //     duration: "2hr 49m",
    //     releasedate: "31,Oct 2024",
    //     cast: [
    //         {
    //             name: "Sivakarthikeyan",
    //             imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sivakarthikeyan-1042969-18-09-2017-03-37-23.jpg",
    //             _id: ""
    //         }
    //     ],
    //     crew: [
    //         {
    //             name: "Sivakarthikeyan",
    //             imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sivakarthikeyan-1042969-18-09-2017-03-37-23.jpg",
    //             _id: ""
    //         }
    //     ]
    // };
    
    //     cast: ["https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sivakarthikeyan-1042969-18-09-2017-03-37-23.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sai-pallavi-1065111-1654347116.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/rahul-bose-1765-20-12-2016-12-57-07.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/bhuvan-arora-41267-1718024798.jpg"],
    //     castName: ["Sivakarthikeyan","Sai Pallavi", "Rahul Bose", "Bhuvan Arora"],
    //     crew: ["https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sivakarthikeyan-1042969-18-09-2017-03-37-23.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sai-pallavi-1065111-1654347116.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/rahul-bose-1765-20-12-2016-12-57-07.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/bhuvan-arora-41267-1718024798.jpg"],
    //     crewName: ["Sivakarthikeyan","Sai Pallavi", "Rahul Bose", "Bhuvan Arora"],

    const getMovies = () => {
        fetch(`http://localhost:5000/movie/movies/${movieid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data);
                    setMovie(data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
 
    React.useEffect(() => {
        getMovies();
    }, []);

    const h = Math.trunc(movie.duration / 60);
    const m = movie.duration % 60;

    return (
        <>
            <div>
                {/* big poster content*/}
                <div
                    className="h-[550px]"
                    style={{
                        backgroundImage: `url(${movie.landscapeImgUrl})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "75%"
                    }}
                >
                    <div className="bg-[linear-gradient(90deg,_rgb(0,_0,_0)_15%,_rgba(255,_255,_255,_0)_50%,_rgb(0,_0,_0)_85%)] h-[550px] flex px-[15%] gap-[50px]">
                        <div className="border-solid border-[2px] my-[50px] border-[#4a4a4a] rounded-[20px]">
                            <img
                                src={movie.portraitImgUrl}
                                alt="poster"
                                className="rounded-t-[20px] h-[413px] w-[250px]"
                            />
                            <p className="bg-black pb-2 text-[15px] text-white text-center rounded-b-[20px]">
                                In cinemas
                            </p>
                        </div>
                        <div className="my-[100px]">
                            <div className="">
                                <p className="text-[40px] font-semibold text-white">
                                    {movie.title}
                                </p>
                                <div className="flex gap-[5px] bg-[rgb(60,60,60)] rounded-[10px] p-[15px] w-[350px]">
                                    <BsFillStarFill className="text-[#d6035f] text-[25px] pt-1" />
                                    <p className="text-[white] font-bold text-[20px]">
                                        {movie.rating}/10
                                    </p>
                                </div>
                                <br />
                                <div className="text-black text-[18px] font-semibold bg-white mb-3 w-[auto] max-w-fit">
                                    <p>{movie.language.join(", ")}</p>
                                </div>
                                <div className="mb-5">
                                    <p className="flex gap-[5px] text-white text-[18px] font-semibold">
                                        <span className="duration">
                                            {h}h {m}m
                                        </span>
                                        <span>•</span>
                                        <span className="type">
                                            {movie.genre.join(", ")}
                                        </span>
                                        <span>•</span>
                                        <span className="releasedat">
                                            {movie.releaseDate.split("T")[0]}
                                        </span>
                                    </p>
                                </div>
                                <Link
                                    to={`${pathname}/buytickets`}
                                    className=""
                                >
                                    <button className="bg-[rgb(248,68,100)] text-[white] border-[none] rounded-[10px] px-[60px] py-[10px] text-[20px] w-[fit-content] font-semibold cursor-pointer">
                                        Book Tickets
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About */}
                <div className="ml-[200px] mr-[500px] mt-[50px]">
                    <h1 className="text-[30px] font-bold my-3">
                        About the movie
                    </h1>
                    <p className="text-[18px] text-black">
                        {movie.description}
                    </p>
                </div>

                {/* cast */}
                <h1 className="ml-[200px] mt-20 text-[30px] font-bold my-3">
                    Cast
                </h1>
                <div className="flex ml-[200px] gap-10">
                    {movie.cast.map((cast, index) => {
                        return (
                            <div key={index}>
                                <img
                                    src={cast.celebImage}
                                    alt="cast"
                                    className="rounded-full w-[150px]"
                                />
                                <p className="text-center text-[18px] font-semibold">
                                    {cast.celebName}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* crew */}
                <h1 className="ml-[200px] mt-20 text-[30px] font-bold my-3">
                    Crew
                </h1>
                <div className="flex ml-[200px] gap-10">
                    {movie.crew.map((crew, index) => {
                        return (
                            <div key={index}>
                                <img
                                    src={crew.celebImage}
                                    alt="crew"
                                    className="rounded-full w-[150px]"
                                />
                                <p className="text-center text-[18px] font-semibold">
                                    {crew.celebName}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Moviepage;
