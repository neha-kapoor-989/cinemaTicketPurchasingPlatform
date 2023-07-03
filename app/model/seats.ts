import mongoose, { ObjectId, Schema } from 'mongoose';

export type SeatsDocument = mongoose.Document & {
  id: string,
  row: string,
  auditoriumId: string,
  auditoriumRefId: ObjectId,
  bookingId?: ObjectId,
  booked?: boolean,
  corner?: boolean,
  createdAt: Date,
};

const seatSchema = new mongoose.Schema({
  id: { type: String, index: true },
  row: String,
  auditoriumId: String,
  auditoriumRefId: {
    type : Schema.Types.ObjectId,
    ref : "auditorium"
  },
  bookingId: {
    type : Schema.Types.ObjectId,
    ref : "bookings"
  },
  booked : {
    type : Boolean,
    default : false
  },
  corner : {
    type : Boolean,
    default : false
  },
  createdAt: { 
    type: Date, 
    default: Date.now
  },
});

export const seats = (mongoose.models.seats ||
  mongoose.model<SeatsDocument>('seats', seatSchema)
);