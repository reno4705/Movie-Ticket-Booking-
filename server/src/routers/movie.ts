import { Request, Response, Router } from "express";
import User from "../models/userSchema";
import Movie from "../models/movieSchema";
import Booking from "../models/BookingSchema";
import Screen from "../models/screenSchema";
import checkAdminToken from "../middleware/checkAdminToken";
import mongoose from "mongoose";
import checkAuthToken from "../middleware/checkAuthToken";

const router = Router();

router.post("/test", (req: Request, res: Response) => {
    res.status(201).json({ message: "movie api testing done" });
});

router.post("/createmovie",checkAdminToken,async (req: Request, res: Response) => {
        try {
            const {
                title,
                description,
                portraitImgUrl,
                landscapeImgUrl,
                rating,
                language,
                genre,
                duration,
                releaseDate
            } = req.body;
            const newMovie = new Movie({
                title,
                description,
                portraitImgUrl,
                landscapeImgUrl,
                rating,
                language,
                genre,
                duration,
                releaseDate
            });
            newMovie.save();
            res.status(201).json({ message: "movie created successfully", data: newMovie });
        } catch (error) {
            res.status(404).json({ message: "Error creating new movie" });
        }
    }
);

router.post('/addcelebtomovie', checkAdminToken, async (req: Request, res: Response) => {
    try {
        const { movieId, celebrities } = req.body;
        if (!movieId || !celebrities) {
            return res.status(400).json({
                ok: false,
                message: "movieId and celebrities are required"
            });
        }
        const movie = await Movie.findById(movieId);
        // if (movie) console.log("movie found")
        if (!movie) {
            return res.status(404).json({
                ok: false,
                message: "Movie not found"
            });
        }
        for (const celeb of celebrities) {
            const {celebType, celebName} = celeb;
            const celebImage = celeb.celebImageurl;
            if (celeb.celebType === "cast") {
                movie.cast.push({celebType, celebName, celebImage});
            }
            else {
                movie.crew.push({celebType, celebName, celebImage});
            }
        }
        await movie.save();

        res.status(201).json({
            ok: true,
            message: "Celeb added successfully"
        });
    }
    catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ok: false, message: "Error adding celebrity details"})
    }
})

router.post("/createscreen",checkAdminToken, async (req: Request, res: Response) => {
        try {
            const { name, location, seats, city, screenType } = req.body;
            const newScreen = new Screen({
                name,
                location,
                seats,
                city: city.toLowerCase(),
                screenType,
                movieSchedules: [],
            });

            await newScreen.save();
            res.status(201).json({ message: "Screen added successfully" });
        } catch (err) {
            res.status(500).json({ message: "Error adding screen details" });
            console.log(err);
        }
    }
);

router.post("/addmoviescheduletoscreen",checkAdminToken,async (req: Request, res: Response) => {
        try {
            const { screenId, movieId, showTime, showDate } = req.body;
            const screen = await Screen.findById(screenId);
            if (!screen) {
                return res
                    .status(404)
                    .json({ ok: false, message: "Screen not found" });
            }

            const movie = await Movie.findById(movieId);
            if (!movie) {
                return res
                    .status(404)
                    .json({ ok: false, message: "Movie not found" });
            }

            screen.movieSchedules.push({
                movieId,
                showTime,
                notAvailableSeats: [],
                showDate,
            });
            await screen.save();
            res.status(201).json({
                ok: true,
                message: "Movie schedule added successfully",
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: "Error adding movie schedule details",
            });
        }
    }
);

interface AuthRequest extends Request {
    userId?: string;
}

router.post("/bookticket",checkAuthToken,async (req: AuthRequest, res: Response) => {
        try {
            const {
                showTime,
                showDate,
                movieId,
                screenId,
                seats,
                totalPrice,
                paymentId,
                paymentType,
            } = req.body;
            console.log(req.body);

            const movie = await Movie.findById(movieId);

            if (!movie) {
                return res.status(404).json({
                    ok: false,
                    message: "Movie not found",
                });
            }

            const movieName = movie.title;

            const screen = await Screen.findById(screenId);

            if (!screen) {
                return res.status(404).json({
                    ok: false,
                    message: "Theatre not found",
                });
            }

            const screenName = screen.name;

            const movieSchedule = screen.movieSchedules.find((schedule) => {
                console.log(schedule);
                let showDate1 = new Date(schedule.showDate);
                let showDate2 = new Date(showDate);
                if (
                    showDate1.getDay() === showDate2.getDay() &&
                    showDate1.getMonth() === showDate2.getMonth() &&
                    showDate1.getFullYear() === showDate2.getFullYear() &&
                    schedule.showTime === showTime &&
                    schedule.movieId == movieId
                ) {
                    return true;
                }
                return false;
            });

            if (!movieSchedule) {
                return res.status(404).json({
                    ok: false,
                    message: "Movie schedule not found",
                });
            }

            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(404).json({
                    ok: false,
                    message: "User not found",
                });
            }
            console.log("before newBooking done");
            const newBooking = new Booking({
                userId: req.userId,
                showTime,
                showDate,
                movieId,
                movieName,
                screenId,
                screenName,
                seats,
                totalPrice,
                paymentId,
                paymentType,
            });
            await newBooking.save();
            console.log("newBooking done");

            movieSchedule.notAvailableSeats.push(...seats);
            await screen.save();
            console.log("screen saved");

            user.bookings.push(newBooking._id as string);
            await user.save();
            console.log("user saved");
            res.status(201).json({
                ok: true,
                message: "Booking successful",
            });
        } catch (err) {
            console.log("catch error in booking ticker:" + err);
        }
    }
);

router.get("/movies", async (req: Request, res: Response) => {
    try {
        const movies = await Movie.find();
        // Return the list of movies
        res.status(200).json({
            ok: true,
            data: movies,
            message: "Movies retrieved successfully",
        });
    } catch (err) {
        res.status(500).json({ message: "Error finding movies list" });
    }
});

router.get("/movies/:id", async (req: Request, res: Response) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findById(movieId);
        if (!movie) {
            // If the movie is not found, return a 404 Not Found response
            return res.status(404).json({
                message: "Movie not found",
            });
        }

        res.status(200).json({
            ok: true,
            data: movie,
            message: "Movie retrieved successfully",
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error finding movie by id",
        });
    }
});

router.get("/screensbycity/:city", async (req: Request, res: Response) => {
    const cityName = req.params.city.toLowerCase();

    try {
        const screens = await Screen.find({ city: cityName });
        if (!screens || screens.length == 0) {
            // console.log("no screen of that city present");
            return res
                .status(404)
                .json({ message: "No screens found in the specified city" });
        }
        // console.log("screen present");
        res.status(200).json({
            data: screens,
            message: "Screens retrieved successfully",
        });
    } catch (err) {
        res.status(500).json({ message: "Error finding screen by city" });
    }
});

router.get("/screensbymovieschedule/:city/:date/:movieid", async (req, res) => {
    try {
        const city = req.params.city.toLowerCase();
        const date = req.params.date;
        const movieId = req.params.movieid;

        // Retrieve screens for the specified city
        const screens = await Screen.find({ city });

        // Check if screens were found
        if (!screens || screens.length === 0) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: "No screens found in the specified city",
                });
        }

        // Filter screens based on the movieId
        // const filteredScreens = screens.filter(screen =>
        //     screen.movieSchedules.some(schedule => schedule.movieId == movieId)
        // );

        let temp = [];
        // Filter screens based on the showDate
        const filteredScreens = screens.forEach((screen) => {
            // screen
            screen.movieSchedules.forEach((schedule) => {
                let showDate = new Date(schedule.showDate);
                let bodyDate = new Date(date);
                // console.log(showDate +" "+ bodyDate);
                if (
                    showDate.getDay() === bodyDate.getDay() &&
                    showDate.getMonth() === bodyDate.getMonth() &&
                    showDate.getFullYear() === bodyDate.getFullYear() &&
                    schedule.movieId.equals(
                        new mongoose.Types.ObjectId(movieId)
                    )
                ) {
                    temp.push(screen);
                }
            });
        });

        console.log(temp);

        res.status(200).json({
            ok: true,
            data: temp,
            message: "Screens retrieved successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: "Error finding screen by movie schedule",
        });
    }
});

router.get("/schedulebymovie/:screenid/:date/:movieid", async (req, res) => {
    const screenId = req.params.screenid;
    const date = req.params.date;
    const movieId = req.params.movieid;

    const screen = await Screen.findById(screenId);

    if (!screen) {
        return res.status(404).json({ ok: true, message: "Screen not found" });
    }

    const movieSchedules = screen.movieSchedules.filter((schedule) => {
        let showDate = new Date(schedule.showDate);
        let bodyDate = new Date(date);
        if (
            showDate.getDay() === bodyDate.getDay() &&
            showDate.getMonth() === bodyDate.getMonth() &&
            showDate.getFullYear() === bodyDate.getFullYear() &&
            schedule.movieId.equals(new mongoose.Types.ObjectId(movieId))
        ) {
            return true;
        }
        return false;
    });
    console.log(movieSchedules);

    if (!movieSchedules) {
        return res
            .status(404)
            .json({ ok: false, message: "Movie schedule not found" });
    }

    res.status(200).json({
        ok: true,
        message: "Movie schedule retrieved successfully",
        data: { screen, movieSchedulesforDate: movieSchedules },
    });
});

router.get(
    "/getuserbookings",
    checkAuthToken,
    async (req: AuthRequest, res: Response) => {
        try {
            const user = await User.findById(req.userId).populate("bookings");
            if (!user) {
                return res
                    .status(404)
                    .json({ ok: false, message: "User not found" });
            }
            let bookings = [];

            for (let i = 0; i < user.bookings.length; i++) {
                let bookingobj = await Booking.findById(user.bookings[i]);
                bookings.push(bookingobj);
            }

            res.status(200).json({
                ok: true,
                message: "user bookings retrieved successfully",
                data: bookings,
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: "error retrieving user booking details",
            });
        }
    }
);

router.get(
    "/getmoviescreenname",
    checkAuthToken,
    async (req: Request, res: Response) => {
        try {
            const { movieId, screenId } = req.body;
            const movie = await Movie.findById(movieId);
            const screen = await Screen.findById(screenId);
            if (!movie || !screen) {
                res.status(404).json({
                    ok: false,
                    message: "movie or screen not found",
                });
            }
            const movieName = movie.title;
            const screenName = screen.name;
            const locationinfo = screen.location;
            res.status(200).json({
                ok: true,
                message: "movie and screen name retrieved",
                data: {
                    moviename: movieName,
                    screenname: screenName,
                    location: locationinfo,
                },
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: "error getting movie and screen name",
            });
        }
    }
);

export default router;
