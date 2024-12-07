import mongoose, { Schema, Document } from "mongoose";

interface IBooking extends Document {
    email: string;
    name: string;
    password: string;
    bookings: Array<string>;
}

const bookingSchema: Schema = new Schema({
    showTime: { type: String, required: true },
    showDate: { type: String, required: true },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    movieName: { type: String, required: true},
    screenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Screen",
        required: true,
    },
    screenName: { type: String, required: true},
    seats: [
        {
            // { row: 'D', col: 0, seat_id: '10', price: 300 }
            row: {
                type: String,
                required: true,
            },
            col: {
                type: Number,
                required: true,
            },
            seat_id: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
});

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
