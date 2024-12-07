import mongoose, { Schema, Document } from "mongoose";

interface ICastCrew {
    celebType: string;
    celebName: string;
    celebImage: string;
}

interface IMovie extends Document {
    title: string;
    description: string;
    potraitImageUrl: string;
    landscapeImageurl: string;
    rating: number;
    language: string[];
    genre: string[];
    duration: number;
    releaseDate: Date;
    cast: ICastCrew[];
    crew: ICastCrew[];
}

const movieSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    portraitImgUrl: {
        type: String,
        required: true
    },
    landscapeImgUrl: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    language: {
        type: [String],
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    cast: [
        {
            celebType: String,
            celebName: String,
            celebImage: String
        }
    ],
    crew: [
        {
            celebType: String,
            celebName: String,
            celebImage: String
        }
    ]
});

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
