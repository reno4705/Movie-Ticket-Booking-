/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Celebrity {
    celebName: string;
    celebType: string;
    celebImage: File | null;
    celebImageurl: string;
}

const AddCelebrities: React.FC = () => {
    const [numCelebs, setNumCelebs] = useState<number>(0);
    const [celebs, setCelebs] = useState<Celebrity[]>([]);

    const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setNumCelebs(value);

        // Initialize or reset celebrities array
        const initialCelebs = Array(value).fill({
            celebName: "",
            celebType: "cast",
            celebImage: null,
            celebImageurl: "",
        });
        setCelebs(initialCelebs);
    };

    const handleInputChange = (
        index: number,
        field: keyof Celebrity,
        value: string | File | null
    ) => {
        const updatedCelebs = [...celebs];
        updatedCelebs[index] = {
            ...updatedCelebs[index],
            [field]: value,
        };
        setCelebs(updatedCelebs);
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
                // console.log(data.imageUrl)
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

    interface Movie {
        _id: string;
        title: string;
    }

    const [movies, setMovies] = useState<Movie[]>([]);
    const [movieId, setMovieId] = useState<string>("");

    const getMovies = async () => {
        const res = await fetch("http://localhost:5000/movie/movies");
        const data = await res.json();
        const movieList = data.data.map((movie: Movie) => ({
            _id: movie._id,
            title: movie.title,
          }));
          setMovies(movieList);
    };

    useEffect(() => {
        getMovies();
      }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedCelebs = [...celebs];
            for (let index = 0; index < updatedCelebs.length; index++) {
                const celeb = updatedCelebs[index];
                let celebImageurl = celeb.celebImageurl;
                if (celeb.celebImage) {
                    celebImageurl = await uploadImage(celeb.celebImage);
                    if (!celebImageurl) {
                        toast.error("Portrait Image upload failed", {
                            position: "top-right",
                        });
                        return;
                    }
                    // console.log(celebImageurl);
                    updatedCelebs[index] = {
                        ...celeb,
                        celebImageurl,
                    };
                }
            }

            // const movieId = movieId;
            const requestBody = {
                movieId,
                celebrities: updatedCelebs,
            };

            const response = await fetch(
                "http://localhost:5000/movie/addcelebtomovie",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(requestBody),
                }
            );
            const data = await response.json();
            if (data.ok) {
                alert(data.message);
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred.");
        }
    };

    const calculateHeight = () => {
        const baseHeight = 450; // Base height for value 1
        const increment = 100; // Increment per additional value
        return baseHeight + (numCelebs > 1 ? (numCelebs - 1) * increment : 0);
    };

    return (
        <div className="flex justify-center mt-[100px]">
            <div
                className="w-[1200px] bg-[#ffffff] px-[70px] py-[80px] [box-shadow:rgba(0,_0,_0,_0.3)_0px_19px_38px,_rgba(0,_0,_0,_0.22)_0px_15px_12px] rounded-xl mb-[100px]"
                style={{
                    height: `${calculateHeight()}px`,
                }}
            >
                <h1 className="text-[2.2rem] text-[#444] mb-[30px] text-center font-semibold">
                    Add Celebrities to Movie
                </h1>

                <div className="flex gap-[100px]">
                    <div className="mb-[20px] text-[18px] font-normal">
                        <label className="text-[18px]">Movie Name:</label>
                        <select
                            value={movieId}
                            onChange={(e) => {setMovieId(e.target.value)}}
                            className="ml-2 w-[250px] p-[5px] text-[18px] border-[1px] border-[solid] border-[#cccccc]"
                        >
                            <option value="" disabled>
                                Select Movie
                            </option>
                            {movies?.map((movie) => (
                                <option key={movie._id} value={movie._id} className="text-[18px]">
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Input for the number of celebrities */}
                    <div className="mb-[30px] text-[18px] font-normal">
                        <label htmlFor="numCelebs">
                            Number of Celebrities:
                        </label>
                        <input
                            type="number"
                            id="numCelebs"
                            min="0"
                            value={numCelebs || ""}
                            onChange={handleNumChange}
                            className="ml-2 w-[150px] p-[5px] text-[16px] border-[1px] border-[solid] border-[#cccccc]"
                        />
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {celebs.map((celeb, index) => (
                        <div key={index}>
                            <h3 className="text-[18px] font-semibold">
                                Celebrity {index + 1}
                            </h3>
                            <div className="flex gap-[40px]">
                                <div className="mb-[20px] text-[18px] font-normal">
                                    <label className="text-[18px]">Name:</label>
                                    <input
                                        type="text"
                                        value={celeb.celebName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "celebName",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter celebrity name"
                                        className="ml-2 w-[250px] p-[5px] text-[18px] border-[1px] border-[solid] border-[#cccccc]"
                                    />
                                </div>

                                <div className="mb-[20px] text-[18px] font-normal">
                                    <label
                                        className="text-[18px]"
                                        htmlFor={`celebType-${index}`}
                                    >
                                        Type:
                                    </label>
                                    <select
                                        id={`celebType-${index}`}
                                        value={celeb.celebType}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "celebType",
                                                e.target.value
                                            )
                                        }
                                        className="ml-2 w-[250px] p-[5px] text-[18px] border-[1px] border-[solid] border-[#cccccc]"
                                    >
                                        <option
                                            value="cast"
                                            className="text-[18px]"
                                        >
                                            Cast
                                        </option>
                                        <option
                                            value="crew"
                                            className="text-[18px]"
                                        >
                                            Crew
                                        </option>
                                    </select>
                                </div>

                                <div className="mb-[20px] text-[18px] font-normal">
                                    <label
                                        className="text-[18px]"
                                        htmlFor={`celebImage-${index}`}
                                    >
                                        Image:
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "celebImage",
                                                e.target.files
                                                    ? e.target.files[0]
                                                    : null
                                            )
                                        }
                                        className="ml-2 w-[250px] p-[5px] text-[18px] border-[1px] border-[solid] border-[#cccccc]"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-[180px] bg-[rgb(248,68,100)] border-[none] outline-[none] h-[49px] rounded-[49px] text-[#fff] uppercase font-semibold mx-[0] my-[10px] cursor-pointer [transition:0.5s] hover:bg-[#007bff]"
                    >
                        Add Celebrities
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCelebrities;
