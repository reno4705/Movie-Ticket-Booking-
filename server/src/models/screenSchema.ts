import mongoose, { Document, Schema } from 'mongoose';

interface Seat {
    seat_id: string;
}

interface Row {
    rowname: string;
    cols: { seats: Seat[] }[];
}

interface SeatLayout {
    type: string;
    rows: Row[];
    price: number;
}
// ---------------

interface NotAvailableSeat { 
    row: string;
    col: number;
    seat_id: string;
    price: number;
}

interface MovieSchedule {
    movieId: mongoose.Types.ObjectId;
    showTime: string;
    notAvailableSeats: NotAvailableSeat[];
    showDate: Date;
}

interface ScreenDocument extends Document {
    name: string;
    location: string;
    seats: SeatLayout[];
    city: string;
    screenType: string; // Example: "Standard", "IMAX", "VIP", etc.
    movieSchedules: MovieSchedule[];
}

// schema for seats ----------------------------------------------
const SeatSchema = new Schema<Seat>({
    seat_id: { type: String, required: true },
});

const ColumnSchema = new Schema({
    seats: [SeatSchema],
});

const RowSchema = new Schema<Row>({
    rowname: { type: String, required: true },
    cols: [ColumnSchema],
});

const SeatLayoutSchema = new Schema<SeatLayout>({
    type: { type: String, required: true },
    rows: [RowSchema],
    price: { type: Number, required: true },
});
// -------------------------------------------------------------

const screenSchema = new Schema<ScreenDocument>({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    seats: [SeatLayoutSchema],
    city: {
        type: String,
        required: true
    },
    screenType: {
        type: String,
        required: true
    },
    movieSchedules: [
        {
            movieId: {
                type: Schema.Types.ObjectId,
                ref: 'Movie',
                required: true
            },
            showTime: String,
            notAvailableSeats: [{
                row: String,
                col: Number,
                seat_id: String,
                price: Number
            }],
            showDate: Date
        }
    ]
});

const Screen = mongoose.model<ScreenDocument>('Screen', screenSchema);

export default Screen;

