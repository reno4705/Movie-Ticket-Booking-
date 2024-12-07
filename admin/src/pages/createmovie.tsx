/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddCelebrities from "./addcelebrity";

interface Movie {
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
    releaseDate: string;
}

const CreateMoviePage: React.FC = () => {
    const [movie, setMovie] = useState<Movie>({
        title: "",
        description: "",
        portraitImgUrl: "",
        portraitImg: null,
        landscapeImgUrl: "",
        landscapeImg: null,
        rating: 0,
        language: [],
        genre: [],
        duration: 0,
        releaseDate: "",
    });

    const [movieId, setMovieId] = useState<string>("");

    const languages = [
        "Tamil", "Telugu", "Malayalam", "Kanada", "English", "Hindi"
    ];

    const genres = [
        "Action",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Science Fiction",
        "Thriller",
        "Other",
    ];

    const handleLanguageChange = (language: string) => {
        if (movie.language.includes(language)) {
            // unselect a selected language
            setMovie({
                ...movie,
                language: movie.language.filter(
                    (selectedLanguage) => selectedLanguage !== language
                ),
            });
        } else {
            // select a language
            setMovie({ ...movie, language: [...movie.language, language] });
        }
    };

    const handleGenreChange = (genre: string) => {
        if (movie.genre.includes(genre)) {
            // unselect a selected genre
            setMovie({
                ...movie,
                genre: movie.genre.filter(
                    (selectedGenre) => selectedGenre !== genre
                ),
            });
        } else {
            // select a genre
            setMovie({ ...movie, genre: [...movie.genre, genre] });
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMovie({ ...movie, [name]: value });
    };

    // upload image to cloudinary
    const uploadImage = async (image: File) => {
        try {
            const formData = new FormData();
            formData.append("myimage", image); // same image name useed in backend
            const response = await fetch(
                `http://localhost:5000/image/uploadimage`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Image uploaded successfully:", data);
                return data.imageUrl;
            } else {
                console.error("Failed to upload the image.");
                return null;
            }
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };
    
    const handleCreateMovie = async () => {
        try {
            if (
                movie.title === "" ||
                movie.description === "" ||
                movie.rating === 0 ||
                movie.genre.length === 0 ||
                movie.duration === 0 ||
                movie.language.length === 0 ||
                movie.releaseDate === ""
            ) {
                toast.error("Please fill all the fields", {
                    position: "top-right",
                });
                return;
            }

            let portraitImgUrl = movie.portraitImgUrl;
            let landscapeImgUrl = movie.landscapeImgUrl;

            if (movie.portraitImg) {
                portraitImgUrl = await uploadImage(movie.portraitImg);
                if (!portraitImgUrl) {
                    toast.error("Portrait Image upload failed", {
                        position: "top-right",
                    });
                    return;
                }
            }
            if (movie.landscapeImg) {
                landscapeImgUrl = await uploadImage(movie.landscapeImg);
                if (!landscapeImgUrl) {
                    toast.error("Landscape Image upload failed", {
                        position: "top-right",
                    });
                    return;
                }
            }

            const newMovie = { ...movie, portraitImgUrl, landscapeImgUrl };

            const response = await fetch(
                `http://localhost:5000/movie/createmovie`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newMovie),
                    credentials: "include",
                }
            );

            if (response.ok) {
                const data = await response.json();
                setMovieId(data.data._id);
                console.log(data.data._id);
                console.log("Movie creation successful", data);

                toast.success("Movie Created Successfully", {
                    position: "top-center",
                });
            } else {
                console.error("Movie creation failed", response.statusText);
                toast.error("Movie Creation Failed", {
                    position: "top-center",
                });
            }
        } catch (error) {
            console.error("An error occurred during movie creation", error);
        }
    };

    return (
        <>
            <div className="px-[600px] pt-[100px] font-poppins">
                <div className="w-[550px] h-[1500px] bg-[#ffffff] px-[100px] py-[80px]  [box-shadow:rgba(0,_0,_0,_0.3)_0px_19px_38px,_rgba(0,_0,_0,_0.22)_0px_15px_12px] rounded-xl mb-[100px]">
                    <h2 className="text-[2.2rem] text-[#444] mb-[30px] text-center font-semibold">
                        Add Movie
                    </h2>
                    <div className="mb-[30px] text-[18px] font-normal">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={movie.title}
                            onChange={handleInputChange}
                            className=" w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc]"
                        />
                    </div>

                    <div className="mb-[30px] text-[18px] font-normal">
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={movie.description}
                            onChange={handleInputChange}
                            className=" w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc]"
                        />
                    </div>

                    <label className="text-[18px]">Portrait Image</label>
                    <div className="mb-[30px] text-[18px] font-normal">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                                if (
                                    event.target.files &&
                                    event.target.files.length > 0
                                ) {
                                    setMovie({
                                        ...movie,
                                        portraitImg: event.target.files[0],
                                    });
                                }
                            }}
                            className=" w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc]"
                        />
                    </div>

                    <label className="text-[18px]">Landscape Image</label>
                    <div className="mb-[30px] text-[18px] font-normal">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                                if (
                                    event.target.files &&
                                    event.target.files.length > 0
                                ) {
                                    setMovie({
                                        ...movie,
                                        landscapeImg: event.target.files[0],
                                    });
                                }
                            }}
                            className="w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc]"
                        />
                    </div>

                    <label className="text-[18px]">Rating</label>
                    <div className="mb-[30px] text-[18px]">
                        <input
                            type="number"
                            name="rating"
                            placeholder="Rating"
                            value={movie.rating}
                            onChange={handleInputChange}
                            className="w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc]"
                        />
                    </div>

                    <div className="mb-[30px] text-[18px] font-normal">
                        <p className="text-[18px]">Select Languages:</p>
                        {languages.map((language) => (
                            <label key={language} className="">
                                <input
                                    type="checkbox"
                                    name="language"
                                    checked={movie.language.includes(language)}
                                    onChange={() => handleLanguageChange(language)}
                                    className="mr-2 w-4 h-4 mt-1"
                                />
                                <span className="text-[18px]">{language}</span>
                                <br />
                            </label>
                        ))}
                    </div>

                    <div className="mb-[30px] text-[18px] font-normal">
                        <p className="text-[18px]">Select Genres:</p>
                        {genres.map((genre) => (
                            <label key={genre} className="">
                                <input
                                    type="checkbox"
                                    name="genre"
                                    checked={movie.genre.includes(genre)}
                                    onChange={() => handleGenreChange(genre)}
                                    className="mr-2 w-4 h-4 mt-1"
                                />
                                <span className="text-[18px]">{genre}</span>
                                <br />
                            </label>
                        ))}
                    </div>

                    <label className="text-[18px]">Duration (In Minutes)</label>
                    <div className="mb-[30px] text-[18px] font-normal">
                        <input
                            type="number"
                            name="duration"
                            placeholder="Duration"
                            value={movie.duration}
                            onChange={handleInputChange}
                            className=" w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc]"
                        />
                    </div>

                    <label className="text-[18px]">Release Date</label>
                    <div className="mb-[30px] text-[18px] font-normal">
                        <input
                            type="date"
                            name="releaseDate"
                            value={movie.releaseDate}
                            onChange={handleInputChange}
                            className=" w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc]"
                        />
                    </div>

                    <button
                        onClick={handleCreateMovie}
                        className="w-[150px] bg-[rgb(248,68,100)] border-[none] outline-[none] h-[49px] rounded-[49px] text-[#fff] uppercase font-semibold mx-[0] my-[10px] cursor-pointer [transition:0.5s] ml-[32%] hover:bg-[#007bff]"
                    >
                        Create Movie
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreateMoviePage;