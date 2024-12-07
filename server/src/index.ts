import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import auth from "./routers/auth";
import admin from "./routers/admin"
import movie from "./routers/movie"
import imageUpload from "./routers/imageUpload"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const port = 5000;

const dbURI: string = process.env.DATABASE_URL;

if (!dbURI) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

mongoose
.connect(dbURI,{dbName: process.env.DB_NAME})
.then((): void => {
    app.listen(port, (): void => {
        console.log(`Server connected to port ${port} and MongoDb`);
    });
})
.catch((error: Error): void => {
    console.log('Unable to connect to Server and/or MongoDB', error);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies

// ------------CORS-------------------
const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost:5173','http://localhost:3000'],
  credentials: true,
};
app.use(cors(corsOptions));

// ------------ROUTER-----------------
app.use("/auth",auth);

app.use("/admin",admin);

app.use("/movie",movie);

app.use("/image",imageUpload);