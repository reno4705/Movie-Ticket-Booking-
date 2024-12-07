import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    bookings: string[];
    city: string;
}

const userSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        bookings: { type: [String], default: [] },
        city: { type: String, required: true}
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
