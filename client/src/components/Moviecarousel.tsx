/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { MovieCardType, UserType } from "../types/type";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { Pagination } from 'swiper/modules';
import "swiper/swiper-bundle.css";
import Moviecard from "./Moviecard";
// import card1 from "../assets/card1.jpg";
// import card2 from "../assets/card2.jpg";
// import card3 from "../assets/card3.jpg";
// import card4 from "../assets/card4.jpg";
// import card5 from "../assets/card5.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const defaultUser: UserType = {
    email: "guest@example.com",
    name: "Guest User",
    password: "",
    bookings: [],
    city: "default-city",
};

const Moviecarousel: React.FC = () => {
    const navigate = useNavigate();
   
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        arrows: true,
    };

    const [user, setUser] = React.useState<UserType>(defaultUser);

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
                } else {
                    navigate("/login");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [movies, setMovies] = React.useState<MovieCardType[]>([]);

    const getMovies = () => {
        fetch("http://localhost:5000/movie/movies", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    const moviesData = data.data;
                    // console.log(data);
                    const sortedMovies = [...moviesData].sort((a: MovieCardType, b: MovieCardType) => {
                        const dateA = new Date(a.releaseDate);
                        const dateB = new Date(b.releaseDate);
                        return dateB.getTime() - dateA.getTime();
                    });
                    setMovies(sortedMovies);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        getMovies();
        getUser();
    }, []);

    return (
        <div className="ml-[90px] my-[50px]">
            <Slider {...settings}>
                {movies.map((movie) => {
                    return <Moviecard 
                                Movie={movie} 
                                data={user}
                            />
                })}
            </Slider>
        </div>
    );
};

export default Moviecarousel;
