/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { MovieCardType, UserType } from "../types/type";
import { BsFillStarFill } from "react-icons/bs";

interface MoviecardProps {
    Movie: MovieCardType;
    data: UserType;
}

const Moviecard: React.FC<MoviecardProps> = ({ Movie, data }) => {
    const { _id, title, genre, rating, portraitImgUrl } = Movie;
    const { city } = data;
    // const city = "delhi"
    const navigate = useNavigate();

    const goto = () => {
        navigate(`/${city}/movies/${_id}`);
    };

    return (
        <div
            className="h-[460px] w-[250px] cursor-pointer"
            onClick={() => goto()}
        >
            <div className="h-[350px]">
                <img src={`${portraitImgUrl}`} className="rounded-t-[15px] h-[350px] w-[250px]"/>
                <div className="flex gap-[5px] py-1 bg-black">
                    <BsFillStarFill className="text-[yellow] text-[25px] pt-1" />
                    <p className="text-[white]">{rating}/10</p>
                </div>
            </div>
            <div className="mt-[40px]">
                <p className="text-[20px] font-semibold">{title}</p>
                <p className="text-[15px] font-semibold text-[#292929]">{genre.join(", ")}</p>
            </div>
        </div>
    );
};

export default Moviecard;
